import React, { useState } from 'react';
import { ClinicalCase, StagingSite } from '../../../types/case';
import { CaseSessionState } from '../../../types/player';
import { DataIntegrityBadge } from '../../common/DataIntegrityBadge';
import { Layers, CheckCircle2, AlertTriangle, Info, MapPin } from 'lucide-react';

interface Props {
  clinicalCase: ClinicalCase;
  session: CaseSessionState;
  onUpdateSession: (updates: Partial<CaseSessionState>) => void;
  onCompleteStage: (scoreEarned: number, feedback: string[]) => void;
}

export const Stage9StagingMap: React.FC<Props> = ({
  clinicalCase,
  session,
  onCompleteStage,
}) => {
  const staging = clinicalCase.stages.staging;
  const [selectedSiteId, setSelectedSiteId] = useState<string>(staging.stagingSites[0].id);

  const activeSite = staging.stagingSites.find(s => s.id === selectedSiteId) || staging.stagingSites[0];

  const handleProceed = () => {
    onCompleteStage(25, [
      'Comprehensive anatomical staging review! You mapped multi-station nodal disease above and below the diaphragm (Stage III distribution) and evaluated hepatic/splenic involvement.'
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
              <span>STAGE 09</span>
              <span>·</span>
              <span>ANATOMICAL STAGING MAP</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Disease Extent & Staging</h2>
          </div>
          <DataIntegrityBadge label="VERIFIED PATIENT DATA" />
        </div>

        <p className="text-xs sm:text-sm text-slate-300 pt-6 leading-relaxed">
          Explore documented nodal stations and extranodal organ involvement across supra- and infradiaphragmatic anatomical compartments.
        </p>
      </div>

      {/* Interactive Staging Canvas: Left Sites List + Right Anatomical Staging Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sites List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Documented Anatomical Regions:
          </div>

          {staging.stagingSites.map((site: StagingSite) => {
            const isSelected = selectedSiteId === site.id;

            return (
              <button
                key={site.id}
                onClick={() => setSelectedSiteId(site.id)}
                className={`cursor-pointer w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-400 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className={`w-4 h-4 shrink-0 ${
                    site.isInvolved ? 'text-rose-400' : 'text-slate-500'
                  }`} />
                  <div>
                    <div className="text-xs font-bold text-slate-200">{site.region}</div>
                    <div className="text-[10px] text-slate-400">
                      {site.isExtranodal ? 'Extranodal Organ' : 'Nodal Station'} · {site.imagingSource}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono font-semibold">
                  {site.isInvolved ? (
                    <span className="text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                      INVOLVED
                    </span>
                  ) : (
                    <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      NOT INVOLVED
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Anatomical Site Details */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="text-[10px] font-mono uppercase text-emerald-400">
                {activeSite.isExtranodal ? 'EXTRANODAL ORGAN' : 'LYMPH NODE STATION'}
              </div>
              <h3 className="text-lg font-bold text-white mt-0.5">{activeSite.region}</h3>
              <div className="text-xs text-slate-400 mt-1">Location: {activeSite.anatomicalLocation}</div>
            </div>
            <DataIntegrityBadge label={activeSite.dataLabel} />
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Documented Clinical Imaging Finding:
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono">
                {activeSite.description}
              </div>
            </div>

            {/* Staging Framework Guidance */}
            <div>
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Ann Arbor / Lugano Staging Framework:</span>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-100 leading-relaxed">
                {staging.educationalGuidance}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Anatomical disease extent mapped. Proceed to acute management simulation.
        </div>
        <button
          onClick={handleProceed}
          className="cursor-pointer px-6 py-2.5 text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-xl transition-all shadow-sm"
        >
          Enter Management Simulation →
        </button>
      </div>
    </div>
  );
};
