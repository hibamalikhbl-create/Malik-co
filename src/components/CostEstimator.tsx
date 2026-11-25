import React, { useMemo, useState } from 'react';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';
import { PAKISTAN_CITIES } from '../data/malikData';

export interface EstimatorTransferPayload {
  city: string;
  projectType: string;
  areaSummary: string;
  estimatedBudgetPkr: string;
}

interface CostEstimatorProps {
  onTransferToQuote: (payload: EstimatorTransferPayload) => void;
}

type ScopeType = 'grey' | 'turnkey' | 'industrial' | 'civil';
type UnitType = 'sqft' | 'marla' | 'kanal' | 'rft';
type FoundationType = 'raft' | 'piling';

const SCOPE_OPTIONS: { id: ScopeType; label: string; baseRatePerSqFt: number; note: string }[] = [
  {
    id: 'grey',
    label: 'RCC Grey Structure',
    baseRatePerSqFt: 3250,
    note: 'Excavation, Grade-60 steel, RCC slabs, brickwork & plaster',
  },
  {
    id: 'turnkey',
    label: 'Turnkey Commercial',
    baseRatePerSqFt: 7450,
    note: 'Complete RCC structure, glazing, MEP, HVAC & architectural finish',
  },
  {
    id: 'industrial',
    label: 'Industrial Steel Portal',
    baseRatePerSqFt: 4400,
    note: 'Clear-span PEB trusses, FM2 laser-screeded slab & crane beams',
  },
  {
    id: 'civil',
    label: 'Storm Culvert & Road',
    baseRatePerSqFt: 19500,
    note: 'Calculated per running ft. for Ø 1200mm RCC culvert & sub-base',
  },
];

