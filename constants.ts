import { Exam, Group, Language, Translation } from './types';

// Source: Official SSC 2026 Routine (Dinajpur Board PDF)
// Exam Start Time: 10:00 AM

export const EXAM_SCHEDULE: Exam[] = [
  {
    id: '101',
    subjectEn: 'Bangla 1st Paper',
    subjectBn: 'বাংলা (আবশ্যিক)-১ম পত্র',
    date: '2026-04-21', // Tuesday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '101'
  },
  {
    id: '102',
    subjectEn: 'Bangla 2nd Paper',
    subjectBn: 'বাংলা (আবশ্যিক)-২য় পত্র',
    date: '2026-04-23', // Thursday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '102'
  },
  {
    id: '107',
    subjectEn: 'English 1st Paper',
    subjectBn: 'ইংরেজি (আবশ্যিক)-১ম পত্র',
    date: '2026-04-26', // Sunday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '107'
  },
  {
    id: '108',
    subjectEn: 'English 2nd Paper',
    subjectBn: 'ইংরেজি (আবশ্যিক)-২য় পত্র',
    date: '2026-04-28', // Tuesday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '108'
  },
  {
    id: '154',
    subjectEn: 'ICT',
    subjectBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    date: '2026-04-30', // Thursday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '154'
  },
  {
    id: '109',
    subjectEn: 'Mathematics',
    subjectBn: 'গণিত (আবশ্যিক)',
    date: '2026-05-03', // Sunday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '109'
  },
  {
    id: '150',
    subjectEn: 'Bangladesh & Global Studies',
    subjectBn: 'বাংলাদেশ ও বিশ্ব পরিচয়',
    date: '2026-05-05', // Tuesday
    time: '10:00 AM',
    groups: [Group.SCIENCE], // Compulsory for Science
    code: '150'
  },
  {
    id: '111',
    subjectEn: 'Religion & Moral Education',
    subjectBn: 'ধর্ম ও নৈতিক শিক্ষা',
    date: '2026-05-07', // Thursday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS],
    code: '111-114'
  },
  {
    id: '136',
    subjectEn: 'Physics (Theory)',
    subjectBn: 'পদার্থবিজ্ঞান (তত্ত্বীয়)',
    date: '2026-05-10', // Sunday
    time: '10:00 AM',
    groups: [Group.SCIENCE],
    code: '136'
  },
  {
    id: '153',
    subjectEn: 'History of Bangladesh & World Civilization',
    subjectBn: 'বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা',
    date: '2026-05-10', // Sunday
    time: '10:00 AM',
    groups: [Group.ARTS],
    code: '153'
  },
  {
    id: '152',
    subjectEn: 'Finance & Banking',
    subjectBn: 'ফিন্যান্স ও ব্যাংকিং',
    date: '2026-05-10', // Sunday
    time: '10:00 AM',
    groups: [Group.COMMERCE],
    code: '152'
  },
  {
    id: '110',
    subjectEn: 'Geography & Environment',
    subjectBn: 'ভূগোল ও পরিবেশ',
    date: '2026-05-11', // Monday
    time: '10:00 AM',
    groups: [Group.ARTS],
    code: '110'
  },
  {
    id: '134',
    subjectEn: 'Agri / Home Sci / Music / Arabic / Sports / Arts',
    subjectBn: 'গার্হস্থ্য / কৃষি / সঙ্গীত / আরবি / পালি / শারীরিক শিক্ষা / চারু ও কারুকলা',
    date: '2026-05-12', // Tuesday
    time: '10:00 AM',
    groups: [Group.SCIENCE, Group.COMMERCE, Group.ARTS], // Elective/4th Subjects
    code: '134/151+'
  },
  {
    id: '146',
    subjectEn: 'Accounting',
    subjectBn: 'হিসাব বিজ্ঞান',
    date: '2026-05-13', // Wednesday
    time: '10:00 AM',
    groups: [Group.COMMERCE],
    code: '146'
  },
  {
    id: '137',
    subjectEn: 'Chemistry (Theory)',
    subjectBn: 'রসায়ন (তত্ত্বীয়)',
    date: '2026-05-14', // Thursday
    time: '10:00 AM',
    groups: [Group.SCIENCE],
    code: '137'
  },
  {
    id: '140',
    subjectEn: 'Civics & Citizenship',
    subjectBn: 'পৌরনীতি ও নাগরিকতা',
    date: '2026-05-14', // Thursday
    time: '10:00 AM',
    groups: [Group.ARTS],
    code: '140'
  },
  {
    id: '143',
    subjectEn: 'Business Entrepreneurship',
    subjectBn: 'ব্যবসায় উদ্যোগ',
    date: '2026-05-14', // Thursday
    time: '10:00 AM',
    groups: [Group.COMMERCE],
    code: '143'
  },
  {
    id: '126',
    subjectEn: 'Higher Math (Theory)',
    subjectBn: 'উচ্চতর গণিত (তত্ত্বীয়)',
    date: '2026-05-17', // Sunday
    time: '10:00 AM',
    groups: [Group.SCIENCE],
    code: '126'
  },
  {
    id: '127',
    subjectEn: 'General Science',
    subjectBn: 'বিজ্ঞান',
    date: '2026-05-17', // Sunday
    time: '10:00 AM',
    groups: [Group.ARTS, Group.COMMERCE],
    code: '127'
  },
  {
    id: '138',
    subjectEn: 'Biology (Theory)',
    subjectBn: 'জীববিজ্ঞান (তত্ত্বীয়)',
    date: '2026-05-20', // Wednesday
    time: '10:00 AM',
    groups: [Group.SCIENCE],
    code: '138'
  },
  {
    id: '141',
    subjectEn: 'Economics',
    subjectBn: 'অর্থনীতি',
    date: '2026-05-20', // Wednesday
    time: '10:00 AM',
    groups: [Group.ARTS],
    code: '141'
  }
];

