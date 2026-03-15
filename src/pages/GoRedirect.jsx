import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AlertCircle, ExternalLink } from 'lucide-react'
import { getCasinoBySlug } from '../data/casinos'

export default function GoRedirect() {
    const { slug } = useParams()
    const casino = getCasinoBySlug(slug)

    useEffect(() => {
        if (!casino) return
        // Track affiliate click
        if (typeof window.gtag === 'function') {
            window.gtag('event', 'affiliate_click', {
                casino_slug: casino.slug,
                casino_name: casino.name,
            })
        }
        const timer = setTimeout(() => {
            window.location.href = casino.affiliateUrl
        }, 1800)
        return () => clearTimeout(timer)
    }, [casino])

    if (!casino) {
        return (
            <div className="redirect-page">
                <div className="redirect-card">
                    <AlertCircle size={48} style={{ color: '#ef4444', marginBottom: '1rem' }} />
                    <h1>Casino introuvable</h1>
                    <p>Le casino que vous cherchez n'existe pas dans notre base de données.</p>
                    <Link to="/meilleurs-casinos" className="redirect-back-btn">← Voir le classement</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="redirect-page">
            <div className="redirect-card">
                <div className="redirect-logo">{casino.logo}</div>
                <h1 className="redirect-title">Redirection vers {casino.name}</h1>
                <p className="redirect-sub">Vous allez être redirigé vers le site officiel de {casino.name}. Votre bonus sera automatiquement activé.</p>

                <div className="redirect-bonus-badge">
                    🎁 {casino.bonusDetail}
                </div>

                <div className="redirect-spinner">
                    <div className="spinner-ring" />
                    <span>Chargement en cours...</span>
                </div>

                <a href={casino.affiliateUrl} className="redirect-manual-link" target="_blank" rel="noopener noreferrer">
                    Cliquez ici si vous n'êtes pas redirigé automatiquement <ExternalLink size={13} />
                </a>

                <p className="redirect-disclaimer">
                    Lien affilié — CasinoQuébécois.net perçoit une commission sur inscription. Le bonus reste identique pour vous.
                </p>
            </div>
        </div>
    )
}
