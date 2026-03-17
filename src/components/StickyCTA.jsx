import { useState, useEffect } from 'react'
import { X, ExternalLink, Gift } from 'lucide-react'
import { casinos } from '../data/casinos'

// Le #1 casino toujours en premier pour le sticky
const topCasino = casinos[0]

export default function StickyCTA() {
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 400 && !dismissed) {
                setVisible(true)
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [dismissed])

    if (!visible || dismissed) return null

    return (
        <div className="sticky-cta" role="complementary" aria-label="Offre bonus">
            <div className="sticky-cta-inner">
                <div className="sticky-cta-logo" style={{ background: topCasino.color + '22' }}>
                    <span>{topCasino.logo}</span>
                </div>
                <div className="sticky-cta-text">
                    <span className="sticky-cta-name">{topCasino.name}</span>
                    <span className="sticky-cta-bonus">
                        <Gift size={12} /> {topCasino.bonus}
                    </span>
                </div>
                <a
                    href={`/go/${topCasino.slug}`}
                    className="sticky-cta-btn"
                    target="_blank"
                    rel="nofollow noopener"
                    style={{ background: topCasino.color }}
                    id="sticky-cta-claim"
                >
                    Réclamer <ExternalLink size={13} />
                </a>
                <button
                    className="sticky-cta-close"
                    onClick={() => { setDismissed(true); setVisible(false) }}
                    aria-label="Fermer"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    )
}