export const PRACTICAL_INFO_EN = `Practical exams will be held from Wednesday, May 27, 2026, to Tuesday, June 2, 2026. Exams start at 10:00 AM at respective centers. You must bring your admit card and registration card. Music practical students must report by 9:30 AM.`;
export const PRACTICAL_INFO_BN = `ব্যবহারিক পরীক্ষা ২৭/০৫/২০২৬ বুধবার হতে ০২/০৬/২০২৬ মঙ্গলবার পর্যন্ত প্রতিদিন সকাল ১০টা হতে স্ব-স্ব কেন্দ্রে অনুষ্ঠিত হবে। সঙ্গীত বিষয়ের ব্যবহারিক পরীক্ষার জন্য সকাল ৯:৩০ মিনিটের মধ্যে উপস্থিত হতে হবে।`;

export const INSTRUCTIONS_EN = [
  "Must enter the exam hall 30 minutes before the start.",
  "MCQ exam is held first, followed by CQ (Creative) with no break in between.",
  "Collect Admit Card from your school head at least 3 days prior.",
  "Fill OMR circles carefully with a black ballpoint pen.",
  "Mobile phones are strictly prohibited (except non-programmable calculators).",
  "You must pass separately in Theory, MCQ, and Practical parts."
];

export const INSTRUCTIONS_BN = [
  "পরীক্ষা শুরুর ৩০ মিনিট পূর্বে অবশ্যই পরীক্ষাকক্ষে আসন গ্রহণ করতে হবে।",
  "প্রথমে বহুনির্বাচনী ও পরে সৃজনশীল/রচনামূলক পরীক্ষা হবে; মাঝখানে কোনো বিরতি থাকবে না।",
  "পরীক্ষা শুরুর অন্তত ৩ দিন পূর্বে প্রতিষ্ঠান প্রধানের নিকট হতে প্রবেশপত্র সংগ্রহ করতে হবে।",
  "কালো বলপয়েন্ট কলম দিয়ে OMR ফরমের বৃত্ত ভরাট করতে হবে।",
  "মোবাইল ফোন আনা সম্পূর্ণ নিষেধ (নন-প্রোগ্রামেবল ক্যালকুলেটর ব্যতীত)।",
  "সৃজনশীল, বহুনির্বাচনী ও ব্যবহারিক অংশে পৃথকভাবে পাস করতে হবে।"
];

export const TRANSLATIONS: Record<Language, Translation> = {
  [Language.EN]: {
    title: "SSC 2026 Companion",
    subtitle: "All Education Boards",
    days: "Days",
    day: "Day",
    hours: "Hours",
    minutes: "Mins",
    seconds: "Secs",
    upcoming: "Upcoming Exams",
    completed: "Completed",
    nextExam: "Next Exam",
    startsIn: "Exam Starts In",
    practicalInfo: "Practical Exam Info",
    instructions: "Special Instructions",
    groupScience: "Science",
    groupCommerce: "Commerce",
    groupArts: "Arts",
    searchPlaceholder: "Search exams...",
    examCode: "Code",
    settings: "Settings",
    allGroups: "All Groups",
    routineTitle: "Examination Routine",
    seasonProgress: "Season Progress",
    noExam: "No pending exams found for this group.",
    goodLuck: "Good Luck!",
    gapPrep: "Gap",
    noGap: "No Gap"
  },
  [Language.BN]: {
    title: "এসএসসি ২০২৬ সহায়ক",
    subtitle: "সকল শিক্ষা বোর্ড",
    days: "দিন",
    day: "দিন",
    hours: "ঘণ্টা",
    minutes: "মিনিট",
    seconds: "সেকেন্ড",
    upcoming: "আসন্ন পরীক্ষাসমূহ",
    completed: "সম্পন্ন",
    nextExam: "পরবর্তী পরীক্ষা",
    startsIn: "পরীক্ষা শুরু হতে বাকি",
    practicalInfo: "ব্যাবহারিক তথ্য",
    instructions: "বিশেষ নির্দেশাবলী",
    groupScience: "বিজ্ঞান",
    groupCommerce: "ব্যবসায়",
    groupArts: "মানবিক",
    searchPlaceholder: "পরীক্ষা খুঁজুন...",
    examCode: "কোড",
    settings: "সেটিংস",
    allGroups: "সকল বিভাগ",
    routineTitle: "পরীক্ষার রুটিন",
    seasonProgress: "পরীক্ষা অগ্রগতি",
    noExam: "এই গ্রুপের জন্য আর কোন পরীক্ষা নেই।",
    goodLuck: "শুভ কামনা!",
    gapPrep: "ছুটি",
    noGap: "ছুটি নেই"
  }
};