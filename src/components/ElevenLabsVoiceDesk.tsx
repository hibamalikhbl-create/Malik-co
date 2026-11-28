import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConversationProvider, useConversation } from '@elevenlabs/react';
import {
  Globe,
  Mic,
  MicOff,
  PhoneCall,
  PhoneOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import {
  buildLanguageOverridePrompt,
  VOICE_LANGUAGES,
  type SupportedVoiceLangCode,
} from '../data/voiceAgentKnowledge';

interface VoiceStatusResponse {
  configured: boolean;
  hasApiKey: boolean;
  hasAgentId: boolean;
  autoProvisionReady: boolean;
}

interface VoiceSessionResponse {
  mode: 'signed' | 'public';
  signedUrl?: string;
  agentId: string;
  language: SupportedVoiceLangCode;
  error?: string;
  message?: string;
}

interface TranscriptEntry {
  id: string;
  role: 'user' | 'agent';
  text: string;
}

interface ElevenLabsVoiceDeskProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateToContact?: () => void;
}

const PREVIEW_ANSWERS: Record<
  SupportedVoiceLangCode,
  Record<number, { title: string; answer: string }>
> = {
  en: {
    0: {
      title: 'CEO Engr. Muhammad Asif Malik',
      answer:
        'Engineer Muhammad Asif Malik is the 5th-generation CEO of M/S Malik & Company. A qualified Civil Engineer, he achieved PEC Category C-B registration, unified ten design and contracting disciplines under one roof, personally supervises site execution, and is guiding the firm toward international expansion.',
    },
    1: {
      title: 'Ten One-Window Disciplines',
      answer:
        'M/S Malik & Company integrates Interior Designers, Construction, Engineers, Architecture, Structural, Planners Developers, MEP Design (Sindh Electrical License KC-1341), Infrastructure Consultancy, Renovation Works, and Demolish Works — delivering 2,000+ projects across Pakistan.',
    },
    2: {
      title: 'Five-Generation Legacy (1930s – Present)',
      answer:
        'Beginning in Sialkot with Late Malik Abdul Mehtab Din Sahib (1930s), continuing through Partition-era railways and tunnels under Late Malik Abdul Fazal Karim Sahib, institutional works in Toba Tek Singh under Late Malik Abdul Ghafoor Sahib, Karachi expansion (1979) under Respected Malik Abdul Salam Sahib, to CEO Muhammad Asif Malik today.',
    },
    3: {
      title: 'Custom BOQ & Karachi Main Office',
      answer:
        'Every project receives a tailored BOQ based on plot area, floors, structural scope, and MEP systems — never a generic flat rate. Visit Office No. 8, Mezzanine Floor, Rafi Mansion, Shahrah-e-Faisal, Karachi or call 0334-2199979.',
    },
  },
  ur: {
    0: {
      title: 'سی ای او انجینئر محمد عاصف ملک',
      answer:
        'انجینئر محمد عاصف ملک ایم ایس ملک اینڈ کمپنی کی پانچویں نسل کے سی ای او ہیں۔ انہوں نے کمپنی کو PEC کیٹیگری C-B اور ون ونڈو کنسلٹنسی و کنٹریکٹنگ ماڈل پر جدید خطوط پر استوار کیا اور اب بین الاقوامی توسیع کی قیادت کر رہے ہیں۔',
    },
    1: {
      title: 'دس ون ونڈو انجینئرنگ خدمات',
      answer:
        'ہماری خدمات میں انٹیریئر ڈیزائننگ، کنسٹرکشن، انجینئرنگ، آرکیٹیکچر، اسٹرکچرل، پلانرز ڈیولپرز، MEP ڈیزائن (لائسنس KC-1341)، انفراسٹرکچر کنسلٹنسی، رینوویشن اور ڈیمولش ورکس شامل ہیں۔',
    },
    2: {
      title: '1930 کی دہائی سے پانچ نسلوں کا سفر',
      answer:
        'یہ وراثت سیالکوٹ میں مرحوم ملک عبدالمہتاب دین صاحب سے شروع ہوئی، تقسیم ہند کے دور میں مرحوم ملک عبدالفضل کریم صاحب، ٹوبہ ٹیک سنگھ میں مرحوم ملک عبدالغفور صاحب، 1979 میں کراچی میں ملک عبدالسلام صاحب، اور آج انجینئر محمد عاصف ملک تک جاری ہے۔',
    },
    3: {
      title: 'کسٹم بی او کیو اور کراچی آفس',
      answer:
        'ہر پراجیکٹ کا پلان اور بی او کیو پلاٹ کے رقبے اور تکنیکی ضروریات کے مطابق تیار کیا جاتا ہے۔ رابطہ: آفس نمبر 8، میزنائن فلور، رفیع مینشن، شاہراہ فیصل کراچی · فون: 0334-2199979۔',
    },
  },
  ar: {
    0: {
      title: 'الرئيس التنفيذي المهندس محمد عاصف مالك',
      answer:
        'المهندس محمد عاصف مالك هو القائد من الجيل الخامس لشركة مالك وشركاه، حاصل على تسجيل PEC الفئة C-B، ويقود المشاريع الهندسية والإنشائية والاستشارية والتوسع الدولي للشركة.',
    },
    1: {
      title: 'التخصصات العشرة المتكاملة',
      answer:
        'نقدم خدمات التصميم الداخلي، المقاولات والإنشاءات، الهندسة، العمارة، التصميم الإنشائي، التخطيط والتطوير، أنظمة MEP برخصة KC-1341، استشارات البنية التحتية، الترميم، وأعمال الهدم المنظم.',
    },
    2: {
      title: 'إرث خمسة أجيال منذ الثلاثينيات',
      answer:
        'مسيرة هندسية بدأت في سيالكوت منذ ثلاثينيات القرن الماضي وتوسعت إلى توبا تيك سينغ وكراتشي عام 1979، مع تسليم أكثر من 2000 مشروع حكومي وخاص.',
    },
    3: {
      title: 'مقايسة مخصصة ومكتب كراتشي',
      answer:
        'يُعد كل عرض ومقايسة كميات حسب مساحة الموقع والمتطلبات الإنشائية والميكانيكية. للتواصل المباشر: 0334-2199979 أو البريد asif.maliknco@gmail.com.',
    },
  },
  pa: {
    0: {
      title: 'سی ای او انجینئر محمد عاصف ملک',
      answer:
        'انجینئر محمد عاصف ملک پنجویں پیڑھی دے سی ای او نیں۔ اوہناں دی قیادت وچ ملک اینڈ کمپنی PEC کیٹیگری C-B دے نال پاکستان بھر وچ 2,000 توں ودھ پراجیکٹ مکمل کر چکی اے۔',
    },
    1: {
      title: 'دس ون ونڈو خدمات',
      answer:
        'انٹیریئر ڈیزائن، کنسٹرکشن، انجینئرنگ، آرکیٹیکچر، اسٹرکچرل، پلاننگ، MEP ڈیزائن، انفراسٹرکچر، رینوویشن تے ڈیمولش ورکس سب اکو چھت ہیٹھ دستیاب نیں۔',
    },
    2: {
      title: 'سیالکوٹ توں کراچی تک پنج پیڑھیاں',
      answer:
        '1930 دی دہائی وچ سیالکوٹ توں شروع ہو کے ٹوبہ ٹیک سنگھ تے 1979 وچ کراچی تک پنج نسلاں دا اعتماد تے معیار۔',
    },
    3: {
      title: 'کسٹم پلان تے رابطہ',
      answer:
        'ہر پلاٹ دے حساب نال وکھرا پلان تے بی او کیو تیار کیتا جاندا اے۔ رابطہ: 0334-2199979، شاہراہ فیصل کراچی۔',
    },
  },
  sd: {
    0: {
      title: 'سي اي او انجنيئر محمد عاصف ملڪ',
      answer:
        'انجنيئر محمد عاصف ملڪ پنجين نسل جو سي اي او آهي جنهن جي اڳواڻي ۾ ملڪ اينڊ ڪمپني PEC ڪيٽيگري C-B تحت سڄي پاڪستان ۾ تعميراتي ۽ مشاورتي خدمتون فراهم ڪري رهي آهي.',
    },
    1: {
      title: 'ڏهه ون ونڊو خدمتون',
      answer:
        'انٽيريئر ڊيزائن، ڪنسٽرڪشن، انجنيئرنگ، آرڪيٽيڪچر، اسٽرڪچرل، پلاننگ، MEP ڊيزائن (لائسنس KC-1341)، انفراسٽرڪچر، رينوويشن ۽ ڊيمولش ڪم.',
    },
    2: {
      title: 'پنجن نسلن جي تاريخ',
      answer:
        '1930ع جي ڏهاڪي ۾ سيالڪوٽ کان شروعات، 1979ع ۾ ڪراچي آفيس جو قيام، ۽ 2,000 کان وڌيڪ مڪمل ٿيل پروجيڪٽس.',
    },
    3: {
      title: 'ڪسٽم پلان ۽ رابطو',
      answer:
        'هر پروجيڪٽ لاءِ پلاٽ جي ايراضي موجب الڳ بي او ڪيو تيار ڪيو ويندو آهي. رابطو: 0334-2199979 · ڪراچي آفيس.',
    },
  },
};

