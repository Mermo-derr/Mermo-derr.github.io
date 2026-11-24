// Genera public/og.jpg (1200x630) y public/apple-touch-icon.png (180x180) con sharp.
// Uso: node scripts/og.mjs   (fuentes del sistema: Yu Mincho para kanji, Georgia para latín)
import sharp from 'sharp'

const paper = '#EDE6D6', ink = '#141210', red = '#C8102E'
const serif = "Georgia, serif"
const kanji = "MingLiU, 'PMingLiU', serif"
const sans = "Segoe UI, Arial, sans-serif"

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 0.08  0 0 0 0 0.07  0 0 0 0 0.06  0 0 0 0.07 0"/></filter>
  </defs>
  <rect width="1200" height="630" fill="${paper}"/>
  <rect width="1200" height="630" filter="url(#grain)"/>
  <rect width="1200" height="34" fill="${ink}"/>
  <rect y="596" width="1200" height="34" fill="${ink}"/>
  <g font-family="${sans}" font-size="20" letter-spacing="4" fill="${ink}">
    <text x="80" y="92">PORTFOLIO <tspan fill="${red}" font-family="${kanji}">(作品集)</tspan></text>
    <text x="80" y="508" font-weight="700">CREATIVE DEVELOPER</text>
    <text x="80" y="546" fill="#4A4540">WEB · MOTION · DESIGN — BUENOS AIRES</text>
  </g>
  <line x1="80" y1="116" x2="920" y2="116" stroke="${ink}" stroke-opacity="0.25"/>
  <g font-family="${serif}" font-weight="800" font-size="128" fill="${ink}" letter-spacing="-3">
    <text x="72" y="290">ALAN</text>
    <text x="72" y="430">MERM</text>
    <text x="__LIA__" y="430">LIA</text>
  </g>
  <rect x="960" y="34" width="150" height="562" fill="${ink}"/>
  <g font-family="${kanji}" font-weight="700" font-size="56" fill="${paper}" text-anchor="middle">
    ${[...'創造的開発者'].map((c, i) => `<text x="1035" y="${120 + i * 70}">${c}</text>`).join('')}
  </g>
  <g transform="translate(__SUN__ 386)">
    <circle r="37" fill="none" stroke="${red}" stroke-width="14"/>
    <circle r="13" fill="${red}"/>
  </g>
  <g transform="translate(905 520) rotate(-8)">
    <rect x="-38" y="-38" width="76" height="76" rx="6" fill="${red}"/>
    <text font-family="${kanji}" font-weight="700" font-size="28" fill="${paper}" text-anchor="middle" y="10">印</text>
  </g>
</svg>`

// La "O" como sol: se mide el ancho real de "MERM" para colocarlo justo después
const probe = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fff"/>
  <text x="72" y="430" font-family="${serif}" font-weight="800" font-size="128" letter-spacing="-3">MERM</text></svg>`
const { info } = await sharp(Buffer.from(probe)).trim().toBuffer({ resolveWithObject: true })
const right = -info.trimOffsetLeft + info.width
const sun = right + 12 + 44
await sharp(Buffer.from(og.replace('__SUN__', sun).replace('__LIA__', sun + 44 + 8))).jpeg({ quality: 86, mozjpeg: true }).toFile('public/og.jpg')

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${paper}"/>
  <circle cx="32" cy="32" r="18" fill="none" stroke="${red}" stroke-width="6"/>
  <circle cx="32" cy="32" r="7" fill="${red}"/>
</svg>`
await sharp(Buffer.from(icon)).png().toFile('public/apple-touch-icon.png')
console.log('ok')
