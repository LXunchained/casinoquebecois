import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Trophy, Star } from 'lucide-react'
import { casinos, categories } from '../data/casinos'
import CasinoCard from '../components/CasinoCard'
import SEOMeta from '../components/SEOMeta'

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, transition: { duration: 0.4 } }

export default function Classement() {
    const [activeCategory, setActiveCategory] = useState('all')

    const filtered = activeCategory === 'all'
        ? casinos
        : casinos.filter(c => c.category === activeCategory)

    return (
        <div className="classement-page">
            <SEOMeta
                title="Classement Meilleurs Casinos en Ligne Québec 2026"
                description="Classement complet des meilleurs casinos en ligne pour les Québécois. Filtres par catégorie, tableau comparatif, bonus vérifiés. Mis à jour mars 2026."
                canonical="/meilleurs-casinos"
            />
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge"><Trophy size={14} /> Classement 2026</div>
                    <h1 className="page-hero-title">
                        Les Meilleurs <span className="highlight">Casinos en Ligne</span> au Québec
                    </h1>
                    <p className="page-hero-sub">
                        {casinos.length} casinos testés et comparés par notre équipe. Mis à jour cette semaine.
                    </p>

                    {/* Stats row */}
                    <div className="classement-stats">
                        {[
                            { val: casinos.length, label: 'Casinos testés' },
                            { val: Math.max(...casinos.map(c => { const m = c.bonus.match(/[\d\s]+/); return m ? parseFloat(m[0].replace(/\s/g, '')) : 0; })).toLocaleString('fr-CA') + ' $+', label: 'Bonus max' },
                            { val: casinos.filter(c => c.hasFreeTrial).length, label: 'Offres sans dépôt' },
                            { val: (casinos.reduce((a, c) => a + c.rating, 0) / casinos.length).toFixed(1) + '/5', label: 'Note moyenne' },
                        ].map(s => (
                            <div key={s.label} className="classement-stat">
                                <div className="cstat-val">{s.val}</div>
                                <div className="cstat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Filter bar */}
            <div className="filter-bar">
                <div className="container">
                    <div className="filter-row">
                        <span className="filter-label"><Filter size={14} /> Filtrer :</span>
                        <div className="filter-chips">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    className={`filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    {cat.label}
                                    <span className="chip-count">
                                        {cat.id === 'all' ? casinos.length : casinos.filter(c => c.category === cat.id).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Casino cards */}
            <section className="classement-list">
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial="initial" animate="animate" exit="exit"
                            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
                            className="casino-list"
                        >
                            {filtered.map((casino, idx) => (
                                <motion.div key={casino.slug} variants={fadeUp}>
                                    <CasinoCard casino={casino} rank={idx + 1} featured={idx === 0 && activeCategory === 'all'} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {filtered.length === 0 && (
                        <div className="empty-state">
                            <Star size={40} />
                            <p>Aucun casino dans cette catégorie pour le moment.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Comparison table */}
            <section className="comparison-section">
                <div className="container">
                    <h2 className="section-title">Tableau comparatif rapide</h2>
                    <div className="table-wrap">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Casino</th>
                                    <th>Note</th>
                                    <th>Bonus</th>
                                    <th>Tours</th>
                                    <th>Dépôt min.</th>
                                    <th>Retrait</th>
                                    <th>Interac</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {casinos.map((c, i) => (
                                    <tr key={c.slug} className={i === 0 ? 'tr-featured' : ''}>
                                        <td>
                                            <div className="table-casino-name">
                                                <span>{c.logo}</span>
                                                <span>{c.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="table-rating">
                                                <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
                                                {c.rating}
                                            </div>
                                        </td>
                                        <td className="td-bonus">{c.bonus}</td>
                                        <td>{c.freeSpins > 0 ? `${c.freeSpins} FS` : '—'}</td>
                                        <td>{c.minDeposit}</td>
                                        <td>{c.withdrawalTime}</td>
                                        <td>{c.paymentMethods.includes('Interac') ? '✅' : '❌'}</td>
                                        <td>
                                            <a href={`/go/${c.slug}`} className="table-cta" target="_blank" rel="nofollow noopener">
                                                Jouer →
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
