import type { Dict } from './es'

// English copy. Must match the keys in `es.ts` (enforced by the Dict type).
export const en: Dict = {
  meta: {
    title: 'Alan Mermolia — Creative Developer',
    description: 'Web developer and multimedia designer. Portfolio of development, design and animation work.',
  },
  intro: {
    skip: 'Skip',
  },
  nav: {
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    motion: 'Motion',
    contact: 'Contact',
    langLabel: 'Change language',
    menu: 'Menu',
    skipToContent: 'Skip to content',
  },
  hero: {
    role: 'Creative Developer',
    tagline: 'Web development with backend logic and a multimedia designer’s eye. Code and animation.',
    ctaProjects: 'See projects',
    ctaContact: 'Contact',
  },
  about: {
    title: 'About',
    paragraphs: [
      'I’m a developer with 4+ years building web applications and business solutions. I currently work as a Full Stack developer at Stefanini, and before that I spent three years at the agency Encender Comunicación, building for brands like Philip Morris, River Plate and Bodegas Callia.',
      'I studied Multimedia Design (ISEC) before moving into code, so I think about interfaces and motion as much as architecture. Lately I also integrate generative AI: agents, RAG and structured outputs.',
    ],
    facts: [
      { label: 'Experience', value: '4+ years' },
      { label: 'Based in', value: 'Buenos Aires, AR' },
      { label: 'Languages', value: 'Spanish (native) · English B2' },
    ],
  },
  skills: {
    title: 'Skills',
    dev: 'Development',
    design: 'Design & motion',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Data & infrastructure',
      ai: 'AI',
      motion: 'Animation & video',
      visual: 'Visual design',
    },
  },
  projects: {
    title: 'Projects',
    code: 'Code',
    site: 'Website',
    newTab: 'opens in a new tab',
    wip: 'In progress',
    items: {
      callia: 'Corporate website with a CMS and a dynamic product catalog, built at the agency Encender Comunicación.',
      river: 'Press accreditation platform: media outlets request access to the club’s events by sport, and the club manages approvals. Built at Encender Comunicación.',
      cvAnalyzer: 'Scores a PDF résumé against a job description using AI. FastAPI backend and a framework-free JavaScript frontend.',
      legalRag: 'Answers questions about PDF contracts, citing source and page. Advanced retrieval with MMR, multi-query and hybrid search.',
      multiuserChat: 'Chatbot where every user has their own chats plus a long-term memory shared across all of them.',
      draftAdvisor: 'League of Legends champ-select assistant that will recommend picks based on counters and synergies. It already reads the live draft from the game client.',
    },
  },
  motion: {
    title: 'Motion',
    reel: 'Reel',
    clips: 'Pieces',
    hint: 'Hover over a piece to play it.',
    hintTouch: 'Pieces play on their own when they come into view.',
  },
  contact: {
    title: 'Contact',
    text: 'Looking for someone who codes and also cares about how things look and move? Get in touch.',
  },
  footer: 'Built with React, Tailwind and GSAP.',
}
