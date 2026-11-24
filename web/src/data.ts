import type { Dict } from './i18n/es'

export const contact = {
  email: 'mermolia.alan@gmail.com',
  linkedin: 'https://www.linkedin.com/in/alan-mermolia/',
  github: 'https://github.com/Mermo-derr',
}

export type Project = {
  id: keyof Dict['projects']['items']
  name: string
  stack: string[]
  repo?: string
  site?: string
  image?: string // /img/<id>.webp, se agrega con las capturas (Fase 2)
  wip?: boolean
}

// Orden: primero lo más web y visual, luego IA; lo que está en desarrollo, al final.
export const projects: Project[] = [
  {
    id: 'callia',
    name: 'Bodegas Callia',
    stack: ['PHP', 'React', 'MySQL', 'Docker'],
    site: 'https://www.bodegascallia.com/',
    image: '/img/callia.webp',
  },
  {
    id: 'river',
    name: 'River Plate',
    stack: ['PHP', 'MySQL', 'Docker', 'HTML', 'CSS'],
    image: '/img/river.webp',
  },
  {
    id: 'cvAnalyzer',
    name: 'CV Analyzer',
    stack: ['FastAPI', 'LangChain', 'Gemini', 'JavaScript'],
    repo: 'https://github.com/Mermo-derr/cv_analyzer',
    image: '/img/cv-analyzer.webp',
  },
  {
    id: 'legalRag',
    name: 'Legal RAG Assistant',
    stack: ['LangChain', 'Gemini', 'ChromaDB', 'Streamlit'],
    repo: 'https://github.com/Mermo-derr/asistente_legal_RAG',
    image: '/img/legal-rag.webp',
  },
  {
    id: 'multiuserChat',
    name: 'Multi-user Memory Chat',
    stack: ['LangGraph', 'OpenAI', 'ChromaDB', 'Streamlit'],
    repo: 'https://github.com/Mermo-derr/multiuser_chat_system',
    image: '/img/multiuser-chat.webp',
  },
  {
    id: 'draftAdvisor',
    name: 'Draft Advisor',
    stack: ['Python', 'Pydantic', 'LCU API', 'pytest'],
    repo: 'https://github.com/Mermo-derr/draft-advisor',
    image: '/img/draft-advisor.webp',
    wip: true,
  },
]

export const skills = {
  dev: {
    frontend: ['JavaScript', 'TypeScript', 'React', 'Vue', 'HTML', 'CSS', 'Tailwind'],
    backend: ['Python', 'FastAPI', 'PHP', 'Laravel', 'CodeIgniter', 'Node.js', 'Java', 'Spring Boot'],
    data: ['MySQL', 'PostgreSQL', 'ChromaDB', 'Docker', 'Git'],
    ai: ['OpenAI', 'Gemini', 'LangChain', 'LangGraph', 'RAG'],
  },
  design: {
    motion: ['After Effects', 'Premiere', 'Blender', 'GSAP'],
    visual: ['Figma', 'Photoshop', 'Illustrator', 'UX/UI'],
  },
} as const

// Piezas de video (Fase 4). Archivos en /video/<file>.
export const clips = [
  { file: 'gm-publicidad', title: 'GM Publicidad' },
  { file: 'intro-lngaming', title: 'Intro LNGaming' },
  { file: 'intro-soyfac', title: 'Intro Soyfac' },
  { file: 'liga-box-3d', title: 'Liga Box 3D' },
  { file: 'soyfac-1', title: 'Soyfac I' },
  { file: 'soyfac-2', title: 'Soyfac II' },
]
