import React, { useState } from 'react';
import { ClinicalCase, ExaminationFinding } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Activity, CheckCircle2, AlertCircle, HelpCircle, Eye, Info } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage2Examination: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const findings = clinicalCase.stages.examinationFindings;
  const examinedSystems = session.examinedSystems || [];
  const [activeSystemKey, setActiveSystemKey] = useState<string>(findings[0].system);

  const handleExamineSystem = (sys: string) => {
    setActiveSystemKey(sys);
    if (!examinedSystems.includes(sys)) {
      onUpdateSession({ examinedSystems: [...examinedSystems, sys] });
    }
  };

  const handleProceed = () => {
    const positiveCount = findings.filter(f => f.status === 'positive').length;
    const examinedPositive = findings.filter(f => f.status === 'positive' && examinedSystems.includes(f.system)).length;
    let score = examinedSystems.length * 10;
    const feedback: string[] = [];

    if (examinedPositive === positiveCount) {
      score += 25;
      feedback.push('Comprehensive physical examination! You discovered generalized lymphadenopathy, hepatosplenomegaly, and peripheral edema.');
    } else {
      feedback.push(`You examined ${examinedSystems.length} systems. Reviewing all key positive findings ensures no critical organomegaly is overlooked.`);
    }

    onCompleteStage(score, feedback);
  };

  const activeFinding = findings.find(f => f.system === activeSystemKey) || findings[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 02</span>
              <span>·</span>
              <span>PHYSICAL EXAMINATION</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Systemic Clinical Examination</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          Systematically examine anatomical regions. Distinguish between positive findings, negative documented findings, and parameters not documented in the medical record.
        </p>
      </div>

      {/* Interactive Examination Workspace: Systems Grid + Findings Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Systems Selector Column */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>Anatomical Systems:</span>
            <span className="font-mono text-emerald-400 font-semibold">{examinedSystems.length} / {findings.length} Examined</span>
          </div>

          {findings.map((f) => {
            const isSelected = activeSystemKey === f.system;
            const isExamined = examinedSystems.includes(f.system);

            return (
              <button
                key={f.system}
                onClick={() => handleExamineSystem(f.system)}
                className={`cursor-pointer w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-white shadow-sm'
                    : isExamined
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-slate-900/40 border-slate-800/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    f.status === 'positive'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : f.status === 'not_documented'
                      ? 'bg-slate-800 text-slate-500'
                      : 'bg-cyan-500/10 text-cyan-400'
                  }`}>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{f.label}</div>
                    <div className="text-[11px] text-slate-400">
                      {f.status === 'positive' && <span className="text-rose-400">Abnormal / Positive</span>}
                      {f.status === 'negative_documented' && <span className="text-cyan-400">Normal Documented</span>}
                      {f.status === 'not_documented' && <span className="text-slate-500">Not Documented</span>}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono">
                  {isExamined ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Recorded</span>
                    </span>
                  ) : (
                    <span className="text-slate-500">Click to Inspect</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Examination Card Column */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">INSPECTING SYSTEM</div>
              <h3 className="text-lg font-bold text-white">{activeFinding.label}</h3>
            </div>
            <DataIntegrityBadge label={activeFinding.dataLabel} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Documented Clinical Findings:
              </div>
              <div className={`p-4 rounded-xl text-sm leading-relaxed ${
                activeFinding.status === 'positive'
                  ? 'bg-slate-950/70 border border-rose-950/60 text-slate-100'
                  : activeFinding.status === 'not_documented'
                  ? 'bg-slate-950/50 border border-slate-800 text-slate-400 italic'
                  : 'bg-slate-950/50 border border-slate-800 text-slate-200'
              }`}>
                {activeFinding.description}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Diagnostic & Pathophysiologic Significance:</span>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 leading-relaxed">
                {activeFinding.clinicalSignificance}
              </div>
            </div>

            {/* Data integrity advisory */}
            {activeFinding.status === 'not_documented' && (
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Data Integrity Protocol: </span>
                  This system was not explicitly transcribed in the available verified clinical chart. In clinical reasoning, absent documentation must never be assumed to represent a normal examination.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Examined {examinedSystems.length} of {findings.length} systems.
        </div>
        <button
          onClick={handleProceed}
          disabled={examinedSystems.length === 0}
          className={`cursor-pointer px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
            examinedSystems.length > 0
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Formulate Problem Representation →
        </button>
      </div>
    </div>
  );
};
