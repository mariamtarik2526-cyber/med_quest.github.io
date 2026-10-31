import React, { useState } from 'react';
import { ClinicalCase, ClinicalTimelinePoint } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Calendar, TrendingDown, AlertTriangle, Info, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage11ClinicalCourse: React.FC<Props> = ({
  clinicalCase,
  session,
  onCompleteStage,
}) => {
  const timeline = clinicalCase.stages.timeline;
  const [selectedPointIndex, setSelectedPointIndex] = useState<number>(2); // Default to the 04 Oct critical point

  const activePoint = timeline[selectedPointIndex] || timeline[0];

  const handleProceed = () => {
    onCompleteStage(25, [
      'Clinical trajectory mastered! You analyzed the temporal dynamics of severe cytopenias and secondary hyperinflammation.'
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 11</span>
              <span>·</span>
              <span>CLINICAL TRAJECTORY & SERIAL LABS</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Documented Clinical Course</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          Follow the patient's verified chronological course. Examine serial hematologic and biochemical trajectories to identify the inflection point of acute physiological deterioration.
        </p>
      </div>

      {/* Interactive Timeline Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {timeline.map((tp: ClinicalTimelinePoint, idx: number) => {
          const isSelected = selectedPointIndex === idx;

          return (
            <button
              key={tp.date}
              onClick={() => setSelectedPointIndex(idx)}
              className={`cursor-pointer p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 border-emerald-400 text-white shadow-sm'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-[11px] font-mono mb-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{tp.date}</span>
              </div>
              <div className="text-xs font-bold text-slate-200 line-clamp-1">{tp.event}</div>
            </button>
          );
        })}
      </div>

      {/* Trajectory Comparison Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-emerald-400">{activePoint.date}</div>
            <h3 className="text-lg font-bold text-white mt-0.5">{activePoint.event}</h3>
            <div className="text-xs text-slate-400 mt-1">Status: {activePoint.vitalStatus}</div>
          </div>
          <DataIntegrityBadge label={activePoint.dataLabel} />
        </div>

        {/* Key Laboratory Values Bar */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Verified Laboratory Snapshot:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {activePoint.keyLabs.map((lab, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border font-mono ${
                  lab.isCritical
                    ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
                    : 'bg-slate-950/70 border-slate-800 text-slate-200'
                }`}
              >
                <div className="text-[10px] text-slate-400 truncate">{lab.name}</div>
                <div className="text-base font-bold tabular-nums mt-0.5">{lab.value}</div>
                <div className="text-[10px] text-slate-500">{lab.unit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative & Pathophysiology */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
            <div className="text-xs font-bold text-slate-300">Clinical Narrative:</div>
            <p className="text-xs text-slate-400 leading-relaxed">{activePoint.clinicalStatus}</p>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-1">
            <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Diagnostic Commentary:</span>
            </div>
            <p className="text-xs text-cyan-100 leading-relaxed">{activePoint.commentary}</p>
          </div>
        </div>

        {/* Serial Trend Comparison Table */}
        <div className="pt-4 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Serial Trajectory Comparison (17 Sep vs 04 Oct):
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2 pr-4">Parameter</th>
                  <th className="py-2 px-4">17 Sep 2026</th>
                  <th className="py-2 px-4">04 Oct 2026</th>
                  <th className="py-2 px-4">Trajectory Change</th>
                  <th className="py-2 pl-4">Clinical Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                <tr>
                  <td className="py-3 pr-4 font-bold text-white">Hemoglobin</td>
                  <td className="py-3 px-4">8.3 g/dL</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">3.9 g/dL</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>-53% (Critical drop)</span>
                  </td>
                  <td className="py-3 pl-4 font-sans text-xs text-slate-400">
                    Peripheral destruction, splenic sequestration, secondary hemophagocytosis.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-white">Platelets</td>
                  <td className="py-3 px-4">25 × 10³/µL</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">9 × 10³/µL</td>
                  <td className="py-3 px-4 text-rose-400 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>-64% (Severe bleeding risk)</span>
                  </td>
                  <td className="py-3 pl-4 font-sans text-xs text-slate-400">
                    Profound consumptive/sequestrative thrombocytopenia; marrow shows mature megakaryocytes.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-white">Liver Function</td>
                  <td className="py-3 px-4">Baseline</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">AST 393 / Bili 9.15</td>
                  <td className="py-3 px-4 text-rose-400">Acute hepatic injury</td>
                  <td className="py-3 pl-4 font-sans text-xs text-slate-400">
                    Hepatic infiltration by lymphoma cells or secondary cytokine-mediated hepatitis.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Chronological course and serial trend synthesis complete.
        </div>
        <button
          onClick={handleProceed}
          className="cursor-pointer px-6 py-2.5 text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl transition-all shadow-sm"
        >
          View Final Debrief & Learning Report →
        </button>
      </div>
    </div>
  );
};
