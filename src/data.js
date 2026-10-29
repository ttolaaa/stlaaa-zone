export const links = {
  github: 'https://github.com/ttolaaa',
  linkedin: 'https://www.linkedin.com/in/som-tola/',
  medium: 'https://medium.com/@somtola',
  youtube: 'https://www.youtube.com/@thisistolaaa',
};

export const profile = {
  name: 'Tola',
  role: 'Data Center Technician',
  company: 'Microsoft',
  location: 'Tokyo, Japan',
  since: 'May 2024',
};

export const journey = [
  { dates: '2020 – 2024', title: 'System Developer → product lead', detail: 'Customer-facing apps, stakeholders, delivery' },
  { dates: '2024 – Now', title: 'Microsoft Japan · deployment lead', detail: 'Deploy, maintain, and retire datacenter hardware', current: true },
  { dates: 'Next', title: 'Program management', detail: 'Delivering impact at a larger scale', next: true },
];

export const infrastructureWork = [
  {
    id: 'new-capacity',
    stage: 'DEPLOY',
    title: 'New datacenter capacity',
    short: 'Racks, servers, and network gear: installed, tested, handed over.',
    highlight: { value: '30 days', label: 'early site handover' },
    role: 'Led a new capacity build',
  },
  {
    id: 'ai-gpu',
    stage: 'DEPLOY · AI',
    title: 'AI GPU deployments',
    short: 'Racks of GPU servers that train and run AI.',
    highlight: { value: '27 days', label: 'early AMD MI300X delivery' },
    role: 'Led AMD MI300X & NVIDIA H200',
  },
  {
    id: 'breakfix',
    stage: 'MAINTAIN',
    title: 'Breakfix maintenance',
    short: 'Finding faults and fixing servers and network devices fast.',
    highlight: { value: 'L1–L3', label: 'server & network troubleshooting' },
    role: 'Breakfix Level III validated',
  },
  {
    id: 'decommission',
    stage: 'RETIRE',
    title: 'End-of-life decommission',
    short: 'Retiring old racks, servers, and network devices safely.',
    highlight: { value: 'Zero', label: 'security incidents' },
    role: 'Racks · servers · network · HSM',
  },
];

export const career = [
  {
    title: 'Data Center Technician',
    company: 'Microsoft',
    dates: 'May 2024 - Present',
    location: 'Tokyo, Japan · On-site',
    current: true,
    summary: 'Deployment lead for large infrastructure programs: coordinating engineering, logistics, security, and operations teams while managing risks, schedules, and customer commitments.',
    achievements: [
      "Leading APAC's first AI PoP deployment, establishing standards and practices for future regional expansion.",
      'Led a large AMD MI300X GPU program and co-led NVIDIA H200 deployments, including cable-mapping automation.',
      'Delivered Azure rack, network device, and HSM decommissioning with zero security incidents and full SLA compliance.',
      'Mentor new technicians and deployment leads, and serve as a technical escalation point during critical deployments.',
    ],
    skills: ['Deployment leadership', 'Infrastructure lifecycle', 'Risk & schedule management', 'Automation', 'Mentoring'],
  },
  {
    title: 'System Engineer',
    company: '鏑木教育コンサルティング',
    dates: 'Dec 2020 - May 2024',
    location: 'Tokyo, Japan · Hybrid',
    current: false,
    summary: 'Software engineering and product leadership: designing and delivering a customer-facing online education platform.',
    achievements: [
      'Translated business requirements into technical solutions with stakeholders, product owners, and development teams.',
      'Improved organic traffic by 15%, reduced API response times by 20%, and improved application load times by 30%.',
      'Mentored and onboarded 3+ developers and designers, supporting new technologies and development practices.',
    ],
    skills: ['Software engineering', 'Product leadership', 'Stakeholder management', 'Project delivery'],
  },
];

export const certifications = [
  { name: 'ITIL® 4 Foundation', issuer: 'PeopleCert', date: 'Jul 2026', note: 'IT Service Management · Expires Jul 2029' },
  { name: 'Datacenter Operations Services Deployment Specialist', issuer: 'Microsoft', date: 'Apr 2026' },
  { name: 'CO+I Learning Validated DC Ops Breakfix III', issuer: 'Microsoft', date: 'Mar 2026' },
  { name: 'Lean Six Sigma Certifications', issuer: 'LinkedIn', date: 'Nov 2025' },
  { name: 'CO+I Learning Validated DC Ops Breakfix II', issuer: 'Microsoft', date: 'Sep 2025' },
  { name: 'CO+I Learning Validated DC Ops Breakfix I', issuer: 'Microsoft', date: 'Feb 2025' },
];

