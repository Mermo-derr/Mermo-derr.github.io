# Plan — Portfolio "Creative Developer" (Alan Mermolia)

> Documento vivo. Leerlo al empezar cada iteración, marcar casillas al terminar
> tareas y anotar en **Registro** cualquier decisión nueva. Creado: 2026-11-24.

## 1. Objetivo

Landing page de una sola página que funcione como portfolio para **técnicos de
selección**: mostrar a Alan como **Creative Developer** (desarrollo web + diseño
y animación) con estética de **pergamino japonés editorial**. Todas las
animaciones siguen la misma línea visual.

## 2. Decisiones cerradas

| Tema | Decisión |
|---|---|
| Título | Creative Developer |
| Público | Técnicos de selección (recruiters IT) |
| Idiomas | Español e inglés con selector (por defecto: idioma del navegador; se guarda en `localStorage`) |
| Estética | **Pergamino japonés editorial.** Referencia: Dribbble "Japanese history // Website" (BL/S, shot 21659793). Se toma la estética, no la distribución: papel beige con grano y pliegues, tinta negra, rojo como único acento, líneas finas, anotaciones chicas en mayúsculas con japonés entre paréntesis, columnas negras con kanji vertical, sello hanko, cintas negras con texto, números en círculo rojo. **Sin efectos shōnen** |
| Mascota | No |
| Tema | **Claro** (papel). Bloques negros puntuales para contraste. El nav y el footer negros hacen de varillas del pergamino |
| Paleta | paper `#EDE6D6`, paper-dark `#E0D7C3`, ink `#141210`, ink-soft `#4A4540`, red `#C8102E` |
| Tipografías | **Shippori Mincho B1** (títulos y kanji) + **Space Grotesk** (texto y etiquetas). Google Fonts |
| Tokens | `web/src/index.css` (`@theme` de Tailwind 4 + componentes `.label`, `.vertical-jp`, `.hanko`, `.tape`, `.num-circle`, `.btn-ink`, `.btn-line`) y `web/src/motion.ts` (GSAP) |
| Arquitectura | Web propia (React + Vite + Tailwind + GSAP). **Sin Rive** (plan Free = splash en cada canvas, ver Registro) |
| Hosting | GitHub Pages en `Mermo-derr` (repo propuesto: `Mermo-derr.github.io`) |
| Accesibilidad | Responsive (mobile-first) y respetar `prefers-reduced-motion` |
| Contacto | Solo enlaces: email, LinkedIn, GitHub. Sin teléfono ni formulario |
| Fecha límite | Ninguna |

## 3. Contenido

**Hero:** fila de anotaciones (Portfolio (作品集) · coordenadas de Buenos Aires ·
2026), "ALAN MERMOLIA" con la O como sol rojo, (アラン・メルモリア), "Creative
Developer", bajada, botones, columna negra 創造的開発者 con sello アラン y cinta
negra diagonal.

**Sobre mí** (fuente: `CV_Alan_Mermolia_ES.pdf`): más de 4 años; Full Stack en
Stefanini (2025–hoy) y en Encender Comunicación (2022–2025), nombrando a Philip
Morris, River Plate y Bodegas Callia; Diseño Multimedial (ISEC); IA generativa.
Datos: experiencia, base, idiomas.

**Habilidades:** Desarrollo (frontend, backend, datos, IA) en panel de papel;
Diseño y motion (After Effects, Premiere, Blender, GSAP · Figma, Photoshop,
Illustrator, UX/UI) en panel negro.

**Proyectos** (grilla mezclada, en este orden, datos en `web/src/data.ts`):

1. **Bodegas Callia**: sitio con CMS y catálogo, en Encender. https://www.bodegascallia.com/
2. **River Plate**: plataforma de acreditaciones de prensa, en Encender. Sin
   enlace (la captura sale de `carp-dev-fe.encendermedia.com`, que es de desarrollo)
3. **CV Analyzer**: https://github.com/Mermo-derr/cv_analyzer
4. **Legal RAG Assistant**: https://github.com/Mermo-derr/asistente_legal_RAG
5. **Multi-user Memory Chat**: https://github.com/Mermo-derr/multiuser_chat_system
6. **Draft Advisor** ("En desarrollo": en F0 solo lee el draft, todavía no
   recomienda): https://github.com/Mermo-derr/draft-advisor

