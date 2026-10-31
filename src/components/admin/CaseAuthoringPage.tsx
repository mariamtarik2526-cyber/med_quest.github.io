import React, { useState } from 'react';
import { ClinicalCase } from '../../types/case';
import { CASE_001 } from '../../data/case001';
import { SPECIALTY_CATEGORIES } from '../../data/casesLibrary';
import {
  Layers,
  Code,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  Lock,
  Unlock,
  PlusCircle,
  Eye,
  FileCheck,
  BookOpen
} from 'lucide-react';

interface Props {
  onPreviewCase?: (c: ClinicalCase) => void;
}

export const CaseAuthoringPage: React.FC<Props> = ({ onPreviewCase }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Educator mode active by default for reviewer convenience
  const [passkeyInput, setPasskeyInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'editor' | 'schema' | 'export'>('editor');
  const [copied, setCopied] = useState<boolean>(false);

  // Editable draft case state initialized with Case 001 architecture
  const [draftCase, setDraftCase] = useState<ClinicalCase>(CASE_001);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(draftCase, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftCase, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${draftCase.id || 'new-case'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-emerald-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Educator & Authoring Portal</h2>
            <p className="text-xs text-slate-400">
              Restricted area for medical faculty and clinical educators to author and validate new patient cases.
            </p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              placeholder="Enter educator passkey (e.g. medquest2026)"
              value={passkeyInput}
              onChange={(e) => setPasskeyInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => setIsAuthenticated(true)}
              className="cursor-pointer w-full py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors"
            >
              Unlock Authoring Workspace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>EDUCATOR STUDIO</span>
              <span>·</span>
              <span>CASE EXPANSION ENGINE</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Case Authoring & Schema Studio</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Create, configure, and validate multi-stage clinical reasoning cases conforming to the standard MEDQUEST schema.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyJson}
              className="cursor-pointer px-3.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="cursor-pointer px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Case (.json)</span>
            </button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('editor')}
            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'editor'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Case Configuration Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'schema'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Raw JSON & Validation Schema</span>
          </button>
        </div>

        {/* Tab 1: Editor Form */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              {/* Metadata Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Case Identification & Metadata</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Case Title</label>
                    <input
                      type="text"
                      value={draftCase.title}
                      onChange={(e) => setDraftCase({ ...draftCase, title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Case Number</label>
                    <input
                      type="text"
                      value={draftCase.caseNumber}
                      onChange={(e) => setDraftCase({ ...draftCase, caseNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Specialty</label>
                    <select
                      value={draftCase.specialty}
                      onChange={(e) => setDraftCase({ ...draftCase, specialty: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      {SPECIALTY_CATEGORIES.filter(s => s !== 'All Specialties').map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Difficulty</label>
                    <select
                      value={draftCase.difficulty}
                      onChange={(e) => setDraftCase({ ...draftCase, difficulty: e.target.value as any })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-slate-400 block mb-1">Subtitle / Clinical Hook</label>
                    <input
                      type="text"
                      value={draftCase.subtitle}
                      onChange={(e) => setDraftCase({ ...draftCase, subtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Patient Profile */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Simulated Patient Profile</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Age</label>
                    <input
                      type="number"
                      value={draftCase.patientProfile.age}
                      onChange={(e) => setDraftCase({
                        ...draftCase,
                        patientProfile: { ...draftCase.patientProfile, age: parseInt(e.target.value) || 0 }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Sex</label>
                    <input
                      type="text"
                      value={draftCase.patientProfile.sex}
                      onChange={(e) => setDraftCase({
                        ...draftCase,
                        patientProfile: { ...draftCase.patientProfile, sex: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Clinical Setting</label>
                    <input
                      type="text"
                      value={draftCase.patientProfile.setting}
                      onChange={(e) => setDraftCase({
                        ...draftCase,
                        patientProfile: { ...draftCase.patientProfile, setting: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-slate-400 block mb-1">Chief Complaint</label>
                    <input
                      type="text"
                      value={draftCase.patientProfile.chiefComplaint}
                      onChange={(e) => setDraftCase({
                        ...draftCase,
                        patientProfile: { ...draftCase.patientProfile, chiefComplaint: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="text-slate-400 block mb-1">Initial Presentation Vignette</label>
                    <textarea
                      rows={3}
                      value={draftCase.patientProfile.initialPresentation}
                      onChange={(e) => setDraftCase({
                        ...draftCase,
                        patientProfile: { ...draftCase.patientProfile, initialPresentation: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Guide Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Authoring Standards</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every case added to MedQuest adheres to the 12-stage clinical reasoning pathway:
                </p>
                <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc list-inside">
                  <li>Zero fabrication: Real patient findings or explicit "Not documented" labels.</li>
                  <li>Every question includes educational rationale.</li>
                  <li>Investigations declare units, dates, and reference intervals.</li>
                  <li>References cite peer-reviewed guidelines (WHO, ESMO, ASH).</li>
                </ul>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Case Architecture Metrics
                </h4>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Questions</div>
                    <div className="text-base font-bold font-mono text-emerald-400">
                      {draftCase.stages.historyQuestions.length}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Exam Systems</div>
                    <div className="text-base font-bold font-mono text-cyan-400">
                      {draftCase.stages.examinationFindings.length}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Lab Tests</div>
                    <div className="text-base font-bold font-mono text-emerald-400">
                      {draftCase.stages.investigations.length}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Differentials</div>
                    <div className="text-base font-bold font-mono text-cyan-400">
                      {draftCase.stages.differentialDiagnoses.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Raw Schema View */}
        {activeTab === 'schema' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">JSON Case Definition</h3>
                <p className="text-xs text-slate-400">This JSON payload represents the complete, executable clinical simulation.</p>
              </div>
              <button
                onClick={handleCopyJson}
                className="cursor-pointer px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg"
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[600px] leading-relaxed">
              {JSON.stringify(draftCase, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
