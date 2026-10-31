import React, { useState } from 'react';
import { ClinicalCase, HistologyAnnotation, IHCMarker } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Microscope, Info, CheckCircle2, AlertTriangle, Eye, Layers } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage7PathologyLab: React.FC<Props> = ({
  clinicalCase,
  session,
  onUpdateSession,
  onCompleteStage,
}) => {
  const pathologyData = clinicalCase.stages.pathology;
  const inspectedIds = session.inspectedHistologyHotspots || [];
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string>(pathologyData.annotations[0].id);
  const [activeTab, setActiveTab] = useState<'microscopy' | 'ihc'>('microscopy');

  const handleSelectHotspot = (anno: HistologyAnnotation) => {
    setSelectedAnnotationId(anno.id);
    if (!inspectedIds.includes(anno.id)) {
      onUpdateSession({ inspectedHistologyHotspots: [...inspectedIds, anno.id] });
    }
  };

  const handleProceed = () => {
    let score = inspectedIds.length * 10;
    const feedback: string[] = [];

    if (inspectedIds.length === pathologyData.annotations.length) {
      score += 20;
      feedback.push('Thorough microscopic analysis! You inspected the diagnostic Reed-Sternberg cell, mixed reactive infiltrate, CD3+ rosetting lymphocytes, and focal necrosis.');
    } else {
      feedback.push(`You explored ${inspectedIds.length} of ${pathologyData.annotations.length} key histological landmarks.`);
    }

    onCompleteStage(score, feedback);
  };

  const activeAnnotation = pathologyData.annotations.find(a => a.id === selectedAnnotationId) || pathologyData.annotations[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 07</span>
              <span>·</span>
              <span>HISTOPATHOLOGY & IMMUNOHISTOCHEMISTRY</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Diagnostic Pathology Laboratory</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <span className="font-mono text-emerald-400 font-bold block mb-1">GROSS SPECIMEN:</span>
            {pathologyData.grossDescription}
          </div>
          <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
            <span className="font-mono text-cyan-400 font-bold block mb-1">MICROSCOPIC DESCRIPTION:</span>
            {pathologyData.microscopicDescription}
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('microscopy')}
          className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'microscopy'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>High-Power Micrograph & Hotspots</span>
        </button>

        <button
          onClick={() => setActiveTab('ihc')}
          className={`cursor-pointer px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
            activeTab === 'ihc'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Immunohistochemistry (IHC) Panel</span>
        </button>
      </div>

      {/* View 1: Interactive Microscopy Visualizer */}
      {activeTab === 'microscopy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Micrograph Canvas with Hotspots */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-2xl">
            <div className="relative aspect-[4/3] w-full">
              <img
                src={pathologyData.imagePath}
                alt="Histopathology micrograph of Classical Hodgkin Lymphoma showing Reed-Sternberg cell"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Hotspot buttons positioned across the cell features */}
              {pathologyData.annotations.map((anno) => {
                const isSelected = selectedAnnotationId === anno.id;
                const isInspected = inspectedIds.includes(anno.id);

                return (
                  <button
                    key={anno.id}
                    onClick={() => handleSelectHotspot(anno)}
                    style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
                    className={`cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all shadow-lg ${
                      isSelected
                        ? 'bg-emerald-400 border-white text-slate-950 scale-125 z-20 ring-4 ring-emerald-500/40'
                        : isInspected
                        ? 'bg-slate-900/90 border-emerald-400 text-emerald-400 z-10'
                        : 'bg-slate-950/90 border-cyan-400 text-cyan-300 animate-bounce z-10'
                    }`}
                    title={anno.title}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1 rounded text-[11px] font-mono text-slate-300">
                40× Magnification · H&E Staining
              </div>
            </div>
          </div>

          {/* Hotspot Annotation Details Panel */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">FEATURE INSPECTOR</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{activeAnnotation.title}</h3>
              </div>
              <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Morphological Feature:
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {activeAnnotation.description}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                  Documented Biopsy Finding:
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 leading-relaxed font-mono">
                  {activeAnnotation.verifiedPatientFact}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Clinical Pathophysiology Pearl:</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-100 leading-relaxed">
                  {activeAnnotation.educationalPearl}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Immunohistochemistry (IHC) Panel */}
      {activeTab === 'ihc' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Diagnostic Immunohistochemical Profile</h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparing patient's immunophenotype with typical reference patterns in classical Hodgkin lymphoma.
              </p>
            </div>
            <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
          </div>

          <div className="space-y-3">
            {pathologyData.ihcPanel.map((ihc: IHCMarker) => {
              const isCD15 = ihc.marker.includes('CD15');

              return (
                <div
                  key={ihc.marker}
                  className={`p-4 rounded-xl border ${
                    isCD15
                      ? 'bg-amber-950/20 border-amber-500/40'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-white">{ihc.marker}</span>
                      {isCD15 && (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-500/30">
                          KEY DIAGNOSTIC TEACHING POINT
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono font-semibold text-emerald-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                      Patient Result: {ihc.patientResult}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 mb-2">
                    <span className="text-slate-500">Typical Textbook Finding: </span>
                    <span className="text-slate-300">{ihc.typicalFinding}</span>
                  </div>

                  <div className="text-xs text-cyan-200 bg-cyan-950/20 border border-cyan-500/20 p-2.5 rounded-lg leading-relaxed">
                    <span className="font-semibold text-cyan-300">Diagnostic Value: </span>
                    {ihc.interpretation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Explored {inspectedIds.length} of {pathologyData.annotations.length} histology landmarks and reviewed full IHC panel.
        </div>
        <button
          onClick={handleProceed}
          className="cursor-pointer px-6 py-2.5 text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl transition-all shadow-sm"
        >
          Submit Diagnostic Challenge →
        </button>
      </div>
    </div>
  );
};
