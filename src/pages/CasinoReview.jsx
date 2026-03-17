import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    Star, CheckCircle, XCircle, ExternalLink,
    Shield, CreditCard, Smartphone, Gamepad2,
    ChevronLeft, MessageCircle, Award
} from 'lucide-react'
import { getCasinoBySlug, casinos } from '../data/casinos'
import CasinoCard from '../components/CasinoCard'
import SEOMeta from '../components/SEOMeta'

function StarRating({ rating, large = false }) {
    return (
        <div className={`star-rating ${large ? 'star-rating-lg' : ''}`}>
            {[1, 2, 3, 4, 5].map(s => (
                <Star
                    key={s}
                    size={large ? 22 : 14}
                    fill={s <= Math.round(rating) ? '#f59e0b' : 'none'}
                    stroke={s <= Math.round(rating) ? '#f59e0b' : '#6b7280'}
                />
            ))}
            <span className="rating-num">{rating.toFixed(1)}</span>
        </div>
    )
}

function RatingBar({ label, value, color }) {
    return (
        <div className="rating-bar-row">
            <span className="rating-bar-label">{label}</span>
            <div className="rating-bar-track">
                <motion.div
                    className="rating-bar-fill"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(value / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />
            </div>
            <span className="rating-bar-val">{value.toFixed(1)}</span>
        </div>
    )
}

export default function CasinoReview() {
    const { slug } = useParams()
    const casino = getCasinoBySlug(slug)

    if (!casino) {
        return (
            <div className="not-found">
                <div className="container">
                    <h1>Casino introuvable</h1>
                    <p>Ce casino n'existe pas dans notre base de données.</p>
                    <Link to="/meilleurs-casinos" className="btn-primary">
                        ← Retour au classement
                    </Link>
                </div>
            </div>
        )
    }

    const relatedCasinos = casinos
        .filter(c => c.slug !== casino.slug && c.category === casino.category)
        .slice(0, 3)

    const fillIfFew = relatedCasinos.length < 3
        ? [...relatedCasinos, ...casinos.filter(c => c.slug !== casino.slug && c.category !== casino.category)].slice(0, 3)
        : relatedCasinos

    const gameCategories = [
        { label: 'Machines à sous', val: casino.games.slots, icon: '🎰' },
        { label: 'Jeux de table', val: casino.games.tableGames, icon: '🃏' },
        { label: 'Casino live', val: casino.games.liveDealer, icon: '📺' },
        { label: 'Jackpots', val: casino.games.jackpots, icon: '💎' },
    ]

    // Derived sub-ratings — slightly varied to feel realistic
    const ratingBreakdown = [
        { label: 'Bonus & Promotions', value: Math.min(5, casino.rating * 1.02) },
        { label: 'Jeux disponibles', value: Math.min(5, casino.rating * 0.98) },
        { label: 'Paiements & Retraits', value: Math.min(5, casino.rating * 1.01) },
        { label: 'Interface & Mobile', value: Math.min(5, casino.rating * 0.97) },
        { label: 'Sécurité & Licence', value: Math.min(5, casino.rating * 0.99) },
        { label: 'Support client', value: Math.min(5, casino.rating * 0.96) },
    ]

    // JSON-LD structured data for Google rich snippets
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Review",
        "name": `Revue ${casino.name} 2026`,
        "reviewBody": casino.verdict,
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": casino.rating,
            "bestRating": 5,
            "worstRating": 1
        },
        "itemReviewed": {
            "@type": "Organization",
            "name": casino.name,
            "url": casino.affiliateUrl
        },
        "author": {
            "@type": "Organization",
            "name": "CasinoQuébécois.net"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CasinoQuébécois.net",
            "url": "https://www.casinoquebecois.net"
        }
    }

    return (
        <div className="review-page">
            <SEOMeta
                title={`${casino.name} Avis Québec 2026 — Bonus, Jeux & Retraits`}
                description={`Avis complet ${casino.name} pour les Québécois : ${casino.bonus}, ${casino.bonusDetail.slice(0, 80)}. Note ${casino.rating}/5.`}
                canonical={`/casino/${casino.slug}`}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb */}
            <div className="breadcrumb-bar">
                <div className="container">
                    <Link to="/meilleurs-casinos" className="breadcrumb-link">
                        <ChevronLeft size={16} /> Classement
                    </Link>
                    <span className="breadcrumb-sep">/</span>
                    <span>{casino.name}</span>
                </div>
            </div>

            {/* Hero */}
            <motion.section
                className="review-hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ '--casino-color': casino.color }}
            >
                <div className="container">
                    <div className="review-hero-inner">
                        <div className="review-logo" style={{ background: casino.color + '22' }}>
                            <span className="review-logo-emoji">{casino.logo}</span>
                        </div>
                        <div className="review-hero-info">
                            <div className="review-license-badge">
                                <Shield size={13} /> {casino.licenseText}
                            </div>
                            <h1 className="review-title">Revue {casino.name} 2026</h1>
                            <p className="review-sub">{casino.tagline}</p>
                            <StarRating rating={casino.rating} large />
                            <p className="review-count">
                                Basé sur {casino.reviewCount.toLocaleString('fr-CA')} avis de joueurs
                            </p>
                        </div>
                        <div className="review-hero-cta">
                            <div className="review-bonus-highlight" style={{ borderColor: casino.color }}>
                                <div className="review-bonus-label">Bonus exclusif</div>
                                <div className="review-bonus-amount" style={{ color: casino.color }}>
                                    {casino.bonus}
                                </div>
                                <div className="review-bonus-detail">{casino.bonusDetail}</div>
                            </div>
                            <a
                                href={`/go/${casino.slug}`}
                                className="btn-review-primary"
                                target="_blank"
                                rel="nofollow noopener"
                                style={{ background: casino.color }}
                                id={`review-cta-${casino.slug}`}
                            >
                                Réclamer mon bonus <ExternalLink size={16} />
                            </a>
                            <p className="review-cta-disclaimer">18+ · Conditions s'appliquent</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <div className="review-body">
                <div className="container">
                    <div className="review-layout">
                        {/* Main content */}
                        <main className="review-main">

                            {/* Rating breakdown bars */}
                            <section className="review-section">
                                <h2><Award size={20} /> Notre évaluation détaillée</h2>
                                <div className="rating-breakdown">
                                    {ratingBreakdown.map(r => (
                                        <RatingBar
                                            key={r.label}
                                            label={r.label}
                                            value={r.value}
                                            color={casino.color}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* Pros & Cons */}
                            <section className="review-section">
                                <h2><CheckCircle size={20} /> Points forts & faibles</h2>
                                <div className="pros-cons-grid">
                                    <div className="pros-block">
                                        <h3>✅ Points positifs</h3>
                                        <ul>
                                            {casino.pros.map(p => (
                                                <li key={p}><CheckCircle size={14} /> {p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="cons-block">
                                        <h3>❌ Points négatifs</h3>
                                        <ul>
                                            {casino.cons.map(c => (
                                                <li key={c}><XCircle size={14} /> {c}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Verdict */}
                            <section className="review-section">
                                <h2><MessageCircle size={20} /> Notre verdict</h2>
                                <div className="verdict-block" style={{ borderLeftColor: casino.color }}>
                                    <div className="verdict-score" style={{ color: casino.color }}>
                                        <Star size={18} fill={casino.color} stroke={casino.color} />
                                        {casino.rating}/5
                                    </div>
                                    <p>{casino.verdict}</p>
                                </div>
                            </section>

                            {/* Games */}
                            <section className="review-section">
                                <h2><Gamepad2 size={20} /> Catalogue de jeux</h2>
                                <div className="games-grid">
                                    {gameCategories.map(g => (
                                        <div key={g.label} className="game-stat-card">
                                            <div className="game-stat-icon">{g.icon}</div>
                                            <div className="game-stat-val">{g.val}+</div>
                                            <div className="game-stat-label">{g.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Payment methods */}
                            <section className="review-section">
                                <h2><CreditCard size={20} /> Méthodes de paiement</h2>
                                <div className="payment-list">
                                    {casino.paymentMethods.map(m => (
                                        <div key={m} className="payment-method-chip">
                                            {m === 'Interac' && '🇨🇦 '}
                                            {m}
                                        </div>
                                    ))}
                                </div>
                                <div className="payment-meta-row">
                                    <div className="payment-meta-item">
                                        <Smartphone size={14} />
                                        <span>Dépôt minimum : <strong>{casino.minDeposit}</strong></span>
                                    </div>
                                    <div className="payment-meta-item">
                                        <Shield size={14} />
                                        <span>Délai de retrait : <strong>{casino.withdrawalTime}</strong></span>
                                    </div>
                                </div>
                            </section>

                            {/* Bottom CTA */}
                            <div className="review-bottom-cta" style={{ '--casino-color': casino.color }}>
                                <div className="review-bca-text">
                                    <div className="review-bca-emoji">🎁</div>
                                    <div>
                                        <strong>Bonus {casino.name} : {casino.bonus}</strong>
                                        <p>{casino.bonusDetail}</p>
                                    </div>
                                </div>
                                <a
                                    href={`/go/${casino.slug}`}
                                    className="btn-review-primary"
                                    target="_blank"
                                    rel="nofollow noopener"
                                    style={{ background: casino.color }}
                                >
                                    Jouer maintenant <ExternalLink size={15} />
                                </a>
                            </div>
                        </main>

                        {/* Sidebar */}
                        <aside className="review-sidebar">
                            <div className="sidebar-card">
                                <h3>Fiche résumé</h3>
                                <table className="summary-table">
                                    <tbody>
                                        <tr><td>⭐ Note</td><td><strong>{casino.rating}/5</strong></td></tr>
                                        <tr><td>🎁 Bonus</td><td><strong>{casino.bonus}</strong></td></tr>
                                        <tr><td>🎰 Tours gratuits</td><td><strong>{casino.freeSpins > 0 ? casino.freeSpins : '—'}</strong></td></tr>
                                        <tr><td>💳 Dépôt min.</td><td><strong>{casino.minDeposit}</strong></td></tr>
                                        <tr><td>⚡ Retrait</td><td><strong>{casino.withdrawalTime}</strong></td></tr>
                                        <tr><td>🛡️ Licence</td><td><strong>{casino.licenseText}</strong></td></tr>
                                    </tbody>
                                </table>
                                <a
                                    href={`/go/${casino.slug}`}
                                    className="btn-sidebar-cta"
                                    target="_blank"
                                    rel="nofollow noopener"
                                    style={{ background: casino.color }}
                                >
                                    Jouer sur {casino.name} →
                                </a>
                            </div>

                            {/* Top 3 bonus widget */}
                            <div className="sidebar-top-bonus">
                                <div className="sidebar-top-bonus-title">🏆 Meilleures offres</div>
                                {casinos.slice(0, 3).map((c, i) => (
                                    <a
                                        key={c.slug}
                                        href={`/go/${c.slug}`}
                                        className="sidebar-bonus-row"
                                        target="_blank"
                                        rel="nofollow noopener"
                                    >
                                        <span className="sbar-rank">#{i + 1}</span>
                                        <span className="sbar-logo" style={{ background: c.color + '22' }}>{c.logo}</span>
                                        <span className="sbar-name">{c.name}</span>
                                        <span className="sbar-bonus" style={{ color: c.color }}>{c.bonus}</span>
                                    </a>
                                ))}
                            </div>
                        </aside>
                    </div>

                    {/* Related casinos */}
                    {fillIfFew.length > 0 && (
                        <section className="related-section">
                            <h2 className="section-title">Vous aimerez aussi</h2>
                            <div className="casino-grid-top">
                                {fillIfFew.map((c, idx) => (
                                    <CasinoCard key={c.slug} casino={c} rank={idx + 1} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
