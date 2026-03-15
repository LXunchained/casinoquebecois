import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Classement from './pages/Classement'
import CasinoReview from './pages/CasinoReview'
import BonusPage from './pages/BonusPage'
import GoRedirect from './pages/GoRedirect'

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
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
