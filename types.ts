export enum Group {
  SCIENCE = 'science',
  COMMERCE = 'commerce',
  ARTS = 'arts'
}

export enum Language {
  EN = 'en',
  BN = 'bn'
}

export interface Exam {
  id: string;
  subjectEn: string;
  subjectBn: string;
  date: string; // ISO format YYYY-MM-DD
  time: string; // "10:00 AM"
  groups: Group[]; // Groups that take this exam. If empty/null, it's common for all.
  code: string;
  isPractical?: boolean;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

export interface Translation {
  title: string;
  subtitle: string;
  days: string;
  day: string; // Singular day
  hours: string;
  minutes: string;
  seconds: string;
  upcoming: string;
  completed: string;
  nextExam: string;
  startsIn: string; 
  practicalInfo: string;
  instructions: string;
  groupScience: string;
  groupCommerce: string;
  groupArts: string;
  searchPlaceholder: string;
  examCode: string;
  settings: string;
  allGroups: string;
  routineTitle: string;
  seasonProgress: string;
  noExam: string;
  goodLuck: string;
  gapPrep: string; // "Gap" suffix
  noGap: string;
}