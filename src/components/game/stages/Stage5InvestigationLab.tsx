import React, { useState } from 'react';
import { ClinicalCase, LabTestResult } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Microscope, AlertTriangle, CheckCircle2, ChevronRight, Info, Filter, ArrowRight } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage5InvestigationLab: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const tests = clinicalCase.stages.investigations;
  const orderedIds = session.orderedInvestigations || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTestId, setActiveTestId] = useState<string>(tests[0].id);

  const handleOrderTest = (test: LabTestResult) => {
    if (!orderedIds.includes(test.id)) {
      const next = [...orderedIds, test.id];
      onUpdateSession({ orderedInvestigations: next });
    }
    setActiveTestId(test.id);
  };

  const handleOrderAllHighYield = () => {
    const allIds = tests.map(t => t.id);
    onUpdateSession({ orderedInvestigations: allIds });
  };

  const handleProceed = () => {
    let score = orderedIds.length * 8;
    const feedback: string[] = [];
    const orderedBiopsy = orderedIds.includes('inv-7');
    const orderedCBC = orderedIds.includes('inv-1') || orderedIds.includes('inv-3');

    if (orderedBiopsy && orderedCBC) {
      score += 25;
      feedback.push('High-yield investigation ordering! You obtained the excisional lymph node biopsy (the diagnostic gold standard) and monitored the critical pancytopenia.');
    } else {
      feedback.push(`You ordered ${orderedIds.length} investigations. Remember that tissue biopsy is mandatory in unexplained lymphadenopathy.`);
    }

    onCompleteStage(score, feedback);
  };

  const activeTest = tests.find(t => t.id === activeTestId) || tests[0];
  const isActiveTestOrdered = orderedIds.includes(activeTest.id);

  const categories = [
    { key: 'all', label: 'All Tests' },
    { key: 'cbc', label: 'CBC & Hematology' },
    { key: 'lft_rft', label: 'Liver & Renal' },
    { key: 'inflammatory', label: 'Acute Phase / HLH' },
    { key: 'bone_marrow', label: 'Bone Marrow' },
    { key: 'imaging', label: 'Imaging (CT/US/MRCP)' },
    { key: 'pathology', label: 'Histopathology' },
    { key: 'ihc', label: 'Immunohistochemistry' },
    { key: 'viral_serology', label: 'Viral Serologies' },
  ];

  const filteredTests = tests.filter(t => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 05</span>
              <span>·</span>
              <span>INVESTIGATION LABORATORY</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Clinical Investigation & Diagnostics</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              Ordered: <span className="text-emerald-400 font-bold tabular-nums">{orderedIds.length}</span> / {tests.length}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          Select and order diagnostic investigations. Review reference ranges, abnormal values, and documented clinical interpretations for hematology, biochemistry, tissue pathology, and cross-sectional imaging.
        </p>
      </div>

      {/* Categories Bar */}
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

      {/* Main Grid: Left Tests Selector + Right Result Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Test List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {filteredTests.map((test) => {
            const isOrdered = orderedIds.includes(test.id);
            const isSelected = activeTestId === test.id;

            return (
              <div
                key={test.id}
                onClick={() => {
                  setActiveTestId(test.id);
                  if (!isOrdered) handleOrderTest(test);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-emerald-500/50 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-slate-400 uppercase">{test.category.replace('_', ' ')}</span>
                  {test.dateDocumented && (
                    <span className="text-[10px] font-mono text-slate-500">{test.dateDocumented}</span>
                  )}
                </div>

                <div className="text-xs font-bold text-white mb-2">{test.name}</div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                  {isOrdered ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Result Available</span>
                    </span>
                  ) : (
                    <span className="text-cyan-400 font-semibold hover:underline">
                      Click to Order Test
                    </span>
                  )}

                  {test.severity === 'critical' && isOrdered && (
                    <span className="text-rose-400 font-mono font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      CRITICAL
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Test Result Inspector */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-mono uppercase text-emerald-400">{activeTest.category.replace('_', ' ')}</div>
              <h3 className="text-lg font-bold text-white">{activeTest.name}</h3>
              {activeTest.dateDocumented && (
                <div className="text-xs font-mono text-slate-400 mt-0.5">Date: {activeTest.dateDocumented}</div>
              )}
            </div>
            <DataIntegrityBadge label={activeTest.dataLabel} />
          </div>

          {!isActiveTestOrdered ? (
            <div className="text-center py-12 space-y-4 bg-slate-950/40 border border-slate-800/80 rounded-xl p-6">
              <Microscope className="w-10 h-10 text-slate-600 mx-auto" />
              <div className="text-sm font-semibold text-slate-300">Test Not Yet Executed</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                <span className="font-semibold text-slate-200">Indication Rationale: </span>
                {activeTest.indicationRationale}
              </p>
              <button
                onClick={() => handleOrderTest(activeTest)}
                className="cursor-pointer px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                Order This Investigation
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Actual Documented Result */}
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Reported Laboratory Value:</span>
                  {activeTest.severity === 'critical' && (
                    <span className="text-rose-400 font-mono text-[10px] font-bold">● CRITICAL THRESHOLD</span>
                  )}
                </div>

                <div className={`p-4 rounded-xl font-mono text-sm sm:text-base border ${
                  activeTest.severity === 'critical'
                    ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                    : 'bg-slate-950/80 border-slate-800 text-emerald-300'
                }`}>
                  {activeTest.value}
                </div>
              </div>

              {/* Reference Range */}
              {activeTest.referenceRange && (
                <div className="text-xs text-slate-400 bg-slate-950/40 border border-slate-800/60 p-3 rounded-lg">
                  <span className="font-semibold text-slate-300">Reference Interval / Normal Standard: </span>
                  <span className="font-mono text-slate-300">{activeTest.referenceRange}</span>
                </div>
              )}

              {/* Clinical Interpretation */}
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Clinical & Diagnostic Interpretation:</span>
                </div>
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-100 leading-relaxed">
                  {activeTest.clinicalInterpretation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>Ordered {orderedIds.length} of {tests.length} investigations.</span>
          {orderedIds.length < tests.length && (
            <button
              onClick={handleOrderAllHighYield}
              className="cursor-pointer text-cyan-400 hover:text-cyan-300 font-semibold underline"
            >
              Order Full Diagnostic Workup
            </button>
          )}
        </div>

        <button
          onClick={handleProceed}
          disabled={orderedIds.length === 0}
          className={`cursor-pointer px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-sm ${
            orderedIds.length > 0
              ? 'bg-emerald-400 hover:bg-emerald-300 text-slate-950'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Organize Clues on Evidence Board →
        </button>
      </div>
    </div>
  );
};
