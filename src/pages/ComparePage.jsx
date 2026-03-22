import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Star, CheckCircle, XCircle, ExternalLink, ChevronDown, GitCompareArrows } from 'lucide-react'
import { casinos } from '../data/casinos'
import SEOMeta from '../components/SEOMeta'

function RatingBar({ value, color }) {
    return (
        <div className="compare-bar-track">
            <motion.div
                className="compare-bar-fill"
                style={{ background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${(value / 5) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            />
        </div>
    )
}

function CasinoSelector({ selected, onChange, otherId, label }) {
    return (
        <div className="compare-selector">
            <label className="compare-selector-label">{label}</label>
            <div className="compare-select-wrap">
                <select
                    value={selected}
                    onChange={e => onChange(e.target.value)}
                    className="compare-select"
                    id={`compare-select-${label.toLowerCase().replace(/\s/g, '-')}`}
                >
                    <option value="">Choisir un casino</option>
                    {casinos.map(c => (
                        <option key={c.slug} value={c.slug} disabled={c.slug === otherId}>
                            {c.logo} {c.name} — {c.bonus}
                        </option>
                    ))}
                </select>
                <ChevronDown size={16} className="compare-select-icon" />
            </div>
        </div>
    )
}

const ratingCategories = [
    'Bonus & Promotions',
    'Jeux disponibles',
    'Paiements & Retraits',
    'Interface & Mobile',
    'Sécurité & Licence',
    'Support client',
]

function deriveSubRating(baseRating, index) {
    const offsets = [1.02, 0.98, 1.01, 0.97, 0.99, 0.96]
    return Math.min(5, baseRating * offsets[index])
}

export default function ComparePage() {
    const [slugA, setSlugA] = useState(casinos[0]?.slug || '')
    const [slugB, setSlugB] = useState(casinos[1]?.slug || '')

    const casinoA = casinos.find(c => c.slug === slugA) || null
    const casinoB = casinos.find(c => c.slug === slugB) || null

    const both = casinoA && casinoB

    return (
        <div className="compare-page">
            <SEOMeta
                title="Comparer les Casinos en Ligne Québec 2026"
                description="Comparez les meilleurs casinos en ligne pour les Québécois côte à côte. Bonus, jeux, paiements, avis — trouvez le casino parfait pour vous."
                canonical="/comparer"
            />

            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">
                        <GitCompareArrows size={14} /> Outil de comparaison
                    </div>
                    <h1 className="page-hero-title">
                        Comparez les <span className="highlight">Casinos</span> côte à côte
                    </h1>
                    <p className="page-hero-sub">
                        Sélectionnez deux casinos pour comparer leurs bonus, jeux, paiements et notes en un coup d'œil.
                    </p>
                </div>
            </section>

            {/* Selectors */}
            <div className="compare-selectors-bar">
                <div className="container">
                    <div className="compare-selectors-row">
                        <CasinoSelector
                            selected={slugA}
                            onChange={setSlugA}
                            otherId={slugB}
                            label="Casino A"
                        />
                        <div className="compare-vs">VS</div>
                        <CasinoSelector
                            selected={slugB}
                            onChange={setSlugB}
                            otherId={slugA}
                            label="Casino B"
                        />
                    </div>
                </div>
            </div>

            {/* Comparison Content */}
            {both && (
                <motion.section
                    className="compare-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={`${slugA}-${slugB}`}
                    transition={{ duration: 0.4 }}
                >
                    <div className="container">

                        {/* Overview Cards */}
                        <div className="compare-overview-grid">
                            {[casinoA, casinoB].map(casino => (
                                <div className="compare-overview-card" key={casino.slug}>
                                    <div className="compare-ov-logo" style={{ background: casino.color + '22' }}>
                                        <span>{casino.logo}</span>
                                    </div>
                                    <h2 className="compare-ov-name">{casino.name}</h2>
                                    <p className="compare-ov-tagline">{casino.tagline}</p>
                                    <div className="compare-ov-rating">
                                        <Star size={16} fill="#f59e0b" stroke="#f59e0b" />
                                        <span className="compare-ov-rating-num">{casino.rating.toFixed(1)}</span>
                                        <span className="compare-ov-rating-label">/ 5</span>
                                    </div>
                                    <div className="compare-ov-bonus" style={{ color: casino.color }}>
                                        {casino.bonus}
                                    </div>
                                    <p className="compare-ov-bonus-detail">{casino.bonusDetail}</p>
                                    <a
                                        href={`/go/${casino.slug}`}
                                        className="compare-ov-cta"
                                        target="_blank"
                                        rel="nofollow noopener"
                                        style={{ background: casino.color }}
                                    >
                                        Réclamer le bonus <ExternalLink size={14} />
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Comparison Table */}
                        <div className="compare-table-section">
                            <h2 className="section-title">Comparaison détaillée</h2>
                            <div className="table-wrap">
                                <table className="comparison-table compare-dual-table">
                                    <thead>
                                        <tr>
                                            <th>Critère</th>
                                            <th style={{ color: casinoA.color }}>{casinoA.logo} {casinoA.name}</th>
                                            <th style={{ color: casinoB.color }}>{casinoB.logo} {casinoB.name}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>⭐ Note globale</td>
                                            <td><strong style={{ color: casinoA.color }}>{casinoA.rating}/5</strong></td>
                                            <td><strong style={{ color: casinoB.color }}>{casinoB.rating}/5</strong></td>
                                        </tr>
                                        <tr>
                                            <td>🎁 Bonus</td>
                                            <td className="td-bonus">{casinoA.bonus}</td>
                                            <td className="td-bonus">{casinoB.bonus}</td>
                                        </tr>
                                        <tr>
                                            <td>💳 Dépôt min.</td>
                                            <td>{casinoA.minDeposit}</td>
                                            <td>{casinoB.minDeposit}</td>
                                        </tr>
                                        <tr>
                                            <td>⚡ Retrait</td>
                                            <td>{casinoA.withdrawalTime}</td>
                                            <td>{casinoB.withdrawalTime}</td>
                                        </tr>
                                        <tr>
                                            <td>🛡️ Licence</td>
                                            <td>{casinoA.licenseText}</td>
                                            <td>{casinoB.licenseText}</td>
                                        </tr>
                                        <tr>
                                            <td>🎰 Machines à sous</td>
                                            <td><strong>{casinoA.games.slots}+</strong></td>
                                            <td><strong>{casinoB.games.slots}+</strong></td>
                                        </tr>
                                        <tr>
                                            <td>🃏 Jeux de table</td>
                                            <td>{casinoA.games.tableGames}+</td>
                                            <td>{casinoB.games.tableGames}+</td>
                                        </tr>
                                        <tr>
                                            <td>📺 Casino live</td>
                                            <td>{casinoA.games.liveDealer}+</td>
                                            <td>{casinoB.games.liveDealer}+</td>
                                        </tr>
                                        <tr>
                                            <td>💳 Paiements</td>
                                            <td>{casinoA.paymentMethods.slice(0, 3).join(', ')}</td>
                                            <td>{casinoB.paymentMethods.slice(0, 3).join(', ')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="compare-ratings-section">
                            <h2 className="section-title">Évaluation par catégorie</h2>
                            <div className="compare-ratings-grid">
                                {ratingCategories.map((cat, i) => {
                                    const valA = deriveSubRating(casinoA.rating, i)
                                    const valB = deriveSubRating(casinoB.rating, i)
                                    return (
                                        <div key={cat} className="compare-rating-row">
                                            <span className="compare-rating-label">{cat}</span>
                                            <div className="compare-rating-bars">
                                                <div className="compare-rating-side">
                                                    <span className="compare-rating-val" style={{ color: casinoA.color }}>{valA.toFixed(1)}</span>
                                                    <RatingBar value={valA} color={casinoA.color} />
                                                </div>
                                                <div className="compare-rating-side">
                                                    <RatingBar value={valB} color={casinoB.color} />
                                                    <span className="compare-rating-val" style={{ color: casinoB.color }}>{valB.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="compare-pros-section">
                            <h2 className="section-title">Points forts & faibles</h2>
                            <div className="compare-pros-grid">
                                {[casinoA, casinoB].map(casino => (
                                    <div key={casino.slug} className="compare-pros-card">
                                        <h3 style={{ color: casino.color }}>{casino.logo} {casino.name}</h3>
                                        <div className="compare-pros-lists">
                                            <ul className="pros-list">
                                                {casino.pros.slice(0, 4).map(p => (
                                                    <li key={p}><CheckCircle size={13} /> {p}</li>
                                                ))}
                                            </ul>
                                            <ul className="cons-list">
                                                {casino.cons.map(c => (
                                                    <li key={c}><XCircle size={13} /> {c}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Final CTA */}
                        <div className="compare-final-cta">
                            <div className="compare-cta-card">
                                <div className="compare-cta-side" style={{ '--cta-color': casinoA.color }}>
                                    <span className="compare-cta-logo">{casinoA.logo}</span>
                                    <strong>{casinoA.name}</strong>
                                    <span className="compare-cta-bonus">{casinoA.bonus}</span>
                                    <a
                                        href={`/go/${casinoA.slug}`}
                                        className="compare-cta-btn"
                                        target="_blank"
                                        rel="nofollow noopener"
                                        style={{ background: casinoA.color }}
                                    >
                                        Jouer sur {casinoA.name} <ExternalLink size={14} />
                                    </a>
                                </div>
                                <div className="compare-cta-divider">VS</div>
                                <div className="compare-cta-side" style={{ '--cta-color': casinoB.color }}>
                                    <span className="compare-cta-logo">{casinoB.logo}</span>
                                    <strong>{casinoB.name}</strong>
                                    <span className="compare-cta-bonus">{casinoB.bonus}</span>
                                    <a
                                        href={`/go/${casinoB.slug}`}
                                        className="compare-cta-btn"
                                        target="_blank"
                                        rel="nofollow noopener"
                                        style={{ background: casinoB.color }}
                                    >
                                        Jouer sur {casinoB.name} <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>
                            <p className="compare-disclaimer">18+ · Jouez responsablement · Liens affiliés · Les bonus s'activent automatiquement via nos liens</p>
                        </div>
                    </div>
                </motion.section>
            )}

            {!both && (
                <div className="compare-empty">
                    <div className="container">
                        <div className="compare-empty-card">
                            <div className="compare-empty-icon">⚔️</div>
                            <h2>Sélectionnez deux casinos</h2>
                            <p>Utilisez les menus ci-dessus pour choisir deux casinos et voir leur comparaison détaillée.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