Excluidos: Philip Morris como proyecto (sin capturas), CoderHouse,
`langchainProjects`, `helpdesk_system` y `soc_multiagent`.

**Motion (sección separada):** reel (`resources/video/reel_1.mp4`, 64 MB →
unos 10–15 MB; si no encaja con la estética, queda fuera) y clips en bucle sin
sonido: `GM_PUBLICIDAD2`, `intro_LNGaming`, `intro_soyfac`,
`Liga Box Animacion 3D`. (Los verticales `soyfac1` y `soyfac2` los quitó Alan.)

**Contacto:** mermolia.alan@gmail.com ·
https://www.linkedin.com/in/alan-mermolia/ · https://github.com/Mermo-derr

## 4. Restricciones técnicas

- **La web no usa Rive.** En el plan Free cada `.riv` muestra un splash "RIVE"
  de unos 1,5 s. Se puede retomar desde `rive/` si se paga un plan (las
  instrucciones de Rive están en `AGENTS.md`).
- Animación: GSAP (+ ScrollTrigger) para timelines y scroll, CSS para hovers
  simples, SVG para trazos de tinta.
- ffmpeg es necesario para la Fase 4: `winget install --id Gyan.FFmpeg -e`
  (lo ejecuta Alan).
- `sharp` (devDependency de `web/`) convierte capturas a WebP.

## 5. Estructura de carpetas

```
Portfolio/
  plan.md, CV_Alan_Mermolia_ES.pdf, resources/   (resources/ y el reel fuera de git)
  rive/        proyecto Rive de la prueba de la Fase 0 (sin uso)
  web/         React + Vite + Tailwind + GSAP
    src/i18n/{es,en}.ts, src/data.ts, src/motion.ts
    src/fx/      efectos reutilizables (Fase 3)
    src/sections/{Nav,Hero,About,Skills,Projects,Motion,Contact,SectionTitle}.tsx
    public/{video,img}/
```

## 6. Sistema de animación (línea estética única)

Todo se mueve como tinta y papel, nunca como cómic:
- **Intro:** el pergamino se desenrolla (máscara vertical desde el centro, unos
  2 s), cae el sello rojo y aparece el nombre. Botón "Saltar". Una vez por sesión.
- **Entrada de sección:** las líneas finas se dibujan de izquierda a derecha, el
  título se revela con una máscara como trazo de pincel y el número rojo "sella"
  (escala 1,3 → 1 con opacidad).
- **Kanji verticales:** aparecen trazo a trazo, de arriba abajo, con stagger.
- **Cintas negras:** texto en marquee continuo y lento.
- **Hanko:** golpe de sello (escala y rotación leve) al entrar en pantalla.
- **Tarjetas:** la imagen pasa de desaturada a color con un zoom leve; borde que
  se engrosa.
- **Sol rojo (la O):** pulso o giro muy lento.
- **Easing común:** `expo.out` para entradas (tinta que se asienta) y
  `power4.in` para salidas. Tokens en `motion.ts` e `index.css`.
- **`prefers-reduced-motion`:** sin intro ni marquee, solo fundidos.

## 7. Fases

### Fase 0 — Validación técnica
- [x] Instalar ffmpeg 9.1 (`winget install --id Gyan.FFmpeg -e`). En shells
      viejos, recargar PATH: `$env:Path = [Environment]::GetEnvironmentVariable('Path','User') + ';' + $env:Path`
- [x] `rive login` y `rive whoami` (ya estaba logueado, workspace "Portfolio")
- [x] Escena mínima en Rive → `--publish` → incrustarla en Vite y comprobar la
      marca de agua en plan Free
- [x] Decidir: Rive completo, Rive parcial o plan B → **sin Rive** (ver Registro)
- [x] Mover el proyecto Rive a `rive/` y crear `web/` (Vite 9 + React 19 + TS + Tailwind 4)
- [x] Añadir `resources/`, `reel_1.mp4` y `build/` a `.gitignore`

Comandos (desde `web/`): `npm run dev` (puerto 5173), `npm run build` y `npm run lint`.

### Fase 1 — Dirección visual
- [x] Primera dirección: oscuro, shōnen, paleta C + Dela Gothic (descartada, ver Registro)
- [x] **Rediseño a pergamino japonés** según la referencia de Dribbble: tokens,
      fuentes y todas las secciones
- [ ] Alan valida el rediseño (o pide una display más futurista como la de la referencia)