export const tools = [
  {
    id: 'vdodl',
    name: 'VDODL',
    eyebrow: 'THE VIDEO TOOL',
    subtitle: 'Good videos. Yours to keep.',
    description: 'From a link to your library. A simpler way to save the videos you have permission to download.',
    category: 'Tools',
    tags: ['Video downloads', 'Browser-first'],
    repo: 'https://github.com/ttolaaa/VDODL',
    image: '/images/vdodl.png',
    imageAlt: 'VDODL interface showing available video qualities',
    detail: 'Paste a public YouTube, TikTok, or Instagram video link, choose an available quality, and follow the download progress. Supports audio-only downloads and HD through 4K when the source provides it.',
    notes: 'Browser-first, not browser-only: a server resolves media and handles restricted downloads or merging. Only download content you own or have permission to save.',
    features: ['Quality selection with file sizes', 'Download progress and cancellation', 'Audio-only option', 'Docker deployment'],
  },
  {
    id: 'clipping',
    name: 'Clipping',
    eyebrow: 'THE CREATOR TOOL',
    subtitle: 'Long stories. Short-form magic.',
    description: 'Find the moments that matter. Turn long videos into captioned, vertical clips, right in the browser.',
    category: 'Tools',
    tags: ['AI-assisted', 'Video editing'],
    repo: 'https://github.com/ttolaaa/ClippingEditor',
    image: '/images/clipping.png',
    imageAlt: 'Clipping interface with ranked vertical clips and captions',
    detail: 'An in-browser editing workflow that finds promising moments, ranks clips, adds editable word-by-word captions, and reframes long videos into 9:16 reels.',
    notes: 'The default workflow processes video on your device with WebCodecs, Whisper, and WebAssembly. Optional cloud AI is a separate setting in the original app.',
    features: ['15, 30, and 60-second clips', 'Plain-English clipping rules', 'Editable synced captions', 'Vertical MP4 export'],
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    eyebrow: 'THE VOICE TOOL',
    subtitle: 'Your words, with a little life.',
    description: 'Give a story its voice. Expressive text-to-speech with natural delivery and room for your own voice.',
    category: 'Tools',
    tags: ['Text to speech', 'Creative tools'],
    repo: 'https://github.com/ttolaaa/text2voice_app',
    image: '/images/storyteller.png',
    imageAlt: 'Storyteller text-to-voice app with script and voice controls',
    detail: 'Write a script, shape the delivery with pauses, pitch, and emphasis, then play or download the audio. The full app includes natural on-device voices, browser voices, optional Azure voices, and consent-based personal voice creation.',
    notes: 'The small portfolio demo uses your browser speech engine only. It does not clone voices or offer the full app\'s audio export.',
    features: ['Expressive script controls', 'Speed, pitch, and pause settings', 'Natural and browser voice engines', 'Audio export in the full app'],
  },
];

export const experience = [
  {
    id: 'eiken',
    name: 'A little practice. A big step forward.',
    eyebrow: 'EIKEN VOCABULARY APP',
    subtitle: 'Helping young learners find their words.',
    category: 'Product design',
    tags: ['UX research', 'Flutter', 'Education'],
    image: '/images/eiken.png',
    imageAlt: 'Original Eiken mobile app screens for Japanese English learners',
    description: 'An English-learning companion for Japanese elementary students, built around quizzes, flashcards, and listening.',
    detail: 'Designed and developed a vocabulary learning experience aligned with Eiken proficiency levels. The original case study covers November 2020 to October 2023.',
    notes: 'My role spanned primary and secondary research, usability testing, heuristic analysis, low-to-high fidelity design, prototyping, and Flutter mobile development. A company collaboration with project management, teachers, and API development.',
    features: ['Level-aligned vocabulary', 'Quizzes and flashcards', 'Listening exercises', 'Research through mobile delivery'],
    source: 'https://github.com/ttolaaa/stlaaa-zone/blob/main/src/components/EikenCaseStudy.js',
  },
  {
    id: 'gli',
    name: 'Less booking friction. More learning.',
    eyebrow: 'GLI ONLINE CLASSROOM',
    subtitle: 'Bringing the classroom a little closer.',
    category: 'Web apps',
    tags: ['Web application', 'End-to-end', 'Education'],
    image: '/images/gli.png',
    imageAlt: 'Original GLI online classroom course and lesson reservation website',
    description: 'An online classroom experience where students can purchase courses and reserve lessons with teachers.',
    detail: 'An end-to-end web solution for students to discover courses and reserve lessons. The companion admin system helps teachers and staff manage those reservations.',
    notes: 'Created as a company collaboration during my System Engineer role, December 2020 to May 2024. The portfolio preserves the original project information without assuming the service is still current.',
    features: ['Online course purchasing', 'Student lesson reservations', 'Teacher and staff administration', 'Product design and frontend delivery'],
    source: 'https://github.com/ttolaaa/stlaaa-zone/blob/main/src/components/Project.js',
  },
];

export const archive = [
  { name: 'GlowTracker', type: 'Personal project', description: 'A daily companion combining skincare tracking, nutrition, and weight management.' },
  { name: 'Lesson reservation admin', type: 'Company collaboration', description: 'A user-friendly admin system for managing student and teacher lesson reservations.' },
  { name: 'Firebase data management', type: 'Company collaboration', description: 'Organizing and making essential data accessible for a small-enterprise application.' },
];

export const articles = [
  {
    category: 'DESIGN JOURNAL',
    title: 'My journey as a UI/UX designer',
    description: 'Where curiosity about people meets a background in computer science.',
    href: 'https://medium.com/prototypr/my-journey-as-ui-ux-designer-678779a1d709',
  },
  {
    category: 'LEARNING & TEACHING',
    title: 'Coding for kids',
    description: 'Finding the fun in helping the next generation build something of their own.',
    href: 'https://medium.com/@somtola/coding-for-kids-its-fun-being-kids-coding-instructor-88413aa714ff',
  },
  {
    category: 'COMMUNITY',
    title: 'A first-timer at GHC',
    description: 'Reflections on the Grace Hopper Celebration and a wider world of women in tech.',
    href: 'https://medium.com/@somtola/my-experience-at-ghc19-as-first-timer-f19fb1ab10d5',
  },
];
