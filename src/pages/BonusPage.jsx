import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, ExternalLink, Star, Zap, ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { casinos } from '../data/casinos'
import { Link } from 'react-router-dom'

const bonusTypes = [
    { id: 'all', label: 'Tous les bonus' },
    { id: 'welcome', label: 'Bienvenue' },
    { id: 'spins', label: 'Tours gratuits' },
    { id: 'nodeposit', label: 'Sans dépôt' },
]

function BonusCard({ casino, index }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            className={`bonus-card ${index === 0 ? 'bonus-card-featured' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            style={{ '--casino-color': casino.color }}
        >
            {index === 0 && <div className="bonus-featured-badge">🏆 Meilleur bonus du mois</div>}

            <div className="bonus-card-header">
                <div className="bonus-logo" style={{ background: casino.color + '22' }}>
                    {casino.logo}
                </div>
                <div className="bonus-info">
                    <div className="bonus-casino-name">{casino.name}</div>
                    <div className="bonus-amount-big" style={{ color: casino.color }}>
                        {casino.bonus}
                    </div>
                    <div className="bonus-detail-text">{casino.bonusDetail}</div>
                </div>
                <div className="bonus-rating">
                    <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                    <span>{casino.rating}</span>
                </div>
            </div>

            {casino.freeSpins > 0 && (
                <div className="bonus-spins-row">
                    <Zap size={14} />
                    <span>{casino.freeSpins} tours gratuits inclus</span>
                </div>
            )}

            <div className="bonus-chips-row">
                {casino.paymentMethods.slice(0, 3).map(m => (
                    <span key={m} className="bonus-payment-chip">{m}</span>
                ))}
                {casino.hasFreeTrial && (
                    <span className="bonus-nodeposit-chip">🎁 Pas de dépôt requis</span>
                )}
            </div>

            <button
                className="bonus-expand-btn"
                onClick={() => setExpanded(e => !e)}
            >
                {expanded ? 'Masquer les détails' : 'Voir les conditions'}
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {expanded && (
                <motion.div
                    className="bonus-terms"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                >
                    <ul>
                        <li>✅ Dépôt minimum : {casino.minDeposit}</li>
                        <li>✅ Retrait : {casino.withdrawalTime}</li>
                        <li>✅ Licence : {casino.licenseText}</li>
                        <li>⚠️ Conditions de mise : ×70 (typique du marché)</li>
                        <li>ℹ️ Valable 30 jours après activation</li>
                    </ul>
                </motion.div>
            )}

            <div className="bonus-card-actions">
                <a
                    href={`/go/${casino.slug}`}
                    className="btn-bonus-primary"
                    target="_blank"
                    rel="nofollow noopener"
                    style={{ background: casino.color }}
                    id={`bonus-cta-${casino.slug}`}
                >
                    Réclamer {casino.bonus} <ExternalLink size={15} />
                </a>
                <Link to={`/casino/${casino.slug}`} className="btn-bonus-secondary">
                    Lire la revue
                </Link>
            </div>
            <p className="bonus-disclaimer">18+ · Le bonus s'active automatiquement via ce lien · Jouez responsablement</p>
        </motion.div>
    )
}

export default function BonusPage() {
    const [filter, setFilter] = useState('all')

    const filtered = casinos.filter(c => {
        if (filter === 'all') return true
        if (filter === 'spins') return c.freeSpins > 0
        if (filter === 'nodeposit') return c.hasFreeTrial
        return true
    })

    const totalBonus = casinos.reduce((sum, c) => sum + parseFloat(c.bonus.replace(/\s/g, '').replace(',', '.')), 0)

    return (
        <div className="bonus-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge"><Gift size={14} /> Bonus exclusifs 2026</div>
                    <h1 className="page-hero-title">
                        Tous les <span className="highlight">Bonus Casino</span> pour Québécois
                    </h1>
                    <p className="page-hero-sub">
                        Plus de {totalBonus.toLocaleString('fr-CA')} $ en bonus cumulés. Aucun code promo — s'active automatiquement via nos liens.
                    </p>

                    <div className="bonus-hero-tags">
                        {['✅ Bonus vérifiés', '🇨🇦 Interac accepté', '⚡ Activé en 2 min', '🔒 Casinos licenciés'].map(tag => (
                            <span key={tag} className="bonus-hero-tag">{tag}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter */}
            <div className="filter-bar">
                <div className="container">
                    <div className="filter-row">
                        <span className="filter-label"><Filter size={14} /> Type de bonus :</span>
                        <div className="filter-chips">
                            {bonusTypes.map(t => (
                                <button
                                    key={t.id}
                                    className={`filter-chip ${filter === t.id ? 'active' : ''}`}
                                    onClick={() => setFilter(t.id)}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bonus list */}
            <section className="bonus-list-section">
                <div className="container">
                    <p className="bonus-count-label">
                        {filtered.length} bonus disponible{filtered.length > 1 ? 's' : ''}
                    </p>
                    <div className="bonus-list">
                        {filtered.map((casino, idx) => (
                            <BonusCard key={casino.slug} casino={casino} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bonus-faq-section">
                <div className="container">
                    <h2 className="section-title">Questions fréquentes sur les bonus</h2>
                    <div className="faq-grid">
                        {[
                            {
                                q: 'Comment réclamer un bonus de bienvenue ?',
                                a: 'Cliquez sur le bouton "Réclamer" de votre casino préféré. Inscrivez-vous et effectuez votre premier dépôt. Le bonus s\'active automatiquement — aucun code promo nécessaire sur nos liens.'
                            },
                            {
                                q: 'C\'est quoi les conditions de mise (wagering) ?',
                                a: 'Les conditions de mise indiquent combien de fois vous devez jouer le montant du bonus avant de pouvoir retirer vos gains. Ex: 1 000 $ × 70 = 70 000 $ à miser. Cherchez des conditions de mise plus basses pour plus de chances de retirer.'
                            },
                            {
                                q: 'Puis-je utiliser Interac pour les dépôts ?',
                                a: 'Oui ! La majorité de nos casinos recommandés acceptent Interac en ligne, la méthode préférée des Québécois pour sa rapidité et sa sécurité. Vérifiez la fiche de chaque casino pour confirmer.'
                            },
                            {
                                q: 'Les casinos en ligne sont-ils légaux au Québec ?',
                                a: 'Oui. Les sites de casino étrangers détenant une licence valide (MGA de Malte, Gibraltar, Kahnawake) peuvent opérer légalement et accueillir des joueurs québécois. Espace jeux de Loto-Québec est l\'alternative provinciale.'
                            },
                        ].map(faq => (
                            <div key={faq.q} className="faq-card">
                                <h3>{faq.q}</h3>
                                <p>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