### Fase 2 — Estructura y contenido
- [x] Layout de una página con las secciones de §3 y navegación con anclas
- [x] i18n ES/EN: selector, detección por navegador, `localStorage` y `<html lang>`
      (`src/i18n/{es,en}.ts`, tipado: `en` debe tener las mismas claves que `es`)
- [x] Textos ES/EN de todas las secciones
- [ ] Alan revisa los textos en inglés y el "Sobre mí"
- [x] Leer los proyectos y fijar el orden (§3)
- [x] Capturas → WebP en `web/public/img/` (con `sharp`, 1280 px de ancho):
  - [x] Bodegas Callia (`callia.webp`, web pública, popup cerrado)
  - [x] River Plate (`river.webp`, desde carp-dev-fe.encendermedia.com)
  - [x] CV Analyzer (`cv-analyzer.webp`, resultado 94 %)
  - [x] Legal RAG (`legal-rag.webp`, pregunta sobre la plaza de garaje con un
        fragmento desplegado que muestra fuente y página)
  - [x] Multi-user Chat (`multiuser-chat.webp`): usuario "sofia"; un chat con
        sus datos y otro chat nuevo donde recuerda que es diseñadora UX y
        aprende React (memoria entre chats)
  - [x] Draft Advisor (`draft-advisor.webp`): salida real de `--replay` con el
        cuadro "ES TU TURNO DE PICK", mostrada como ventana de terminal

### Fase 3 — Animaciones (GSAP + CSS + SVG)
Implementación: `src/fx/` → `gsap.ts` (registro de plugins), `Chars.tsx`
(separa kanji en spans), `Intro.tsx`, `useReveal.ts` (todas las entradas por
atributos `data-hero`, `data-reveal`, `data-part`; ver comentario del archivo).
CSS: `.marquee` y `.sun` en `index.css`.

- [x] Intro "pergamino que se desenrolla" (§6) con "Saltar", una vez por sesión
      (`sessionStorage.introSeen`; para volver a verla, pestaña nueva)
- [x] Hero: nombre revelado por líneas, textos, columna negra que baja, cinta y sello
- [x] Entradas de sección con ScrollTrigger: líneas, título con trazo, número sellado
- [x] Kanji verticales con stagger; hanko con golpe de sello
- [x] Cinta del hero en marquee continuo (CSS); sol rojo con pulso lento
- [x] Hover de tarjetas de proyecto y botones (CSS)
- [x] `prefers-reduced-motion`: sin intro, sin GSAP (todo visible), sin marquee ni pulso
- [x] Revisado en Chrome en desktop
- [x] Revisar en móvil (hecho en la Fase 5)
- Bug resuelto: el bloqueo de scroll de la intro quedaba puesto si React
  re-ejecutaba el efecto (StrictMode/HMR). Ahora depende de `gone`

### Fase 4 — Motion (video)

Fuentes (todas H.264 + AAC): reel 39 s 1080p 64 MB · GM Publicidad 20 s 1080p ·
LNGaming 5,6 s 1080p · Soyfac intro 5 s 1080p · Liga Box 3D 9,6 s 1080p 57 MB ·
**soyfac1 (5 s) y soyfac2 (15 s) son verticales 1126×2008**: la galería tiene
que admitir clips 9:16 además de 16:9.

Salida en `web/public/video/` (comandos ffmpeg: ver Registro).

- [x] Reel: `reel.mp4` H.264 1080p, CRF 24 con tope de 2,6 Mbps, AAC 128k,
      faststart → **7,5 MB**. Póster `reel-poster.webp` (9,5 s). Es muy colorido
      (synthwave/neón): se muestra dentro de un marco negro tipo pantalla, así
      convive con el papel. Alan decide si queda
- [x] Clips (6 s máx., sin audio, 720p; verticales a 540 de ancho): WebM VP9
      (CRF 38) + MP4 H.264 (CRF 27) + póster WebP. 0,1–0,6 MB cada uno.
      GM Publicidad desde el segundo 2; el resto desde el inicio
- [x] Galería: 4 horizontales en 2×2 (los 2 verticales se quitaron; el
      componente sigue admitiendo 9:16 si se agregan); reproducción al
      pasar el cursor (táctil: al estar visible), `preload="none"`, datos en
      `data.ts` (`clips`, `reel`)
- Nota: el reel muestra el logo de Overwatch (trabajo de fan) y la firma "Derrha"

