import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Classement from './pages/Classement'
import CasinoReview from './pages/CasinoReview'
import BonusPage from './pages/BonusPage'
import GoRedirect from './pages/GoRedirect'
import GuidePage from './pages/GuidePage'
import GuideArticle from './pages/GuideArticle'
import FaqPage from './pages/FaqPage'
import JeuResponsable from './pages/JeuResponsable'
import Confidentialite from './pages/Confidentialite'
import APropos from './pages/APropos'
import PillarPage from './pages/PillarPage'
import ComparePage from './pages/ComparePage'
import StickyCTA from './components/StickyCTA'
import LeadModal from './components/LeadModal'
import CookieConsent from './components/CookieConsent'
import ScrollToTop from './components/ScrollToTop'

const pageTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
}

function PageWrap({ children }) {
    return <motion.div {...pageTransition}>{children}</motion.div>
}

function NotFound() {
    return (
        <div className="not-found">
            <div className="container">
                <div className="not-found-chip">🎰</div>
                <h1>404 — Page introuvable</h1>
                <p>Cette page n'existe pas. Retournez à l'accueil ou consultez notre classement.</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
                    <Link to="/" className="btn-primary">Accueil</Link>
                    <Link to="/meilleurs-casinos" className="btn-secondary">Classement</Link>
                </div>
            </div>
        </div>
    )
}

function App() {
    const location = useLocation()

    return (
        <div className="app">
            <ScrollToTop />
            <Header />
            <main>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<PageWrap><Home /></PageWrap>} />
                        <Route path="/meilleurs-casinos" element={<PageWrap><Classement /></PageWrap>} />
                        <Route path="/casino/:slug" element={<PageWrap><CasinoReview /></PageWrap>} />
                        <Route path="/bonus" element={<PageWrap><BonusPage /></PageWrap>} />
                        <Route path="/go/:slug" element={<GoRedirect />} />
                        <Route path="/guide" element={<PageWrap><GuidePage /></PageWrap>} />
                        <Route path="/guide/:slug" element={<PageWrap><GuideArticle /></PageWrap>} />
                        <Route path="/faq" element={<PageWrap><FaqPage /></PageWrap>} />
                        <Route path="/comparer" element={<PageWrap><ComparePage /></PageWrap>} />
                        <Route path="/jeu-responsable" element={<PageWrap><JeuResponsable /></PageWrap>} />
                        <Route path="/confidentialite" element={<PageWrap><Confidentialite /></PageWrap>} />
                        <Route path="/a-propos" element={<PageWrap><APropos /></PageWrap>} />
                        <Route path="/casino-crypto-quebec" element={<PageWrap><PillarPage /></PageWrap>} />
                        <Route path="*" element={<PageWrap><NotFound /></PageWrap>} />
                    </Routes>
                </AnimatePresence>
            </main>
            <Footer />
            <StickyCTA />
            <LeadModal />
            <CookieConsent />
        </div>
    )
}

export default App