function formatPkr(amount: number): string {
  if (amount >= 10_000_000) {
    const crore = amount / 10_000_000;
    return `PKR ${crore.toFixed(2)} Crore`;
  }
  const lac = amount / 100_000;
  return `PKR ${lac.toFixed(1)} Lac`;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onTransferToQuote }) => {
  const [city, setCity] = useState<string>('Karachi');
  const [scope, setScope] = useState<ScopeType>('turnkey');
  const [unit, setUnit] = useState<UnitType>('sqft');
  const [quantity, setQuantity] = useState<number>(25000);
  const [storeys, setStoreys] = useState<number>(4);
  const [foundation, setFoundation] = useState<FoundationType>('raft');

  const handleScopeChange = (nextScope: ScopeType) => {
    setScope(nextScope);
    if (nextScope === 'civil') {
      setUnit('rft');
      setQuantity(1200);
    } else if (unit === 'rft') {
      setUnit('sqft');
      setQuantity(25000);
    }
  };

  const calculation = useMemo(() => {
    const selectedCity = PAKISTAN_CITIES.find((c) => c.name === city) || PAKISTAN_CITIES[0];
    const selectedScope = SCOPE_OPTIONS.find((s) => s.id === scope) || SCOPE_OPTIONS[0];

    const safeQty = Math.max(1, Number.isFinite(quantity) ? quantity : 1);
    const effectiveStoreys = scope === 'civil' || scope === 'industrial' ? 1 : Math.max(1, storeys);

    let coveredSqFt = safeQty;
    if (unit === 'marla') coveredSqFt = safeQty * 225 * effectiveStoreys;
    if (unit === 'kanal') coveredSqFt = safeQty * 4500 * effectiveStoreys;
    if (unit === 'sqft') coveredSqFt = safeQty * effectiveStoreys;

    const foundationFactor = foundation === 'piling' ? 1.14 : 1.0;

    let rawTotal = 0;
    if (scope === 'civil') {
      const rft = unit === 'rft' ? safeQty : coveredSqFt / 20;
      rawTotal = rft * selectedScope.baseRatePerSqFt * selectedCity.multiplier * foundationFactor;
    } else {
      rawTotal =
        coveredSqFt * selectedScope.baseRatePerSqFt * selectedCity.multiplier * foundationFactor;
    }

    const lowEstimate = rawTotal * 0.94;
    const highEstimate = rawTotal * 1.07;

    // Indicative material quantities for Pakistani civil planning
    const concreteCubicMeters =
      scope === 'civil'
        ? Math.round((unit === 'rft' ? safeQty : 500) * 1.65)
        : Math.round(coveredSqFt * 0.048);

    const steelMetricTons =
      scope === 'civil'
        ? Math.round(concreteCubicMeters * 0.115)
        : Math.round(coveredSqFt * 0.0046);

    const estimatedMonths =
      scope === 'civil'
        ? Math.max(4, Math.min(24, Math.round((unit === 'rft' ? safeQty : 1000) / 140)))
        : Math.max(6, Math.min(36, Math.round(6 + coveredSqFt / 16000 + effectiveStoreys * 1.1)));

    return {
      selectedCity,
      selectedScope,
      coveredSqFt,
      lowEstimate,
      highEstimate,
      concreteCubicMeters,
      steelMetricTons,
      estimatedMonths,
    };
  }, [city, scope, unit, quantity, storeys, foundation]);

  const handleTransfer = () => {
    const unitLabel =
      unit === 'sqft'
        ? 'Sq. Ft.'
        : unit === 'marla'
        ? 'Marla'
        : unit === 'kanal'
        ? 'Kanal'
        : 'Running Ft.';
    onTransferToQuote({
      city,
      projectType: calculation.selectedScope.label,
      areaSummary: `${quantity.toLocaleString()} ${unitLabel}${
        scope === 'grey' || scope === 'turnkey' ? ` · ${storeys} Floors` : ''
      } (${foundation === 'piling' ? 'Deep Pile Foundation' : 'RCC Raft Foundation'})`,
      estimatedBudgetPkr: `${formatPkr(calculation.lowEstimate)} – ${formatPkr(
        calculation.highEstimate
      )}`,
    });
  };

  return (
    <div className="rounded-2xl border border-[#D4D9CF] bg-white overflow-hidden extrude-card">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Controls */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-[#E4E7E0]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4221] font-semibold">
                Pakistan BOQ Planning Desk
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#111914]">
                Preliminary Project Cost & Resource Estimator
              </h3>
            </div>
            <Calculator className="w-6 h-6 text-[#0F4221] shrink-0" aria-hidden="true" />
          </div>

          {/* Construction Scope Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#344238] mb-2">
              01. Construction Scope
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SCOPE_OPTIONS.map((item) => {
                const active = scope === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScopeChange(item.id)}
                    className={`px-3 py-2.5 text-left rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0F4221] text-white border-[#0F4221]'
                        : 'bg-[#F8F7F4] text-[#263029] border-[#DFE2DC] hover:border-[#0F4221]/50'
                    }`}
                  >
                    <span className="block font-semibold truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-[#4B584E]">{calculation.selectedScope.note}</p>
          </div>

          {/* City + Foundation Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="est-city" className="block text-xs font-semibold text-[#344238] mb-1.5">
                02. Project City (Soil & Seismic Factor)
              </label>
              <select
                id="est-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3 py-2.5 text-sm font-medium text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.seismicZone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#344238] mb-1.5">
                03. Foundation System
              </span>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#F2F3EE]">
                <button
                  type="button"
                  onClick={() => setFoundation('raft')}
                  className={`py-2 px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    foundation === 'raft'
                      ? 'bg-white text-[#0F4221] shadow-sm'
                      : 'text-[#4B584E] hover:text-[#111914]'
                  }`}
                >
                  RCC Raft Slab
                </button>
                <button
                  type="button"
                  onClick={() => setFoundation('piling')}
                  className={`py-2 px-3 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    foundation === 'piling'
                      ? 'bg-white text-[#0F4221] shadow-sm'
                      : 'text-[#4B584E] hover:text-[#111914]'
                  }`}
                >
                  Deep Bored Piles
                </button>
              </div>
            </div>
          </div>

          {/* Plot / Site Area + Storeys */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="est-unit" className="block text-xs font-semibold text-[#344238] mb-1.5">
                04. Measurement Unit
              </label>
              <select
                id="est-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value as UnitType)}
                className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3 py-2.5 text-sm font-medium text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
              >
                {scope !== 'civil' && (
                  <>
                    <option value="sqft">Sq. Ft. (Covered)</option>
                    <option value="marla">Marla (225 sq.ft)</option>
                    <option value="kanal">Kanal (4,500 sq.ft)</option>
                  </>
                )}
                {scope === 'civil' && <option value="rft">Running Ft. (RFT)</option>}
              </select>
            </div>

            <div>
              <label htmlFor="est-qty" className="block text-xs font-semibold text-[#344238] mb-1.5">
                05. Quantity / Footprint
              </label>
              <input
                id="est-qty"
                type="number"
                min={1}
                max={500000}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3 py-2.5 text-sm font-mono-tabular font-semibold text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
              />
            </div>

            <div>
              <label htmlFor="est-floors" className="block text-xs font-semibold text-[#344238] mb-1.5">
                06. Total Storeys
              </label>
              <input
                id="est-floors"
                type="number"
                min={1}
                max={30}
                disabled={scope === 'civil' || scope === 'industrial'}
                value={scope === 'civil' || scope === 'industrial' ? 1 : storeys}
                onChange={(e) => setStoreys(Math.max(1, Math.min(30, Number(e.target.value) || 1)))}
                className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3 py-2.5 text-sm font-mono-tabular font-semibold text-[#111914] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
              />
            </div>
          </div>
        </div>

        {/* Right Live Output Panel */}
        <div className="lg:col-span-5 bg-[#0F4221] text-white p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div>
            <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#F4B41A]">
              Indicative Pakistani Market Estimate
            </div>
            <div className="mt-3 text-3xl sm:text-4xl font-bold font-mono-tabular tracking-tight text-white">
              {formatPkr(calculation.lowEstimate)}
            </div>
            <div className="mt-1 text-sm font-mono-tabular text-[#D1E7D8]">
              to {formatPkr(calculation.highEstimate)}
            </div>
            <p className="mt-3 text-xs text-[#BCE0C7] leading-relaxed">
              Calibrated for {calculation.selectedCity.name} ({calculation.selectedCity.soilNote}).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/15 py-5">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#BCE0C7]">
                {scope === 'civil' ? 'Corridor Length' : 'Total Built-Up'}
              </div>
              <div className="mt-1 text-lg font-bold font-mono-tabular">
                {scope === 'civil'
                  ? `${quantity.toLocaleString()} RFT`
                  : `${calculation.coveredSqFt.toLocaleString()} sq.ft`}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#BCE0C7]">
                Est. Completion
              </div>
              <div className="mt-1 text-lg font-bold font-mono-tabular">
                {calculation.estimatedMonths} Months
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#BCE0C7]">
                Ready-Mix Concrete
              </div>
              <div className="mt-1 text-lg font-bold font-mono-tabular">
                ~{calculation.concreteCubicMeters.toLocaleString()} m³
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#BCE0C7]">
                Grade-60 Rebar
              </div>
              <div className="mt-1 text-lg font-bold font-mono-tabular">
                ~{calculation.steelMetricTons.toLocaleString()} MT
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#D1E7D8]">
              <CheckCircle2 className="w-4 h-4 text-[#F4B41A] shrink-0" aria-hidden="true" />
              <span>Includes PEC C-A site supervision & daily cube-testing QA</span>
            </div>
            <button
              type="button"
              onClick={handleTransfer}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#F4B41A] px-5 py-3 text-sm font-bold text-[#111914] hover:bg-[#FCD34D] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Transfer Scope to Tender Request</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
