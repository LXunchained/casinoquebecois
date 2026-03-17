import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Mail, CheckCircle } from 'lucide-react'

const STORAGE_KEY = 'cq_lead_dismissed'
const DELAY_MS = 35000 // 35 seconds

export default function LeadModal() {
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem(STORAGE_KEY)) return
        const timer = setTimeout(() => setVisible(true), DELAY_MS)
        return () => clearTimeout(timer)
    }, [])

    const dismiss = () => {
        setVisible(false)
        sessionStorage.setItem(STORAGE_KEY, '1')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        // mailto fallback — no backend needed
        window.location.href = `mailto:contact@casinoquebecois.net?subject=Guide PDF gratuit&body=Email: ${email}`
        setSubmitted(true)
        setTimeout(dismiss, 3000)
    }

    return (
        <AnimatePresence>
            {visible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="lead-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={dismiss}
                    />

                    {/* Modal */}
                    <motion.div
                        className="lead-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Obtenez votre guide gratuit"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    >
                        <button className="lead-close" onClick={dismiss} aria-label="Fermer">
                            <X size={18} />
                        </button>

                        {!submitted ? (
                            <>
                                <div className="lead-icon">
                                    <Gift size={32} />
                                </div>
                                <h2 className="lead-title">Guide PDF Gratuit</h2>
                                <p className="lead-sub">
                                    <strong>Les 5 Meilleurs Casinos Crypto Québec 2026</strong><br />
                                    Bonus exclusifs, rakeback expliqué, légalité — tout dans un seul guide.
                                </p>

                                <ul className="lead-benefits">
                                    <li><CheckCircle size={14} /> Comparatif complet des 5 casinos</li>
                                    <li><CheckCircle size={14} /> Explication du rakeback en 5 minutes</li>
                                    <li><CheckCircle size={14} /> Comment déposer en Bitcoin au Québec</li>
                                    <li><CheckCircle size={14} /> Codes promo exclusifs vérifiés</li>
                                </ul>

                                <form className="lead-form" onSubmit={handleSubmit}>
                                    <div className="lead-input-row">
                                        <Mail size={16} className="lead-input-icon" />
                                        <input
                                            type="email"
                                            className="lead-input"
                                            placeholder="votre@email.com"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            id="lead-email-input"
                                        />
                                    </div>
                                    <button type="submit" className="lead-submit">
                                        Recevoir le guide gratuit →
                                    </button>
                                </form>

                                <p className="lead-disclaimer">
                                    Pas de spam. Désabonnement en 1 clic. 18+ uniquement.
                                </p>
                            </>
                        ) : (
                            <div className="lead-success">
                                <div className="lead-success-icon">✅</div>
                                <h2>Merci !</h2>
                                <p>Votre guide arrive dans quelques minutes. Vérifiez votre boîte mail.</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
