import React from 'react';
import { ClinicalCase } from '../../../types/case';
import { CaseSessionState, PlayerProfile } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Award, BookOpen, CheckCircle2, AlertTriangle, ArrowRight, RotateCcw, ExternalLink, Sparkles, BrainCircuit, ShieldCheck } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  profile: PlayerProfile;
  onRestartCase: () => void;
  onExploreLibrary: () => void;
  onOpenDashboard: () => void;
}

export const Stage12Debrief: React.FC<Props> = ({
  clinicalCase,
  session,
  profile,
  onRestartCase,
  onExploreLibrary,
  onOpenDashboard,
}) => {
  // Aggregate all scores earned
  const totalScore = Object.values(session.stageScores || {}).reduce((acc, s) => acc + s.scoreEarned, 0);
  const maxPossibleScore = 350;
  const scorePercent = Math.min(100, Math.round((totalScore / maxPossibleScore) * 100));

  return (
    <div className="space-y-10">
      {/* Hero Banner / Score summary */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INVESTIGATION COMPLETED</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Clinical Reasoning Debrief & Portfolio
            </h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Case 001 · 28-year-old male with Classical Hodgkin Lymphoma (Mixed Cellularity Subtype)
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 text-center min-w-[180px]">
            <div className="text-xs text-slate-400 font-medium">Diagnostic Accuracy</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 tabular-nums mt-1">
              {scorePercent}%
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-0.5">{totalScore} Points Earned</div>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="mt-8 p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
              CONFIRMED HISTOPATHOLOGICAL DIAGNOSIS
            </div>
            <div className="text-2xl font-bold text-white">
              Classical Hodgkin Lymphoma — Mixed Cellularity Subtype
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              Diagnostic Reed-Sternberg cells with classic immunophenotype (CD30+, CD15-, CD20 focal+, CD3 background T-cells+, LCA-).
            </p>
          </div>
          <div className="flex justify-start md:justify-end">
            <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
          </div>
        </div>
      </div>

      {/* Badges Earned Strip */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Clinical Milestones & Badges</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            {profile.badges.filter(b => b.isUnlocked).length} of {profile.badges.length} Badges Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.badges.map(b => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border flex flex-col justify-between gap-3 ${
                b.isUnlocked
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg shrink-0 ${
                  b.isUnlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-600'
                }`}>
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-bold text-white">{b.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400">+{b.xpReward} XP</span>
                  </div>
                  <div className="text-[11px] text-slate-300 leading-snug">{b.description}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono">
                <span className={b.isUnlocked ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>
                  {b.isUnlocked ? 'Requirement Satisfied' : `${b.currentProgress} / ${b.targetProgress}`}
                </span>
                <span className="text-slate-400">{b.rarity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostic Clues & Misconceptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Key Diagnostic Clues */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Key Diagnostic Clues & Insights</span>
          </h3>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-white block mb-0.5">1. Bimodal Age Distribution:</strong>
              Young adults (aged 20–35) and older adults (&gt;55) have highest incidence of Hodgkin lymphoma.
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-white block mb-0.5">2. Reed-Sternberg Cytology:</strong>
              Large binucleated cells with mirror-image eosinophilic owl-eye nucleoli surrounded by reactive non-neoplastic lymphocytes and eosinophils.
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-white block mb-0.5">3. Multi-station CT Nodal Distribution:</strong>
              Bilateral cervical, axillary, mediastinal, and retroperitoneal nodal disease across the diaphragm.
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-white block mb-0.5">4. Critical Transfusion Thresholds:</strong>
              Hemoglobin 3.9 g/dL and Platelets 9 × 10³/µL represented emergency resuscitative priorities requiring irradiated blood products.
            </li>
          </ul>
        </div>

        {/* Common Misconceptions */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Diagnostic Pitfalls & Common Misconceptions</span>
          </h3>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-amber-300 block mb-0.5">Pitfall 1: Expecting CD15 to Always Be Positive</strong>
              CD15 is negative in approximately 15–20% of classical Hodgkin lymphoma cases. Negative CD15 never excludes the diagnosis when CD30 is diffuse positive and LCA is negative.
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-amber-300 block mb-0.5">Pitfall 2: Confusing Secondary HLH with Primary Bone Marrow Neoplasia</strong>
              Marrow showed erythroid hyperplasia rather than acute leukemia. Marked cytopenias, fevers &gt;39°C, splenomegaly, and hypertriglyceridemia represented hyperinflammatory cytokine storm.
            </li>
            <li className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl leading-relaxed">
              <strong className="text-amber-300 block mb-0.5">Pitfall 3: Initiating Chemotherapy Without Resuscitation</strong>
              Starting heavy cytotoxic chemotherapy in an unstable patient with severe cytopenias and potential sepsis carries high mortality; resuscitation must come first.
            </li>
          </ul>
        </div>
      </div>

      {/* Verified Peer-Reviewed Medical References */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Evidence-Based Medical Guidelines & References</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clinicalCase.stages.references.map((ref, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-white">{ref.title}</div>
              <div className="text-[11px] font-mono text-emerald-400">{ref.source}</div>
              <div className="text-[11px] text-slate-400 leading-relaxed">{ref.citation}</div>
              {ref.link && (
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 pt-1"
                >
                  <span>Guideline Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation & Next Steps */}
      <div className="p-8 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onRestartCase}
            className="cursor-pointer px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Case 001</span>
          </button>

          <button
            onClick={onOpenDashboard}
            className="cursor-pointer px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
          >
            <span>View Dashboard</span>
          </button>
        </div>

        <button
          onClick={onExploreLibrary}
          className="cursor-pointer px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-sm flex items-center gap-2"
        >
          <span>Explore Other Specialties in Library</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
