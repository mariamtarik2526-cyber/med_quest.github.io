import React, { useState } from 'react';
import { ClinicalCase } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Award, CheckCircle2, AlertTriangle, BookOpen, BrainCircuit } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage8DiagnosticChallenge: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const challenge = clinicalCase.stages.diagnosticChallenge;
  const [selectedPrimary, setSelectedPrimary] = useState<string>(
    session.submittedDiagnosis?.primary || ''
  );
  const [selectedSubtype, setSelectedSubtype] = useState<string>(
    session.submittedDiagnosis?.subtype || ''
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(
    !!session.submittedDiagnosis
  );

  const handleSubmit = () => {
    setIsSubmitted(true);
    const isCorrectPrimary = selectedPrimary === challenge.correctPrimary;
    const isCorrectSubtype = selectedSubtype === challenge.correctSubtype;
    const isOverallCorrect = isCorrectPrimary && isCorrectSubtype;

    onUpdateSession({
      submittedDiagnosis: {
        primary: selectedPrimary,
        subtype: selectedSubtype,
        isCorrect: isOverallCorrect,
      }
    });

    let score = 0;
    const feedback: string[] = [];

    if (isCorrectPrimary) score += 50;
    if (isCorrectSubtype) score += 30;

    if (isOverallCorrect) {
      feedback.push('OUTSTANDING DIAGNOSTIC PERFORMANCE! You correctly identified Classical Hodgkin Lymphoma, Mixed Cellularity Subtype.');
    } else if (isCorrectPrimary) {
      feedback.push(`You correctly diagnosed Classical Hodgkin Lymphoma! Subtype is Mixed Cellularity due to the polymorphic inflammatory infiltrate and absence of broad collagen bands.`);
    } else {
      feedback.push(`Your selection: ${selectedPrimary}. The histopathology and IHC profile conclusively establish Classical Hodgkin Lymphoma.`);
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
              <span>STAGE 08</span>
              <span>·</span>
              <span>DIAGNOSTIC CHALLENGE</span>
            </div>
            <h2 className="text-2xl font-bold text-white">The Diagnostic Decision</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          {challenge.question}
        </p>
      </div>

      {/* Decision Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Step 1: Primary Diagnosis Selection */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            1. Select Primary Malignancy:
          </div>

          <div className="space-y-2.5">
            {challenge.primaryOptions.map((opt) => {
              const isSelected = selectedPrimary === opt;
              const isCorrect = opt === challenge.correctPrimary;

              return (
                <div
                  key={opt}
                  onClick={() => !isSubmitted && setSelectedPrimary(opt)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/60 text-white'
                        : isSelected
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                      : isSelected
                      ? 'bg-slate-800/90 border-emerald-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && !isCorrect && isSelected && (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Subtype Selection */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            2. Select Histological Subtype:
          </div>

          <div className="space-y-2.5">
            {challenge.subtypeOptions.map((sub) => {
              const isSelected = selectedSubtype === sub;
              const isCorrect = sub === challenge.correctSubtype;

              return (
                <div
                  key={sub}
                  onClick={() => !isSubmitted && setSelectedSubtype(sub)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSubmitted
                      ? isCorrect
                        ? 'bg-emerald-950/50 border-emerald-500/60 text-white'
                        : isSelected
                        ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                      : isSelected
                      ? 'bg-slate-800/90 border-cyan-400 text-white shadow-sm'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-semibold">{sub}</span>
                  {isSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {isSubmitted && !isCorrect && isSelected && (
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Post Submission Diagnostic Walkthrough */}
      {isSubmitted && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono uppercase">
            <Award className="w-4 h-4" />
            <span>Diagnostic Verification & Rationale</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {challenge.rationale}
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Key Diagnostic Pearls:
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {challenge.pearls.map((pearl, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-950/50 border border-slate-800/80 p-3 rounded-lg">
                  <span className="text-cyan-400 font-bold">#0{i + 1}</span>
                  <span>{pearl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          {!isSubmitted
            ? 'Select both primary diagnosis and subtype to submit your diagnostic decision.'
            : 'Diagnosis submitted. Proceed to anatomical staging map.'}
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedPrimary || !selectedSubtype}
            className={`cursor-pointer px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
              selectedPrimary && selectedSubtype
                ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Confirm & Submit Final Diagnosis
          </button>
        ) : (
          <div className="text-xs font-mono text-emerald-400 font-semibold">
            Proceeding to Disease Staging & Extent...
          </div>
        )}
      </div>
    </div>
  );
};
