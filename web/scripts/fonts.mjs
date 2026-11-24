// Regenera en index.html la URL de Shippori Mincho B1 con solo los caracteres
// que usa la web (parámetro text= de Google Fonts). Correr tras agregar kanji
// o textos con caracteres nuevos:  node scripts/fonts.mjs
import fs from 'node:fs'
import path from 'node:path'

const chars = new Set()
const walk = (d) => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f)
    if (fs.statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx?|css)$/.test(f)) for (const c of fs.readFileSync(p, 'utf8')) if (c.codePointAt(0) > 160) chars.add(c)
  }
}
walk('src')
let ascii = ''
for (let i = 32; i < 127; i++) ascii += String.fromCharCode(i)
const text = encodeURIComponent(ascii + [...chars].sort().join('')).replace(/'/g, '%27')
const url = `https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@500;700;800&amp;display=swap&amp;text=${text}`

const html = fs.readFileSync('index.html', 'utf8')
const out = html.replace(/https:\/\/fonts\.googleapis\.com\/css2\?family=Shippori[^"]*/, url)
fs.writeFileSync('index.html', out)
console.log(out === html ? 'sin cambios' : `actualizado (${chars.size} caracteres no ASCII)`)
