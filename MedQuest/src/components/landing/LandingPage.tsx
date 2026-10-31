import React from 'react';
import { ArrowRight, BookOpen, Stethoscope, Microscope, BrainCircuit, Activity, ShieldAlert, Sparkles, Layers, Award } from 'lucide-react';
import { CASE_001 } from '../../data/case001';
import { SPECIALTY_CATEGORIES } from '../../data/casesLibrary';

interface Props {
  onStartCase: (caseId: string) => void;
  onExploreLibrary: () => void;
  onOpenDashboard: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStartCase, onExploreLibrary, onOpenDashboard }) => {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE CLINICAL REASONING SIMULATION</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Medicine is not about memorizing answers.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                It's about knowing how to find them.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Step into real-world clinical scenarios. Investigate. Analyze. Make decisions. Learn from every clue in an authentic 12-stage medical case simulation.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onStartCase(CASE_001.id)}
                className="cursor-pointer px-6 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2.5 group"
              >
                <span>START YOUR INVESTIGATION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreLibrary}
                className="cursor-pointer px-6 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>EXPLORE CASE LIBRARY</span>
              </button>
            </div>

            {/* Quick stats / trust strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 text-xs text-slate-400">
              <div>
                <div className="text-white font-mono text-base font-bold">12 Stages</div>
                <div className="text-slate-400">Structured Clinical Path</div>
              </div>
              <div>
                <div className="text-white font-mono text-base font-bold">100% Verified</div>
                <div className="text-slate-400">Authentic Case Records</div>
              </div>
              <div>
                <div className="text-white font-mono text-base font-bold">WHO & ESMO</div>
                <div className="text-slate-400">Guideline Referenced</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/60 aspect-[16/10] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px]">
              <img
                src="/src/assets/images/hero_medquest_simulation_1793467497176.jpg"
                alt="MedQuest clinical reasoning simulation interface showing medical scan analysis"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-emerald-400 font-semibold">FEATURED CASE 001</span>
                  <span className="text-slate-400">Hematology / Oncology</span>
                </div>
                <div className="text-white font-semibold text-sm">The Hidden Clue</div>
                <div className="text-slate-400 text-xs mt-0.5 line-clamp-1">
                  28-year-old male with generalized adenopathy and severe cytopenias
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Spotlight Section */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">Available For Play</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Case Investigation</h2>
          </div>
          <button
            onClick={onExploreLibrary}
            className="cursor-pointer text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>Browse All 11 Specialties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 aspect-[16/10]">
            <img
              src="/src/assets/images/case_cover_lymphoma_1793467527115.jpg"
              alt="Hematology and lymphoma clinical study illustration"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[11px] font-mono font-medium text-emerald-400 px-2.5 py-1 rounded">
              CASE 001 · READY
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold">Hematology / Oncology</span>
              <span>·</span>
              <span>Difficulty: Intermediate</span>
              <span>·</span>
              <span>Est. 25 Minutes</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {CASE_001.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {CASE_001.subtitle}. A young adult presents with widespread enlarged lymph nodes. What appears to be an indolent presentation soon reveals critical cytopenias and high-grade fevers. Can you interpret the histopathology and guide emergency stabilization?
            </p>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Key Learning Objectives:</div>
              <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
                {CASE_001.learningObjectives.slice(0, 3).map((obj, i) => (
                  <li key={i} className="text-slate-300">{obj}</li>
                ))}
              </ul>
            </div>

            <div className="pt-3 flex items-center gap-4">
              <button
                onClick={() => onStartCase(CASE_001.id)}
                className="cursor-pointer px-5 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>ENTER CLINICAL ENCOUNTER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenDashboard}
                className="cursor-pointer px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700/60 transition-colors"
              >
                <span>View Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 12-Stage Clinical Journey */}
      <section className="py-16 bg-[#070b13] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">How MedQuest Works</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Can You Think Like A Doctor?
            </h2>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              Medical reasoning is not a multiple-choice memory test. Follow an authentic 12-stage patient diagnostic and management journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Patient Encounter',
                desc: 'Take an active clinical history with targeted questions, identifying red flags and chief symptoms.',
                icon: Stethoscope
              },
              {
                step: '02',
                title: 'Physical Examination',
                desc: 'Examine organ systems and lymph node chains; differentiate documented findings from normal assumptions.',
                icon: Activity
              },
              {
                step: '03',
                title: 'Problem Representation',
                desc: 'Formulate a crisp 1-sentence syndromic representation that synthesizes complex findings.',
                icon: BrainCircuit
              },
              {
                step: '04',
                title: 'Differential Diagnosis',
                desc: 'Select and rank competing diagnoses with explicit supporting evidence and findings against.',
                icon: Layers
              },
              {
                step: '05',
                title: 'Investigation Lab',
                desc: 'Order CBC, chemistry, inflammatory markers, and imaging; interpret critical laboratory thresholds.',
                icon: Microscope
              },
              {
                step: '06',
                title: 'The Evidence Board',
                desc: 'Pin and organize clues into supporting vectors, alternative possibilities, and unresolved questions.',
                icon: BrainCircuit
              },
              {
                step: '07',
                title: 'Pathology Lab',
                desc: 'Explore high-power lymph node micrographs, identify Reed-Sternberg cells, and interpret IHC panels.',
                icon: Microscope
              },
              {
                step: '08',
                title: 'Diagnostic Challenge',
                desc: 'Commit to the definitive diagnosis, histologic subtype, and diagnostic justification.',
                icon: Award
              },
              {
                step: '09',
                title: 'Staging & Disease Extent',
                desc: 'Map nodal stations on an interactive anatomical staging canvas using Ann Arbor / Lugano criteria.',
                icon: Layers
              },
              {
                step: '10',
                title: 'Management Simulation',
                desc: 'Triage emergency stabilization (blood transfusion, sepsis protocol) vs definitive oncology therapy.',
                icon: ShieldAlert
              },
              {
                step: '11',
                title: 'Clinical Course & Trends',
                desc: 'Review serial laboratory trajectories and understand acute decompensation mechanisms.',
                icon: Activity
              },
              {
                step: '12',
                title: 'Final Debrief & Pearls',
                desc: 'Receive comprehensive educational feedback, scoring analysis, missed clues, and peer-reviewed references.',
                icon: BookOpen
              }
            ].map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-emerald-400">{st.step}</span>
                      <Icon className="w-4 h-4 text-slate-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{st.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialties Overview */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">Curriculum Scope</div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Specialties & Clinical Disciplines</h2>
          </div>
          <button
            onClick={onExploreLibrary}
            className="cursor-pointer text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            View All Cases
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {SPECIALTY_CATEGORIES.filter(s => s !== 'All Specialties').map((spec) => (
            <button
              key={spec}
              onClick={onExploreLibrary}
              className="cursor-pointer px-4 py-2 text-xs font-medium bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-lg transition-colors"
            >
              {spec}
            </button>
          ))}
        </div>
      </section>

      {/* Medical Rigor Callout */}
      <section className="py-16 bg-gradient-to-b from-[#090d16] to-[#060910] border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            <span>CLINICAL EVIDENCE STANDARD</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white text-balance">
            Zero Guesswork. Every Finding Strictly Documented.
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Unlike superficial medical quiz games, MEDQUEST tags all clinical data explicitly: Verified Patient Data, Clinical Suspicion Under Investigation, and General Educational Information. Undocumented parameters are explicitly declared—never fabricated.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => onStartCase(CASE_001.id)}
              className="cursor-pointer px-8 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 group"
            >
              <span>BEGIN CASE 001: THE HIDDEN CLUE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