const BAR_FACTORS = [0.45, 0.72, 0.95, 0.62, 0.88, 1.0, 0.84, 0.58, 0.92, 0.7, 0.52, 0.4];

const VoiceDeskInner: React.FC<ElevenLabsVoiceDeskProps> = ({
  isOpen,
  onOpenChange,
  onNavigateToContact,
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedVoiceLangCode>('en');
  const [serverStatus, setServerStatus] = useState<VoiceStatusResponse | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [textDraft, setTextDraft] = useState('');
  const [volume, setVolumeState] = useState(0.85);
  const [audioLevel, setAudioLevel] = useState(0);
  const [previewAnswer, setPreviewAnswer] = useState<{ title: string; answer: string } | null>(
    null
  );

  const transcriptEndRef = useRef<HTMLDivElement | null>(null);
  const pendingPromptRef = useRef<string | null>(null);
  const needsContextualPrimerRef = useRef(false);

  const activeLanguageObj = useMemo(
    () => VOICE_LANGUAGES.find((l) => l.code === selectedLang) ?? VOICE_LANGUAGES[0],
    [selectedLang]
  );

  const conversation = useConversation({
    volume,
    onConnect: () => {
      setSessionError(null);
      setIsStarting(false);

      if (needsContextualPrimerRef.current) {
        try {
          conversation.sendContextualUpdate(buildLanguageOverridePrompt(selectedLang));
        } catch {
          // Safe ignore if contextual update is unsupported mid-handshake
        }
        needsContextualPrimerRef.current = false;
      }

      if (pendingPromptRef.current) {
        const queued = pendingPromptRef.current;
        pendingPromptRef.current = null;
        try {
          conversation.sendUserMessage(queued);
          setTranscript((prev) => [
            ...prev,
            { id: `u-${Date.now()}`, role: 'user', text: queued },
          ]);
        } catch {
          // Ignore send timing issue
        }
      }
    },
    onDisconnect: () => {
      setIsStarting(false);
      setAudioLevel(0);
    },
    onMessage: (payload) => {
      const cleanText = payload.message?.trim();
      if (!cleanText) return;
      setTranscript((prev) => [
        ...prev,
        {
          id: `${payload.role}-${payload.event_id}-${Date.now()}`,
          role: payload.role,
          text: cleanText,
        },
      ]);
    },
    onError: (msg) => {
      setIsStarting(false);
      setSessionError(typeof msg === 'string' && msg ? msg : 'Voice session encountered an error.');
    },
  });

  const isConnected = conversation.status === 'connected';
  const isConnecting = isStarting || conversation.status === 'connecting';

  useEffect(() => {
    let active = true;
    fetch('/api/voice/status')
      .then(async (res) => {
        if (!res.ok) throw new Error('Status check failed');
        return (await res.json()) as VoiceStatusResponse;
      })
      .then((data) => {
        if (active) setServerStatus(data);
      })
      .catch(() => {
        if (active) {
          setServerStatus({
            configured: false,
            hasApiKey: false,
            hasAgentId: false,
            autoProvisionReady: false,
          });
        }
      })
      .finally(() => {
        if (active) setStatusLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  // Smooth audio visualizer loop strictly while connected
  useEffect(() => {
    if (!isConnected) {
      setAudioLevel(0);
      return;
    }
    let rafId = 0;
    let lastTick = 0;
    const tick = (now: number) => {
      if (now - lastTick > 75) {
        lastTick = now;
        const level = conversation.isSpeaking
          ? conversation.getOutputVolume()
          : conversation.getInputVolume();
        setAudioLevel(Math.min(1, Math.max(0, level)));
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isConnected, conversation]);

  const startVoiceCall = useCallback(
    async (langOverride?: SupportedVoiceLangCode, queuedPrompt?: string) => {
      const targetLang = langOverride ?? selectedLang;
      const langMeta = VOICE_LANGUAGES.find((l) => l.code === targetLang) ?? VOICE_LANGUAGES[0];

      setSessionError(null);
      setPreviewAnswer(null);
      setIsStarting(true);
      if (queuedPrompt) pendingPromptRef.current = queuedPrompt;

      try {
        if (navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
        }
      } catch {
        setIsStarting(false);
        pendingPromptRef.current = null;
        setSessionError(
          'Microphone permission is needed for voice conversation. Please allow microphone access in your browser.'
        );
        return;
      }

      try {
        const res = await fetch('/api/voice/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language: targetLang }),
        });
        const data = (await res.json()) as VoiceSessionResponse;

        if (!res.ok) {
          setIsStarting(false);
          pendingPromptRef.current = null;
          setSessionError(
            data.message ||
              'ElevenLabs voice credentials are not yet configured in environment secrets.'
          );
          return;
        }

        const overrideConfig = {
          agent: {
            prompt: {
              prompt: buildLanguageOverridePrompt(targetLang),
            },
            firstMessage: langMeta.firstMessage,
            language: targetLang,
          },
        };

        needsContextualPrimerRef.current = false;

        try {
          if (data.mode === 'signed' && data.signedUrl) {
            await conversation.startSession({
              signedUrl: data.signedUrl,
              connectionType: 'websocket',
              overrides: overrideConfig,
            });
          } else {
            await conversation.startSession({
              agentId: data.agentId,
              connectionType: 'websocket',
              overrides: overrideConfig,
            });
          }
        } catch {
          // If the user's pre-existing dashboard agent rejects client overrides, connect cleanly and inject context
          needsContextualPrimerRef.current = true;
          if (data.mode === 'signed' && data.signedUrl) {
            await conversation.startSession({
              signedUrl: data.signedUrl,
              connectionType: 'websocket',
            });
          } else {
            await conversation.startSession({
              agentId: data.agentId,
              connectionType: 'websocket',
            });
          }
        }
      } catch (err: unknown) {
        setIsStarting(false);
        pendingPromptRef.current = null;
        setSessionError(
          err instanceof Error ? err.message : 'Could not connect to the ElevenLabs voice server.'
        );
      }
    },
    [selectedLang, conversation]
  );

  const handleLanguageChange = (code: SupportedVoiceLangCode) => {
    setSelectedLang(code);
    setPreviewAnswer(null);
    if (isConnected) {
      const langMeta = VOICE_LANGUAGES.find((l) => l.code === code);
      if (langMeta) {
        try {
          conversation.sendContextualUpdate(buildLanguageOverridePrompt(code));
          conversation.sendUserMessage(`Please switch our conversation to ${langMeta.label}.`);
        } catch {
          // Safe fallback if send fails during disconnect transition
        }
      }
    }
  };

  const handleQuickTopic = (idx: number, promptText: string) => {
    if (isConnected) {
      try {
        conversation.sendUserMessage(promptText);
        setTranscript((prev) => [
          ...prev,
          { id: `u-${Date.now()}`, role: 'user', text: promptText },
        ]);
      } catch {
        // Ignore
      }
      return;
    }

    if (serverStatus?.configured) {
      void startVoiceCall(selectedLang, promptText);
    } else {
      const card = PREVIEW_ANSWERS[selectedLang]?.[idx] ?? PREVIEW_ANSWERS.en[idx];
      if (card) setPreviewAnswer(card);
    }
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = textDraft.trim();
    if (!clean || !isConnected) return;
    conversation.sendUserMessage(clean);
    setTranscript((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: clean }]);
    setTextDraft('');
  };

  const handleVolumeToggle = () => {
    const next = volume > 0 ? 0 : 0.85;
    setVolumeState(next);
    if (isConnected) {
      conversation.setVolume({ volume: next });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <section
          aria-label="M/S Malik & Company Multilingual Voice Consultation Desk"
          className="mb-3 w-[calc(100vw-2rem)] sm:w-[410px] max-h-[82vh] rounded-2xl border border-[#CFD5CC] bg-white shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#0F4221] text-white px-4 py-3.5 flex items-start justify-between gap-3 border-b border-white/10">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                {isConnected && (
                  <span
                    aria-hidden="true"
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      conversation.isSpeaking ? 'bg-[#F4B41A]' : 'bg-[#4ADE80]'
                    }`}
                  />
                )}
                <h3 className="text-sm font-bold tracking-tight truncate">
                  Malik &amp; Co. Voice Consultation
                </h3>
              </div>
              <p className="mt-0.5 text-[11px] text-[#BCE0C7] truncate">
                {isConnected
                  ? conversation.isSpeaking
                    ? 'Agent Speaking · Live ElevenLabs Audio'
                    : 'Listening · Speak in Any Language'
                  : 'CEO Asif Malik · Ten Disciplines · Multilingual'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close voice desk"
              className="rounded-lg bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Multilingual Selector */}
          <div className="px-4 py-2.5 bg-[#F8F7F4] border-b border-[#E0E3DC]">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#344238]">
                <Globe className="w-3.5 h-3.5 text-[#0F4221]" aria-hidden="true" />
                <span>Language</span>
              </span>
              <span className="text-[11px] text-[#5A675D]">
                English · اردو · العربية · ਪੰਜਾਬੀ · سنڌي
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 rounded-lg bg-[#E7EAE3] p-1">
              {VOICE_LANGUAGES.map((lang) => {
                const active = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-1.5 py-1.5 rounded-md text-[11px] font-semibold transition-colors whitespace-nowrap truncate cursor-pointer ${
                      active
                        ? 'bg-[#0F4221] text-white shadow-xs'
                        : 'text-[#263029] hover:bg-white/70'
                    }`}
                    title={lang.label}
                  >
                    {lang.nativeLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body: Visualizer, Status, Transcript, Quick Topics */}
          <div className="p-4 space-y-3.5 overflow-y-auto flex-1">
            {/* Audio Level Bars + Primary Call Control */}
            <div className="rounded-xl border border-[#E0E3DC] bg-[#F8F7F4] p-3.5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-end gap-1 h-7" aria-hidden="true">
                  {BAR_FACTORS.map((factor, idx) => {
                    const scale = isConnected
                      ? Math.max(0.22, Math.min(1, 0.22 + audioLevel * factor * 1.4))
                      : 0.22;
                    return (
                      <span
                        key={idx}
                        className={`w-1 h-full rounded-full origin-bottom transition-transform duration-75 ${
                          isConnected
                            ? conversation.isSpeaking
                              ? 'bg-[#D99B0C]'
                              : 'bg-[#0F4221]'
                            : 'bg-[#C4CBC0]'
                        }`}
                        style={{ transform: `scaleY(${scale})` }}
                      />
                    );
                  })}
                </div>

                {!isConnected ? (
                  <button
                    type="button"
                    disabled={isConnecting || statusLoading}
                    onClick={() => void startVoiceCall()}
                    className="extrude-btn inline-flex items-center gap-2 rounded-lg bg-[#0F4221] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A2E17] disabled:opacity-60 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
                    <span>{isConnecting ? 'Connecting...' : 'Start Voice Call'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => conversation.setMuted(!conversation.isMuted)}
                      aria-label={conversation.isMuted ? 'Unmute microphone' : 'Mute microphone'}
                      className={`inline-flex items-center justify-center rounded-lg border px-2.5 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                        conversation.isMuted
                          ? 'border-red-300 bg-red-50 text-red-800'
                          : 'border-[#CFD5CC] bg-white text-[#111914] hover:bg-[#EFF1EC]'
                      }`}
                    >
                      {conversation.isMuted ? (
                        <MicOff className="w-3.5 h-3.5" />
                      ) : (
                        <Mic className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleVolumeToggle}
                      aria-label={volume > 0 ? 'Mute speaker audio' : 'Unmute speaker audio'}
                      className="inline-flex items-center justify-center rounded-lg border border-[#CFD5CC] bg-white px-2.5 py-2 text-xs font-semibold text-[#111914] hover:bg-[#EFF1EC] cursor-pointer transition-colors"
                    >
                      {volume > 0 ? (
                        <Volume2 className="w-3.5 h-3.5" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => conversation.endSession()}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3 py-2 text-xs font-semibold text-white hover:bg-red-800 cursor-pointer whitespace-nowrap"
                    >
                      <PhoneOff className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>End</span>
                    </button>
                  </div>
                )}
              </div>

              {sessionError && (
                <div className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-950 leading-relaxed">
                  {sessionError}
                </div>
              )}

              {!statusLoading && serverStatus && !serverStatus.configured && !sessionError && (
                <div className="rounded-lg border border-[#DCE0D7] bg-white px-3 py-2 text-xs text-[#344238] leading-relaxed">
                  Add <span className="font-mono-tabular font-semibold">ELEVENLABS_API_KEY</span>{' '}
                  in AI Studio Settings &rarr; Secrets to activate live ElevenLabs voice audio. You
                  can preview multilingual answers below right away.
                </div>
              )}
            </div>

            {/* Quick Inquiry Topics */}
            <div>
              <div className="text-[11px] font-semibold text-[#5A675D] mb-2">
                {isConnected ? 'Ask Live During Call' : 'Quick Questions (Malik & Co. & CEO Asif Malik)'}
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {activeLanguageObj.samplePrompts.map((promptText, idx) => (
                  <button
                    key={promptText}
                    type="button"
                    onClick={() => handleQuickTopic(idx, promptText)}
                    className="text-left rounded-lg border border-[#DFE2DC] bg-white px-3 py-2 text-xs font-medium text-[#1C2720] hover:border-[#0F4221] hover:bg-[#F8F7F4] transition-colors cursor-pointer"
                  >
                    {promptText}
                  </button>
                ))}
              </div>
            </div>

            {/* Instant Multilingual Preview Card when clicked before live call */}
            {previewAnswer && !isConnected && (
              <div className="rounded-xl border border-[#CFD5CC] bg-[#F8F7F4] p-3.5 space-y-1.5">
                <div className="text-xs font-bold text-[#0F4221]">{previewAnswer.title}</div>
                <p className="text-xs text-[#263029] leading-relaxed">{previewAnswer.answer}</p>
              </div>
            )}

            {/* Live Transcript */}
            {transcript.length > 0 && (
              <div className="space-y-2 border-t border-[#E5E8E1] pt-3">
                <div className="text-[11px] font-semibold text-[#5A675D]">Live Transcript</div>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {transcript.map((entry) => (
                    <div
                      key={entry.id}
                      className={`rounded-lg px-3 py-2 text-xs leading-relaxed ${
                        entry.role === 'user'
                          ? 'bg-[#E9EFEA] text-[#111914] ml-6'
                          : 'bg-[#F8F7F4] border border-[#E0E3DC] text-[#1C2720] mr-4'
                      }`}
                    >
                      <span className="block text-[10px] font-semibold text-[#0F4221] mb-0.5">
                        {entry.role === 'user' ? 'You' : 'Malik & Co. Desk'}
                      </span>
                      {entry.text}
                    </div>
                  ))}
                  <div ref={transcriptEndRef} />
                </div>
              </div>
            )}

            {/* Live Text Message Input (active during connected session) */}
            {isConnected && (
              <form onSubmit={handleSendText} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={textDraft}
                  onChange={(e) => setTextDraft(e.target.value)}
                  placeholder="Type plot details or a follow-up question..."
                  className="flex-1 rounded-lg border border-[#CFD5CC] bg-white px-3 py-2 text-xs text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                />
                <button
                  type="submit"
                  aria-label="Send message to voice agent"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0F4221] p-2 text-white hover:bg-[#0A2E17] transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Footer link to written consultation */}
          <div className="px-4 py-2.5 bg-[#F8F7F4] border-t border-[#E0E3DC] flex items-center justify-between gap-2 text-[11px] text-[#4B584E]">
            <a href="tel:03342199979" className="font-mono-tabular font-semibold text-[#0F4221] hover:underline">
              0334-2199979
            </a>
            {onNavigateToContact && (
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onNavigateToContact();
                }}
                className="font-semibold text-[#0F4221] hover:underline cursor-pointer whitespace-nowrap"
              >
                Written BOQ Form &rarr;
              </button>
            )}
          </div>
        </section>
      )}

      {/* Compact Floating Launcher Button (keeps mobile sticky footprint minimal) */}
      <button
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Minimize Voice Consultation Desk' : 'Open Voice Consultation Desk'}
        className="extrude-btn inline-flex items-center gap-2.5 rounded-xl bg-[#0F4221] px-4 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#0A2E17] cursor-pointer whitespace-nowrap"
      >
        {isConnected && (
          <span
            aria-hidden="true"
            className={`w-2 h-2 rounded-full shrink-0 ${
              conversation.isSpeaking ? 'bg-[#F4B41A]' : 'bg-[#4ADE80]'
            }`}
          />
        )}
        <Mic className="w-4 h-4 text-[#F4B41A] shrink-0" aria-hidden="true" />
        <span>{isConnected ? 'Voice Desk Live' : 'Voice Desk · Ask Malik & Co.'}</span>
      </button>
    </div>
  );
};

export const ElevenLabsVoiceDesk: React.FC<ElevenLabsVoiceDeskProps> = (props) => {
  return (
    <ConversationProvider>
      <VoiceDeskInner {...props} />
    </ConversationProvider>
  );
};
