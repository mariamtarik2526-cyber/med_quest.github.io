import React from 'react';
import { DataLabel } from '../../types/case';
import { CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface Props {
  label: DataLabel;
  className?: string;
}

export const DataIntegrityBadge: React.FC<Props> = ({ label, className = '' }) => {
  if (label === 'VERIFIED PATIENT DATA') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded ${className}`}>
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        VERIFIED PATIENT DATA
      </span>
    );
  }

  if (label === 'CLINICAL SUSPICION / UNDER INVESTIGATION') {
    return (
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded ${className}`}>
        <AlertTriangle className="w-3 h-3 text-amber-400" />
        CLINICAL SUSPICION / UNDER INVESTIGATION
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded ${className}`}>
      <BookOpen className="w-3 h-3 text-cyan-400" />
      GENERAL EDUCATIONAL INFORMATION
    </span>
  );
};
