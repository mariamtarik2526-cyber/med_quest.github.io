/**
 * MEDQUEST - Case Library Registry
 * Contains active playable cases and curated future case placeholders.
 */

import { CASE_001 } from './case001';
import { ClinicalCase } from '../types/case';

export interface CaseCardMeta {
  id: string;
  caseNumber: string;
  title: string;
  subtitle: string;
  specialty: string;
  subspecialty: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  learningObjectivesSummary: string[];
  isAvailable: boolean;
  statusText: 'Available Now' | 'Under Editorial Peer Review' | 'Coming Soon';
  coverImage?: string;
}

export const SPECIALTY_CATEGORIES = [
  'All Specialties',
  'Hematology',
  'Oncology',
  'Internal Medicine',
  'Cardiology',
  'Neurology',
  'Infectious Diseases',
  'Gastroenterology',
  'Respiratory Medicine',
  'Endocrinology',
  'Pediatrics',
  'Surgery'
] as const;

export const CASE_LIBRARY_CATALOG: CaseCardMeta[] = [
  {
    id: CASE_001.id,
    caseNumber: CASE_001.caseNumber,
    title: CASE_001.title,
    subtitle: CASE_001.subtitle,
    specialty: 'Hematology',
    subspecialty: 'Hematologic Oncology',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    learningObjectivesSummary: [
      'Evaluate generalized lymphadenopathy in a 28-year-old male',
      'Examine Reed-Sternberg histopathology and atypical CD15- / CD30+ IHC',
      'Manage critical pancytopenia and suspected secondary HLH hyperinflammation'
    ],
    isAvailable: true,
    statusText: 'Available Now',
    coverImage: '/src/assets/images/case_cover_lymphoma_1793467527115.jpg'
  },
  {
    id: 'case-002',
    caseNumber: '002',
    title: 'The Silent Pressure',
    subtitle: 'Dyspnea, elevated jugular venous pressure, and paradoxical pulse in a post-surgical patient',
    specialty: 'Cardiology',
    subspecialty: 'Pericardial Disease & Critical Care',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    learningObjectivesSummary: [
      'Recognize clinical signs of cardiac tamponade and pulsus paradoxus',
      'Interpret urgent echocardiography and electrical alternans',
      'Prioritize emergent pericardiocentesis vs conservative monitoring'
    ],
    isAvailable: false,
    statusText: 'Under Editorial Peer Review'
  },
  {
    id: 'case-003',
    caseNumber: '003',
    title: 'Shadows in the Cortex',
    subtitle: 'Subacute cognitive decline, myoclonus, and periodic sharp wave complexes',
    specialty: 'Neurology',
    subspecialty: 'Neurodegenerative & Prion Disease',
    difficulty: 'Advanced',
    estimatedMinutes: 30,
    learningObjectivesSummary: [
      'Construct a differential for rapidly progressive dementia in midlife',
      'Interpret MRI DWI cortical ribboning and CSF real-time quaking (RT-QuIC)',
      'Navigate neuroethical counseling and supportive palliative planning'
    ],
    isAvailable: false,
    statusText: 'Coming Soon'
  },
  {
    id: 'case-004',
    caseNumber: '004',
    title: 'The Unexplained Jaundice',
    subtitle: 'Progressive painless jaundice, weight loss, and Courvoisier gallbladder sign',
    specialty: 'Gastroenterology',
    subspecialty: 'Hepatobiliary / Pancreatic Medicine',
    difficulty: 'Intermediate',
    estimatedMinutes: 25,
    learningObjectivesSummary: [
      'Differentiate intrahepatic vs extrahepatic obstructive cholestasis',
      'Analyze triphasic CT pancreas and endoscopic retrograde cholangiography (ERCP)',
      'Synthesize multidisciplinary resectability criteria'
    ],
    isAvailable: false,
    statusText: 'Coming Soon'
  },
  {
    id: 'case-005',
    caseNumber: '005',
    title: 'Fever of Unknown Origin',
    subtitle: 'Prolonged swinging pyrexia, splinter hemorrhages, and a new diastolic murmur',
    specialty: 'Infectious Diseases',
    subspecialty: 'Infective Endocarditis',
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    learningObjectivesSummary: [
      'Apply modified Duke criteria in culture-negative endocarditis suspicion',
      'Select transesophageal vs transthoracic echocardiography',
      'Formulate targeted bactericidal antimicrobial protocols'
    ],
    isAvailable: false,
    statusText: 'Coming Soon'
  },
  {
    id: 'case-006',
    caseNumber: '006',
    title: 'Pediatric Stridor & Drooling',
    subtitle: 'Acute airway obstruction, toxic appearance, and tripod positioning',
    specialty: 'Pediatrics',
    subspecialty: 'Pediatric Emergency Medicine',
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    learningObjectivesSummary: [
      'Distinguish croup from acute epiglottitis and bacterial tracheitis',
      'Manage difficult pediatric airway without triggering laryngospasm',
      'Initiate emergency airway stabilization in operating theater'
    ],
    isAvailable: false,
    statusText: 'Coming Soon'
  }
];

export const INITIAL_CASES_MAP: Record<string, ClinicalCase> = {
  [CASE_001.id]: CASE_001
};
