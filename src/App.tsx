import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider } from './lib/i18n'
import { FIVE_X_MILLE_ACTIVE } from './lib/content'
import { useParallax, useRevealAll } from './lib/motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Home from './pages/Home'

const load = <K extends string>(p: () => Promise<Record<K, React.ComponentType<object>>>, k: K) => lazy(() => p().then(m => ({ default: m[k] })))
const Story = load(() => import('./pages/About'), 'Story')
const Mission = load(() => import('./pages/About'), 'Mission')
const Team = load(() => import('./pages/About'), 'Team')
const Transparency = load(() => import('./pages/About'), 'Transparency')
const Sport = load(() => import('./pages/Work'), 'Sport')
const Events = load(() => import('./pages/Work'), 'Events')
const Education = load(() => import('./pages/Work'), 'Education')
const Donate = load(() => import('./pages/Support'), 'Donate')
const FiveXMille = load(() => import('./pages/Support'), 'FiveXMille')
const NotFound = load(() => import('./pages/Support'), 'NotFound')
const ActivityPage = lazy(() => import('./pages/Work').then(m => ({ default: m.Activity })))

function Shell() {
  const { pathname } = useLocation()
  useRevealAll()
  useParallax()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <Cursor />
      <Nav />
      <main key={pathname} className="page-in">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo/storia" element={<Story />} />
            <Route path="/chi-siamo/missione" element={<Mission />} />
            <Route path="/chi-siamo/team" element={<Team />} />
            <Route path="/chi-siamo/trasparenza" element={<Transparency />} />
            <Route path="/lavoro/sport" element={<Sport />} />
            <Route path="/lavoro/sport/sci" element={<ActivityPage which="ski" />} />
            <Route path="/lavoro/sport/canoa" element={<ActivityPage which="canoe" />} />
            <Route path="/lavoro/sport/escursioni" element={<ActivityPage which="hiking" />} />
            <Route path="/lavoro/eventi" element={<Events />} />
            <Route path="/lavoro/educazione" element={<Education />} />
            <Route path="/sostienici/dona" element={<Donate />} />
            {FIVE_X_MILLE_ACTIVE && <Route path="/sostienici/5x1000" element={<FiveXMille />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <Shell />
      </LangProvider>
    </BrowserRouter>
  )
}
