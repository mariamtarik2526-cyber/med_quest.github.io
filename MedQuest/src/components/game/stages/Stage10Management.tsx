import React, { useState } from 'react';
import { ClinicalCase, ManagementOption } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { ShieldAlert, CheckCircle2, AlertTriangle, Info, HeartPulse } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage10Management: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const management = clinicalCase.stages.management;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    session.selectedManagementOptions || []
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const toggleOption = (id: string) => {
    if (isSubmitted) return;
    const next = selectedOptions.includes(id)
      ? selectedOptions.filter(o => o !== id)
      : [...selectedOptions, id];
    setSelectedOptions(next);
    onUpdateSession({ selectedManagementOptions: next });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    let score = 0;
    const feedback: string[] = [];

    const recommendedIds = management.options.filter(o => o.isRecommended).map(o => o.id);
    const chosenRec = selectedOptions.filter(id => recommendedIds.includes(id));
    const chosenHarmful = selectedOptions.filter(id => !recommendedIds.includes(id));

    selectedOptions.forEach(id => {
      const opt = management.options.find(o => o.id === id);
      if (opt) score += opt.scoreImpact;
    });

    if (selectedOptions.includes('mgmt-5')) {
      feedback.push('CRITICAL SAFETY FAILURE: Discharging an unstable patient with Hb 3.9 g/dL and Platelets 9 × 10³/µL is life-threatening.');
    } else if (chosenRec.length === recommendedIds.length && chosenHarmful.length === 0) {
      score += 25; // bonus
      feedback.push('EXEMPLARY CLINICAL TRIAGE! You prioritized urgent transfusion resuscitation, broad-spectrum sepsis coverage, and secondary HLH diagnostic workup before chemotherapy.');
    } else {
      feedback.push(`You selected ${chosenRec.length} of ${recommendedIds.length} recommended urgent clinical actions.`);
    }

    onCompleteStage(Math.max(10, score), feedback);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 10</span>
              <span>·</span>
              <span>MANAGEMENT SIMULATION</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Acute Clinical Management & Safety</h2>
          </div>
          <DataIntegrityBadge label="GENERAL EDUCATIONAL INFORMATION" />
        </div>

        <div className="pt-6 p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs sm:text-sm text-rose-200 leading-relaxed flex items-start gap-3">
          <HeartPulse className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-300">EMERGENCY CLINICAL SITUATION (04 OCT 2026): </span>
            {management.clinicalScenario}
          </div>
        </div>
      </div>

      {/* Decision Checklist */}
      <div className="space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Select Recommended Management Interventions:
        </div>

        {management.options.map((opt: ManagementOption) => {
          const isSelected = selectedOptions.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => toggleOption(opt.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                isSubmitted
                  ? opt.isRecommended
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                    : isSelected
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60'
                  : isSelected
                  ? 'bg-slate-800 border-emerald-400 text-white shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                    : 'border-slate-700 bg-slate-950'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="text-sm font-bold text-white flex items-center justify-between">
                    <span>{opt.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {opt.priorityCategory.replace('_', ' ')}
                    </span>
                  </div>

                  {isSubmitted && (
                    <div className="text-xs space-y-1.5 pt-2 border-t border-slate-800/80 mt-2">
                      <div className="text-slate-200 leading-relaxed">
                        <span className="font-semibold text-cyan-300">Rationale: </span>
                        {opt.clinicalRationale}
                      </div>
                      <div className="text-[11px] text-slate-400 italic font-mono">
                        {opt.guidelineVsActualNote}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidelines Summary */}
      {isSubmitted && (
        <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-100 leading-relaxed">
          <div className="font-bold text-cyan-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Info className="w-4 h-4" />
            <span>Clinical Practice Consensus</span>
          </div>
          {management.guidelineSummary}
        </div>
      )}

      {/* Action Footer */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Selected {selectedOptions.length} interventions.
        </div>
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className={`cursor-pointer px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              selectedOptions.length > 0
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Submit Management Priorities
          </button>
        ) : (
          <div className="text-xs font-mono text-emerald-400 font-semibold">
            Proceeding to Clinical Timeline & Trends...
          </div>
        )}
      </div>
    </div>
  );
};
