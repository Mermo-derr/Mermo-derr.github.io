// Textos en español. `en.ts` debe tener exactamente las mismas claves.
export const es = {
  meta: {
    title: 'Alan Mermolia — Creative Developer',
    description: 'Desarrollador web y diseñador multimedia. Portfolio de desarrollo, diseño y animación.',
  },
  intro: {
    skip: 'Saltar',
  },
  nav: {
    about: 'Sobre mí',
    skills: 'Habilidades',
    projects: 'Proyectos',
    motion: 'Motion',
    contact: 'Contacto',
    langLabel: 'Cambiar idioma',
    menu: 'Menú',
    skipToContent: 'Saltar al contenido',
  },
  hero: {
    role: 'Creative Developer',
    tagline: 'Desarrollo web con lógica de backend y criterio de diseñador multimedia.',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Contacto',
  },
  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Soy desarrollador con más de 4 años creando aplicaciones web y soluciones de negocio. Hoy trabajo como Full Stack en Stefanini y antes pasé tres años en la agencia Encender Comunicación, desarrollando para marcas como Philip Morris, River Plate y Bodegas Callia.',
      'Me formé en Diseño Multimedial (ISEC) antes de dedicarme al código, así que pienso las interfaces y el movimiento tanto como la arquitectura. Últimamente también integro IA generativa: agentes, RAG y salidas estructuradas.',
    ],
    facts: [
      { label: 'Experiencia', value: '+4 años' },
      { label: 'Base', value: 'Buenos Aires, AR' },
      { label: 'Idiomas', value: 'Español nativo · Inglés B2' },
    ],
  },
  skills: {
    title: 'Habilidades',
    dev: 'Desarrollo',
    design: 'Diseño y motion',
    groups: {
      frontend: 'Frontend',
      backend: 'Backend',
      data: 'Datos e infraestructura',
      ai: 'IA',
      motion: 'Animación y video',
      visual: 'Diseño visual',
    },
  },
  projects: {
    title: 'Proyectos',
    code: 'Código',
    site: 'Sitio',
    newTab: 'se abre en una pestaña nueva',
    wip: 'En desarrollo',
    items: {
      callia: 'Sitio corporativo con CMS y catálogo dinámico de productos, desarrollado en la agencia Encender Comunicación.',
      river: 'Plataforma de acreditaciones para prensa: los medios solicitan acceso a los eventos del club por deporte y la institución gestiona las aprobaciones. Desarrollado en Encender Comunicación.',
      cvAnalyzer: 'Evalúa un CV en PDF frente a una descripción de puesto usando IA. API en FastAPI y frontend en JavaScript sin frameworks.',
      legalRag: 'Responde consultas sobre contratos en PDF citando fuente y página. Recuperación avanzada con MMR, multi-query y búsqueda híbrida.',
      multiuserChat: 'Chatbot en el que cada usuario tiene sus propios chats y una memoria a largo plazo compartida entre todos ellos.',
      draftAdvisor: 'Asistente para el champ select de League of Legends que recomendará picks según counters y sinergias. Ya lee el draft en vivo desde el cliente.',
    },
  },
  motion: {
    title: 'Motion',
    reel: 'Reel',
    clips: 'Piezas',
    hint: 'Pasa el cursor sobre una pieza para reproducirla.',
    hintTouch: 'Las piezas se reproducen solas al aparecer en pantalla.',
  },
  contact: {
    title: 'Contacto',
    text: '¿Buscas a alguien que programe y también piense en cómo se ve y se mueve? Escríbeme.',
  },
  footer: 'Hecho con React, Tailwind y GSAP.',
}

export type Dict = typeof es
