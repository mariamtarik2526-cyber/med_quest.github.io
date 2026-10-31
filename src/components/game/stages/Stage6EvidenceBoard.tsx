import React, { useState } from 'react';
import { ClinicalCase, EvidenceClue } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { BrainCircuit, CheckCircle2, ShieldAlert, HelpCircle, Layers, ArrowRight } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage6EvidenceBoard: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const clues = clinicalCase.stages.evidenceClues;
  // Initialize placements from session or default correct categories
  const [placements, setPlacements] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    if (session.pinnedEvidence && session.pinnedEvidence.length > 0) {
      session.pinnedEvidence.forEach(pe => {
        map[pe.clueId] = pe.column;
      });
    } else {
      // Default to initial category
      clues.forEach(c => {
        map[c.id] = c.category;
      });
    }
    return map;
  });

  const columns = [
    {
      id: 'supporting_cHL',
      title: 'Supporting Leading cHL',
      subtitle: 'Pathology, IHC, Nodal Distribution',
      icon: CheckCircle2,
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
    },
    {
      id: 'alternative_differentials',
      title: 'Secondary / Alternative Hypotheses',
      subtitle: 'Secondary HLH, Hyperinflammation',
      icon: Layers,
      accent: 'border-amber-500/40 text-amber-400 bg-amber-950/20'
    },
    {
      id: 'urgent_priorities',
      title: 'Urgent Life-Threatening Safety',
      subtitle: 'Emergency Transfusion & Bleeding Risk',
      icon: ShieldAlert,
      accent: 'border-rose-500/40 text-rose-400 bg-rose-950/20'
    },
    {
      id: 'unresolved_questions',
      title: 'Unresolved Clinical Questions',
      subtitle: 'Hepatic Infiltration vs Cholestasis',
      icon: HelpCircle,
      accent: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20'
    }
  ];

  const handleMoveClue = (clueId: string, targetCol: string) => {
    const next = { ...placements, [clueId]: targetCol };
    setPlacements(next);

    const pinnedArray = Object.entries(next).map(([cId, col]) => ({
      clueId: cId,
      column: col as any
    }));
    onUpdateSession({ pinnedEvidence: pinnedArray });
  };

  const handleProceed = () => {
    let score = 25;
    const feedback: string[] = [];
    let correctCount = 0;

    clues.forEach(c => {
      if (placements[c.id] === c.category) {
        correctCount++;
      }
    });

    if (correctCount === clues.length) {
      score += 25;
      feedback.push('Masterful clinical synthesis! You accurately separated definitive diagnostic pathology from emergent cytopenic safety priorities and secondary HLH suspicion.');
    } else {
      feedback.push(`Evidence board organized with ${correctCount} of ${clues.length} clues placed in their optimal reasoning vectors.`);
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
              <span>STAGE 06</span>
              <span>·</span>
              <span>THE EVIDENCE BOARD</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Clinical Evidence Synthesis</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          Structure complex clinical information into meaningful diagnostic vectors. Reorganize findings to distinguish definitive evidence for Hodgkin lymphoma from acute physiological emergencies and unresolved questions.
        </p>
      </div>

      {/* 4 Column Pinboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        {columns.map((col) => {
          const colClues = clues.filter(c => placements[c.id] === col.id);
          const Icon = col.icon;

          return (
            <div
              key={col.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col min-h-[480px]"
            >
              <div className={`p-3 rounded-xl border mb-4 ${col.accent}`}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4" />
                  <h3 className="text-xs font-bold text-white">{col.title}</h3>
                </div>
                <div className="text-[10px] text-slate-400">{col.subtitle}</div>
              </div>

              {/* Clues In Column */}
              <div className="space-y-3 flex-1">
                {colClues.map((clue) => (
                  <div
                    key={clue.id}
                    className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-3.5 space-y-2 shadow-sm"
                  >
                    <div className="text-xs font-bold text-slate-100">{clue.title}</div>
                    <div className="text-[11px] text-slate-300 leading-relaxed">{clue.description}</div>
                    <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900 flex items-center justify-between">
                      <span className="truncate max-w-[140px]">{clue.source}</span>
                      <DataIntegrityBadge label={clue.dataLabel} className="scale-90 origin-right" />
                    </div>

                    {/* Quick Move Selector */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1">
                      <span className="text-[10px] text-slate-500">Move:</span>
                      <select
                        value={placements[clue.id]}
                        onChange={(e) => handleMoveClue(clue.id, e.target.value)}
                        className="bg-slate-900 border border-slate-800 text-[10px] text-slate-300 rounded px-1.5 py-0.5 focus:outline-none"
                      >
                        {columns.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {colClues.length === 0 && (
                  <div className="h-32 flex items-center justify-center text-[11px] text-slate-600 border border-dashed border-slate-800 rounded-xl">
                    No clues in this vector
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          All {clues.length} key evidence items categorized. Ready to examine the histopathology under high-power microscopy.
        </div>
        <button
          onClick={handleProceed}
          className="cursor-pointer px-6 py-2.5 text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl transition-all shadow-sm"
        >
          Enter Histopathology & IHC Lab →
        </button>
      </div>
    </div>
  );
};
