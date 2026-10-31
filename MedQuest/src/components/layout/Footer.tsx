import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (view: 'landing' | 'dashboard' | 'library' | 'game' | 'admin' | 'achievements') => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#060910] border-t border-slate-800/80 text-slate-400 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm tracking-tight">
              <span className="text-emerald-400">MEDQUEST</span>
              <span className="text-slate-600">·</span>
              <span className="font-normal text-slate-400">Clinical Reasoning Platform</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Think. Investigate. Diagnose. An interactive, case-based clinical simulation platform where medical students experience authentic patient encounters and evidence-based diagnostic reasoning.
            </p>
            <div className="flex items-center gap-2 text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500/80" />
              <span>Anonymized clinical data · Educational simulation only</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-emerald-400 transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-emerald-400 transition-colors">
                  User Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('achievements')} className="hover:text-emerald-400 transition-colors">
                  Achievements & Badges
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('library')} className="hover:text-emerald-400 transition-colors">
                  Case Library (11 Specialties)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-emerald-400 transition-colors">
                  Case Studio & Schema Engine
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Medical Guidelines</h4>
            <p className="text-slate-400 leading-relaxed text-[11px] mb-2">
              Case data and reasoning pathways are verified against WHO, ESMO, ASH, and peer-reviewed clinical benchmarks.
            </p>
            <div className="text-[11px] text-slate-500">
              MEDQUEST is an educational tool, not a clinical diagnostic or prescription system.
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} MEDQUEST Medical Education. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified Patient Records (De-identified)</span>
            <span>·</span>
            <span>Evidence-Based Medicine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
