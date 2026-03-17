import { Routes, Route } from 'react-router-dom'
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

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/meilleurs-casinos" element={<Classement />} />
                    <Route path="/casino/:slug" element={<CasinoReview />} />
                    <Route path="/bonus" element={<BonusPage />} />
                    <Route path="/go/:slug" element={<GoRedirect />} />
                    <Route path="/guide" element={<GuidePage />} />
                    <Route path="/guide/:slug" element={<GuideArticle />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/jeu-responsable" element={<JeuResponsable />} />
                    <Route path="/confidentialite" element={<Confidentialite />} />
                    <Route path="/a-propos" element={<APropos />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
