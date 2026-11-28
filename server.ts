import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Request, type Response } from 'express';
import {
  ALLOWED_VOICE_LANG_CODES,
  MALIK_VOICE_AGENT_SYSTEM_PROMPT,
  VOICE_LANGUAGES,
  type SupportedVoiceLangCode,
} from './src/data/voiceAgentKnowledge.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1/convai';
const REQUEST_TIMEOUT_MS = 12_000;

let cachedProvisionedAgentId: string | null = null;

function readCleanEnv(name: string): string {
  const raw = process.env[name]?.trim() ?? '';
  if (!raw || raw.startsWith('MY_')) {
    return '';
  }
  return raw;
}

async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs = REQUEST_TIMEOUT_MS
): Promise<globalThis.Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function provisionMalikAgent(apiKey: string): Promise<string> {
  const defaultGreeting =
    VOICE_LANGUAGES.find((l) => l.code === 'en')?.firstMessage ??
    'Assalam-o-Alaikum, welcome to M/S Malik & Company.';

  const baseBody = {
    name: 'M/S Malik & Company — Multilingual Voice Desk',
    tags: ['malik-and-co', 'multilingual', 'engineering'],
    conversation_config: {
      agent: {
        first_message: defaultGreeting,
        language: 'en',
        prompt: {
          prompt: MALIK_VOICE_AGENT_SYSTEM_PROMPT,
        },
      },
      tts: {
        model_id: 'eleven_multilingual_v2',
      },
    },
    platform_settings: {
      overrides: {
        conversation_config_override: {
          agent: {
            prompt: {
              prompt: true,
            },
            first_message: true,
            language: true,
          },
        },
      },
    },
  };

  let res = await fetchWithTimeout(`${ELEVENLABS_BASE_URL}/agents/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify(baseBody),
  });

  // Fallback without platform_settings overrides block if ElevenLabs schema differs by workspace tier
  if (!res.ok && res.status === 422) {
    res = await fetchWithTimeout(`${ELEVENLABS_BASE_URL}/agents/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        name: baseBody.name,
        conversation_config: baseBody.conversation_config,
      }),
    });
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`ElevenLabs agent creation failed (${res.status}): ${errText.slice(0, 200)}`);
  }

  const created = (await res.json()) as { agent_id?: string };
  if (!created.agent_id) {
    throw new Error('ElevenLabs did not return an agent_id during provisioning.');
  }

  cachedProvisionedAgentId = created.agent_id;
  return created.agent_id;
}

async function createServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '64kb' }));

  app.get('/api/voice/status', (_req: Request, res: Response) => {
    const apiKey = readCleanEnv('ELEVENLABS_API_KEY');
    const configuredAgentId = readCleanEnv('ELEVENLABS_AGENT_ID');
    const resolvedAgentId = configuredAgentId || cachedProvisionedAgentId || '';

    res.json({
      configured: Boolean(apiKey || resolvedAgentId),
      hasApiKey: Boolean(apiKey),
      hasAgentId: Boolean(resolvedAgentId),
      autoProvisionReady: Boolean(apiKey && !resolvedAgentId),
    });
  });

  app.post('/api/voice/session', async (req: Request, res: Response) => {
    const rawLang = req.body?.language;
    let language: SupportedVoiceLangCode = 'en';

    if (rawLang !== undefined) {
      if (
        typeof rawLang !== 'string' ||
        !ALLOWED_VOICE_LANG_CODES.has(rawLang as SupportedVoiceLangCode)
      ) {
        res.status(400).json({
          error: 'INVALID_LANGUAGE',
          message: 'Language must be one of: en, ur, ar, pa, sd.',
        });
        return;
      }
      language = rawLang as SupportedVoiceLangCode;
    }

    const apiKey = readCleanEnv('ELEVENLABS_API_KEY');
    let agentId = readCleanEnv('ELEVENLABS_AGENT_ID') || cachedProvisionedAgentId || '';

    if (!apiKey && !agentId) {
      res.status(503).json({
        error: 'ELEVENLABS_NOT_CONFIGURED',
        message:
          'Set ELEVENLABS_API_KEY (and optional ELEVENLABS_AGENT_ID) in AI Studio Secrets to start a live ElevenLabs voice conversation.',
      });
      return;
    }

    if (!apiKey && agentId) {
      res.json({
        mode: 'public',
        agentId,
        language,
      });
      return;
    }

    try {
      if (!agentId) {
        agentId = await provisionMalikAgent(apiKey);
      }

      const signedUrlRes = await fetchWithTimeout(
        `${ELEVENLABS_BASE_URL}/conversation/get-signed-url?agent_id=${encodeURIComponent(agentId)}`,
        {
          method: 'GET',
          headers: {
            'xi-api-key': apiKey,
          },
        }
      );

      if (!signedUrlRes.ok) {
        const detail = await signedUrlRes.text().catch(() => '');
        res.status(502).json({
          error: 'ELEVENLABS_UPSTREAM_ERROR',
          message: `Unable to initialize ElevenLabs session (${signedUrlRes.status}). ${detail.slice(0, 140)}`,
        });
        return;
      }

      const payload = (await signedUrlRes.json()) as { signed_url?: string };
      if (!payload.signed_url) {
        res.status(502).json({
          error: 'INVALID_UPSTREAM_RESPONSE',
          message: 'ElevenLabs returned no signed WebSocket URL.',
        });
        return;
      }

      res.json({
        mode: 'signed',
        signedUrl: payload.signed_url,
        agentId,
        language,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected server error';
      res.status(502).json({
        error: 'VOICE_SESSION_FAILED',
        message: msg,
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await import('vite');
    const viteServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(viteServer.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (req: Request, res: Response, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      const indexFile = path.join(distDir, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
