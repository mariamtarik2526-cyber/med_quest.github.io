import React, { useState } from 'react';
import { ClinicalCase, DifferentialDiagnosisItem } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Layers, ChevronRight, CheckCircle2, AlertTriangle, HelpCircle, ArrowUpDown } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage4Differential: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const differentials = clinicalCase.stages.differentialDiagnoses;
  const [selectedLeadingId, setSelectedLeadingId] = useState<string>(
    session.rankedDifferentials?.[0] || differentials[0].id
  );
  const [activeDetailId, setActiveDetailId] = useState<string>(selectedLeadingId);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const activeDiff = differentials.find(d => d.id === activeDetailId) || differentials[0];

  const handleSelectLeading = (id: string) => {
    setSelectedLeadingId(id);
    setActiveDetailId(id);
    onUpdateSession({ rankedDifferentials: [id] });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const chosenDiff = differentials.find(d => d.id === selectedLeadingId);
    let score = 20;
    const feedback: string[] = [];

    if (chosenDiff?.isLeading) {
      score += 30; // bonus for choosing Classical Hodgkin Lymphoma as leading
      feedback.push('Excellent clinical judgment! You selected Classical Hodgkin Lymphoma as your leading diagnosis based on the bimodal age, generalized adenopathy, and constitutional symptoms.');
    } else {
      feedback.push(`You selected ${chosenDiff?.diagnosis}. While an essential consideration, Classical Hodgkin Lymphoma is the leading malignancy to prioritize.`);
    }

    onCompleteStage(score, feedback);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 04</span>
              <span>·</span>
              <span>DIFFERENTIAL DIAGNOSIS</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Differential Diagnosis Workspace</h2>
          </div>
          <DataIntegrityBadge label="GENERAL EDUCATIONAL INFORMATION" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          Evaluate each competing diagnosis against the patient's presentation. Analyze the supporting evidence, counter-arguments, and key distinguishing tests, then designate your primary leading working hypothesis.
        </p>
      </div>

      {/* Differential Board: Left list + Right Evidence Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Potential Diagnoses:
          </div>

          {differentials.map((d) => {
            const isLeading = selectedLeadingId === d.id;
            const isInspecting = activeDetailId === d.id;

            return (
              <div
                key={d.id}
                onClick={() => setActiveDetailId(d.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isInspecting
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400">{d.category}</span>
                  {isLeading && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
                      LEADING WORKING HYPOTHESIS
                    </span>
                  )}
                </div>

                <div className="text-sm font-bold text-white mb-2">{d.diagnosis}</div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectLeading(d.id);
                    }}
                    className={`cursor-pointer px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      isLeading
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isLeading ? 'Selected Leading' : 'Set as Leading'}
                  </button>

                  <span className="text-slate-400 hover:text-white flex items-center gap-0.5 text-[11px]">
                    <span>Inspect Evidence</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Card */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <div className="text-[10px] font-mono uppercase text-emerald-400">{activeDiff.category}</div>
            <h3 className="text-xl font-bold text-white mt-0.5">{activeDiff.diagnosis}</h3>
          </div>

          <div className="space-y-5">
            {/* Supporting */}
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Supporting Clinical Clues:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeDiff.supportingEvidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2 bg-emerald-950/20 border border-emerald-500/10 p-2.5 rounded-lg">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Findings Against */}
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Findings Arguing Against / Limitations:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeDiff.findingsAgainst.map((ag, i) => (
                  <li key={i} className="flex items-start gap-2 bg-amber-950/20 border border-amber-500/10 p-2.5 rounded-lg">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{ag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Distinguishing */}
            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Definitive Distinguishing Investigations:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeDiff.distinguishingInvestigations.map((di, i) => (
                  <li key={i} className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-lg text-cyan-200">
                    {di}
                  </li>
                ))}
              </ul>
            </div>

            {/* Educational Notes */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-200">Clinical Commentary: </span>
              {activeDiff.educationalNotes}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Selected Leading: <span className="text-emerald-400 font-bold">{differentials.find(d => d.id === selectedLeadingId)?.diagnosis}</span>
        </div>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-6 py-2.5 text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl transition-all shadow-sm"
          >
            Confirm Hypothesis & Enter Investigation Lab →
          </button>
        ) : (
          <div className="text-xs font-mono text-emerald-400 font-semibold">
            Proceeding to Investigation Lab...
          </div>
        )}
      </div>
    </div>
  );
};