### Fase 5 — Pulido
- [x] Responsive (360 px, 768 px, 1280 px y más): sin desborde horizontal.
      Nombre del hero y títulos de sección con `clamp()` en móvil; contacto
      apilado en móvil; **menú móvil** desplegable (Esc lo cierra)
- [x] `prefers-reduced-motion`, foco visible, `alt` y `aria`, contraste:
      enlace "Saltar al contenido", enlaces de proyecto con nombre accesible,
      aviso de Motion distinto en táctil (`hintTouch`)
- [x] Lighthouse (build de producción con `vite preview`):
      **móvil** rendimiento 82–83, accesibilidad 100, buenas prácticas 100,
      SEO 100 · **escritorio** 96 / 100 / 100 / 100. Medido sin throttling:
      FCP 0,4 s, LCP 1,5 s. El 90 en móvil no se alcanza sin prerenderizar
      el HTML (SSG): el LCP es el sello de la intro y depende del JS (ver Registro)
- [x] Carga diferida: pósters de video con `useNear` (IntersectionObserver),
      capturas con `srcset` 640/1280 (`*-640.webp`), videos `preload="none"`
- [x] Meta tags, Open Graph (`public/og.jpg` 1200×630, generado con
      `node scripts/og.mjs`), favicon SVG del sol rojo, `apple-touch-icon.png`
      y `robots.txt`. Las URL absolutas asumen `https://mermo-derr.github.io/`
      (cambiarlas si el repo de la Fase 6 es otro)
- Fuentes: Shippori se pide a Google solo con los caracteres usados
  (`text=`). **Si se agregan textos con kanji o acentos nuevos, correr
  `node scripts/fonts.mjs` desde `web/`**. Ambas fuentes cargan sin bloquear

### Fase 6 — Deploy
- [ ] Crear el repo `Mermo-derr.github.io` (confirmar con Alan)
- [ ] GitHub Action de build de Vite → Pages
- [ ] Probar el sitio publicado en desktop y en móvil

## 8. Protocolo de iteración

1. Leer este plan y el Registro.
2. **Commit del estado actual antes de cambiar nada** (pedido de Alan). Mensajes
   en español. `CV_*.pdf` queda fuera de git (tiene el teléfono).
3. Tomar la siguiente casilla pendiente, o lo que pida Alan.
4. Verificar: `npm run build` en `web/` y revisar en Chrome (localhost:5173).
5. Marcar la casilla y anotar en el Registro las decisiones o los cambios de
   alcance.

## 9. Registro

- 2026-11-24 — Plan creado con las respuestas de Alan.
- 2026-11-24 — Fase 0: con el plan Free, en la web **cada canvas Rive muestra
  un splash negro "RIVE" de unos 1,5 s**. Decisión de Alan: **sin Rive en la web**.
- 2026-11-24 — Fase 1: Alan eligió oscuro + paleta C + Dela Gothic; luego pidió
  rediseñar según la referencia de Dribbble → **pergamino japonés, claro, sin
  shōnen, manteniendo la estructura de secciones**.
- 2026-11-24 — Alan autoriza nombrar a Philip Morris y River Plate en "Sobre
  mí", y capturar `carp-dev-fe.encendermedia.com` → River Plate entra como
  proyecto, sin enlace.
- Nota: si Vite sirve un módulo vacío tras escribir archivos, reiniciar
  `npm run dev` (pasó una vez con `App.tsx`).
- 2026-11-24 — Fase 4, comandos ffmpeg usados:
  reel `-c:v libx264 -preset slow -crf 24 -maxrate 2.6M -bufsize 5.2M -c:a aac -b:a 128k -movflags +faststart`;
  clips `-t 6 -an` + `libx264 -crf 27` / `libvpx-vp9 -crf 38 -b:v 0`, escala `-2:720` o `540:-2`.
- Nota: CV Analyzer (puerto 8000) y Legal RAG (puerto 8501) pueden quedar
  corriendo en segundo plano durante las capturas; cerrarlos al terminar.
- 2026-11-24 — Fase 5: rendimiento móvil de 71 → 83 con fuentes sin bloquear,
  Shippori subconjuntada (de unos 300 KB a 100 KB), grano de papel en PNG en
  vez de feTurbulence y pósters diferidos. Para llegar a 90 haría falta SSG
  (prerender del HTML); no se hizo por el costo (la intro y la detección de
  idioma complican la hidratación). Se puede retomar si importa.
