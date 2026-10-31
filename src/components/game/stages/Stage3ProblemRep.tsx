import React, { useState } from 'react';
import { ClinicalCase } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { BrainCircuit, CheckCircle2, AlertCircle, BookOpen, Layers } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage3ProblemRep: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const problemRepData = clinicalCase.stages.problemRepresentation;
  const [selectedProblems, setSelectedProblems] = useState<string[]>(session.selectedProblems || []);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleProblem = (id: string) => {
    if (submitted) return;
    const next = selectedProblems.includes(id)
      ? selectedProblems.filter(p => p !== id)
      : [...selectedProblems, id];
    setSelectedProblems(next);
    onUpdateSession({ selectedProblems: next });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const primaryOptionIds = problemRepData.problemOptions.filter(o => o.isPrimaryProblem).map(o => o.id);
    const correctlySelected = selectedProblems.filter(id => primaryOptionIds.includes(id));
    const incorrectlySelected = selectedProblems.filter(id => !primaryOptionIds.includes(id));

    let score = correctlySelected.length * 15 - incorrectlySelected.length * 10;
    const feedback: string[] = [];

    if (correctlySelected.length === primaryOptionIds.length && incorrectlySelected.length === 0) {
      score += 20; // bonus for perfect problem representation
      feedback.push('Flawless problem representation! You distilled the patient’s multi-system presentation into generalized adenopathy, severe pancytopenia, hepatosplenomegaly, and hyperinflammatory fevers.');
    } else {
      feedback.push(`You selected ${correctlySelected.length} of ${primaryOptionIds.length} cardinal syndromic clusters.`);
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
              <span>STAGE 03</span>
              <span>·</span>
              <span>PROBLEM REPRESENTATION</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Clinical Syndrome Synthesis</h2>
          </div>
          <DataIntegrityBadge label="GENERAL EDUCATIONAL INFORMATION" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          {problemRepData.clinicalVignettePrompt}
        </p>
      </div>

      {/* Options Selection Grid */}
      <div className="space-y-3">
        {problemRepData.problemOptions.map((opt) => {
          const isSelected = selectedProblems.includes(opt.id);

          return (
            <div
              key={opt.id}
              onClick={() => toggleProblem(opt.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                submitted
                  ? opt.isPrimaryProblem
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                    : isSelected
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-slate-900/30 border-slate-800 text-slate-500 opacity-60'
                  : isSelected
                  ? 'bg-slate-800/90 border-emerald-400 text-white shadow-sm'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold'
                    : 'border-slate-700 bg-slate-950'
                }`}>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="text-sm font-semibold text-white">{opt.label}</div>
                  {submitted && (
                    <div className="text-xs text-slate-300 pt-1 leading-relaxed border-t border-slate-800/80 mt-2">
                      <span className="font-semibold text-cyan-300">Rationale: </span>
                      {opt.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expert Summary Reveal when Submitted */}
      {submitted && (
        <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase">
            <BrainCircuit className="w-4 h-4" />
            <span>Master Diagnostician Formulation</span>
          </div>
          <div className="text-sm sm:text-base text-cyan-100 italic bg-cyan-950/40 border border-cyan-500/20 p-4 rounded-xl leading-relaxed">
            "{problemRepData.expertSummary}"
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            In diagnostic reasoning literature (Bowen 2006), translating raw patient findings into abstract semantic qualifiers (young male, generalized non-tender adenopathy, subacute, multi-station, progressive pancytopenia, hyperferritinemic systemic inflammation) activates the physician's illness scripts.
          </p>
        </div>
      )}

      {/* Action Bar */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Selected {selectedProblems.length} clinical syndromes.
        </div>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedProblems.length === 0}
            className={`cursor-pointer px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              selectedProblems.length > 0
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Submit Problem Representation
          </button>
        ) : (
          <div className="text-xs font-mono text-emerald-400 font-semibold">
            Proceeding to Differential Diagnosis...
          </div>
        )}
      </div>
    </div>
  );
};
