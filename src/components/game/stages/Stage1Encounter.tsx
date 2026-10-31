import React, { useState } from 'react';
import { ClinicalCase, HistoryQuestion } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Stethoscope, AlertTriangle, CheckCircle, MessageSquare, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage1Encounter: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedRationale, setExpandedRationale] = useState<Record<string, boolean>>({});

  const questions = clinicalCase.stages.historyQuestions;
  const revealedIds = session.revealedQuestions || [];

  const handleAskQuestion = (q: HistoryQuestion) => {
    if (!revealedIds.includes(q.id)) {
      const next = [...revealedIds, q.id];
      onUpdateSession({ revealedQuestions: next });
    }
  };

  const toggleRationale = (id: string) => {
    setExpandedRationale(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate score and feedback
  const handleProceed = () => {
    let score = 0;
    const feedback: string[] = [];
    const redFlagCount = questions.filter(q => q.isRedFlag).length;
    const revealedRedFlags = questions.filter(q => q.isRedFlag && revealedIds.includes(q.id)).length;

    questions.forEach(q => {
      if (revealedIds.includes(q.id)) {
        score += q.scoreImpact;
      }
    });

    if (revealedRedFlags === redFlagCount) {
      feedback.push('Excellent history taking! You identified all critical red-flag B symptoms and hemorrhagic risk questions.');
      score += 20; // bonus
    } else {
      feedback.push(`You uncovered ${revealedRedFlags} of ${redFlagCount} critical systemic red-flag questions.`);
    }

    onCompleteStage(Math.max(10, score), feedback);
  };

  const filteredQuestions = questions.filter(q => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'chief_complaint', label: 'Chief Complaint' },
    { key: 'hpi', label: 'History of Present Illness' },
    { key: 'pmh', label: 'Past Medical' },
    { key: 'meds', label: 'Medications' },
    { key: 'social', label: 'Social & Exposures' },
    { key: 'ros', label: 'Review of Systems' },
  ];

  return (
    <div className="space-y-8">
      {/* Patient Header & Initial Presentation Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 01</span>
              <span>·</span>
              <span>CLINICAL ENCOUNTER</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Patient History Taking</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <div className="text-[11px] font-mono text-slate-400">PATIENT PROFILE</div>
            <div className="text-sm font-bold text-white mt-1">
              {clinicalCase.patientProfile.age}-year-old {clinicalCase.patientProfile.sex}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{clinicalCase.patientProfile.setting}</div>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl md:col-span-2">
            <div className="text-[11px] font-mono text-slate-400">CHIEF COMPLAINT</div>
            <div className="text-sm font-semibold text-emerald-300 mt-1">
              "{clinicalCase.patientProfile.chiefComplaint}"
            </div>
            <div className="text-xs text-slate-300 mt-1 leading-relaxed">
              {clinicalCase.patientProfile.initialPresentation}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive History Questions Workbench */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-400" />
              <span>Interactive Clinical Inquiry</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select questions to uncover clinical details. High-yield and red-flag questions build your diagnostic score.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
            Questions Explored: <span className="text-emerald-400 font-bold tabular-nums">{revealedIds.length}</span> / {questions.length}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setSelectedCategory(c.key)}
              className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === c.key
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.map((q) => {
            const isRevealed = revealedIds.includes(q.id);
            const isRationaleOpen = expandedRationale[q.id];

            return (
              <div
                key={q.id}
                className={`border rounded-xl transition-all ${
                  isRevealed
                    ? 'bg-slate-900/90 border-slate-700/80'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                      isRevealed
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      {isRevealed ? <CheckCircle className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase text-slate-400">{q.category.replace('_', ' ')}</span>
                        {q.isRedFlag && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-1.5 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" />
                            RED FLAG
                          </span>
                        )}
                        {q.relevance === 'high' && (
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-1.5 py-0.5 rounded">
                            HIGH YIELD
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-medium text-slate-200">
                        {q.questionText}
                      </div>
                    </div>
                  </div>

                  {!isRevealed ? (
                    <button
                      onClick={() => handleAskQuestion(q)}
                      className="cursor-pointer px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg transition-colors whitespace-nowrap self-end sm:self-auto"
                    >
                      Ask Patient
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleRationale(q.id)}
                      className="cursor-pointer text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 self-end sm:self-auto"
                    >
                      <span>Educational Rationale</span>
                      {isRationaleOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Patient Answer Reveal */}
                {isRevealed && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 bg-slate-950/50">
                    <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center justify-between">
                      <span>PATIENT RESPONSE:</span>
                      {q.isDocumented ? (
                        <span className="text-[10px] font-mono text-emerald-400">VERIFIED PATIENT DATA</span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400">Not documented in record</span>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-100 italic bg-slate-900/60 border border-slate-800 p-3.5 rounded-lg leading-relaxed">
                      "{q.patientAnswer}"
                    </div>

                    {isRationaleOpen && (
                      <div className="mt-3 p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-200 leading-relaxed">
                        <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Clinical Reasoning Insight</span>
                        </div>
                        {q.educationalRationale}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Completion Footer Bar */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Uncovered {revealedIds.length} of {questions.length} questions. You may proceed whenever you feel you have gathered sufficient clinical history.
        </div>
        <button
          onClick={handleProceed}
          disabled={revealedIds.length === 0}
          className={`cursor-pointer px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
            revealedIds.length > 0
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Proceed to Physical Examination →
        </button>
      </div>
    </div>
  );
};
