import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'cq_cookie_consent'

export default function CookieConsent() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            // Small delay so it doesn't flash on load
            const timer = setTimeout(() => setVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, 'accepted')
        setVisible(false)
    }

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="cookie-banner"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    role="dialog"
                    aria-label="Consentement aux cookies"
                >
                    <div className="cookie-inner">
                        <div className="cookie-icon">
                            <Cookie size={20} />
                        </div>
                        <div className="cookie-text">
                            <p>
                                Ce site utilise des cookies pour améliorer votre expérience et analyser le trafic.
                                En continuant, vous acceptez notre{' '}
                                <Link to="/confidentialite" className="cookie-link">politique de confidentialité</Link>.
                            </p>
                        </div>
                        <div className="cookie-actions">
                            <button className="cookie-accept" onClick={accept} id="cookie-accept-btn">
                                <Shield size={14} /> Accepter
                            </button>
                            <Link to="/confidentialite" className="cookie-learn">
                                En savoir plus
                            </Link>
                        </div>
                        <button className="cookie-close" onClick={accept} aria-label="Fermer">
                            <X size={16} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
