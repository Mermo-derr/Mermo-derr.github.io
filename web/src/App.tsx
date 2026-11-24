import { I18nProvider, useI18n } from './i18n'
import { Nav } from './sections/Nav'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Motion } from './sections/Motion'
import { Contact } from './sections/Contact'

const YEAR = new Date().getFullYear()

function Page() {
  const { t } = useI18n()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Motion />
        <Contact />
      </main>
      {/* Varilla inferior del pergamino */}
      <footer className="bg-ink text-paper/70 label py-6 text-center shadow-[0_-4px_0_0_var(--color-paper-dark)]">
        © {YEAR} Alan Mermolia <span className="text-red mx-2">✦</span> {t.footer}
      </footer>
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  )
}
