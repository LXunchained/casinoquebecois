import { Link } from 'react-router-dom'
import { Star, CheckCircle, XCircle, ExternalLink, Trophy, Zap } from 'lucide-react'

const badgeLabels = {
    'top-pick': { label: '⭐ Top Pick', class: 'badge-gold' },
    'recommended': { label: '✅ Recommandé', class: 'badge-green' },
}

function StarRating({ rating }) {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(s => (
                <Star
                    key={s}
                    size={14}
                    fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
                    stroke={s <= Math.round(rating) ? '#f59e0b' : '#6b7280'}
                />
            ))}
            <span className="rating-num">{rating.toFixed(1)}</span>
            <span className="rating-count">({(rating * 1000).toLocaleString('fr-CA')} avis)</span>
        </div>
    )
}

export default function CasinoCard({ casino, rank, featured = false, compact = false }) {
    const badge = casino.badge ? badgeLabels[casino.badge] : null

    if (compact) {
        return (
            <div className="casino-card-compact">
                <div className="cc-rank">#{rank}</div>
                <div className="cc-logo" style={{ background: casino.color + '22' }}>{casino.logo}</div>
                <div className="cc-info">
                    <div className="cc-name">{casino.name}</div>
                    <div className="cc-bonus">{casino.bonus}</div>
                </div>
                <StarRating rating={casino.rating} />
                <a href={`/go/${casino.slug}`} className="btn-sm-primary" target="_blank" rel="nofollow noopener">
                    Jouer <ExternalLink size={13} />
                </a>
            </div>
        )
    }

    return (
        <div className={`casino-card ${featured ? 'casino-card-featured' : ''}`} id={`casino-${casino.slug}`}>
            {rank && (
                <div className="card-rank-badge">
                    {rank === 1 ? <Trophy size={14} /> : `#${rank}`}
                </div>
            )}
            {badge && <div className={`card-badge ${badge.class}`}>{badge.label}</div>}

            <div className="card-top" style={{ '--casino-color': casino.color }}>
                <div className="card-logo" style={{ background: casino.color + '22' }}>
                    <span className="card-logo-emoji">{casino.logo}</span>
                </div>
                <div className="card-identity">
                    <h3 className="card-name">{casino.name}</h3>
                    <p className="card-tagline">{casino.tagline}</p>
                    <StarRating rating={casino.rating} />
                </div>
            </div>

            <div className="card-bonus-block" style={{ borderColor: casino.color + '55' }}>
                <div className="bonus-amount">{casino.bonus}</div>
                <div className="bonus-detail">{casino.bonusDetail}</div>
                {casino.freeSpins > 0 && (
                    <div className="bonus-spins">
                        <Zap size={13} /> {casino.freeSpins} tours gratuits inclus
                    </div>
                )}
            </div>

            <div className="card-meta-row">
                <div className="card-meta-item">
                    <span className="meta-label">Dépôt min.</span>
                    <span className="meta-val">{casino.minDeposit}</span>
                </div>
                <div className="card-meta-item">
                    <span className="meta-label">Retrait</span>
                    <span className="meta-val">{casino.withdrawalTime}</span>
                </div>
                <div className="card-meta-item">
                    <span className="meta-label">Licence</span>
                    <span className="meta-val meta-license">{casino.licenseText.split(' ')[0]}</span>
                </div>
            </div>

            <div className="card-payment-row">
                {casino.paymentMethods.slice(0, 4).map(m => (
                    <span key={m} className="payment-chip">{m}</span>
                ))}
            </div>

            <div className="card-pros-cons">
                <ul className="pros-list">
                    {casino.pros.slice(0, 3).map(p => (
                        <li key={p}><CheckCircle size={13} /> {p}</li>
                    ))}
                </ul>
                {casino.cons.length > 0 && (
                    <ul className="cons-list">
                        <li><XCircle size={13} /> {casino.cons[0]}</li>
                    </ul>
                )}
            </div>

            <div className="card-actions">
                <a
                    href={`/go/${casino.slug}`}
                    className="btn-casino-primary"
                    target="_blank"
                    rel="nofollow noopener"
                    style={{ '--btn-color': casino.color }}
                    id={`cta-${casino.slug}`}
                >
                    Réclamer le bonus {casino.bonus} <ExternalLink size={16} />
                </a>
                <Link to={`/casino/${casino.slug}`} className="btn-casino-secondary">
                    Lire la revue complète →
                </Link>
            </div>

            <p className="card-disclaimer">18+ · Jouez responsablement · Liens affiliés</p>
        </div>
    )
}
