import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Star, Zap, Trophy, Gift } from 'lucide-react'
import { casinos } from '../data/casinos'
import CasinoCard from '../components/CasinoCard'

const fadeUp = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

const trustBadges = [
    { icon: Shield, label: 'Casinos licenciés' },
    { icon: Star, label: 'Revues indépendantes' },
    { icon: Zap, label: 'Bonus vérifiés' },
    { icon: Trophy, label: 'Top 5 sélectionnés' },
]

const topCasinos = casinos.filter(c => c.badge).slice(0, 3)

export default function Home() {
    return (
        <div className="home">

            {/* Hero */}
            <motion.section
                className="hero"
                initial="initial" animate="animate" variants={stagger}
            >
                <div className="container">
                    <motion.div variants={fadeUp} className="hero-badge">
                        <span className="badge-dot" />
                        Guide 2026 — Mis à jour cette semaine
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="hero-title">
                        Les Meilleurs Casinos<br />
                        <span className="hero-title-highlight">en Ligne au Québec</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="hero-sub">
                        Notre équipe teste chaque casino pour vous — licences, bonus, retraits et service client.
                        <strong> Que des casinos vérifiés,</strong> que des avis honnêtes.
                    </motion.p>

                    <motion.div variants={fadeUp} className="hero-actions">
                        <Link to="/meilleurs-casinos" className="btn-primary">
                            Voir le Classement 2026 <ArrowRight size={20} />
                        </Link>
                        <Link to="/bonus" className="btn-secondary">
                            <Gift size={18} /> Tous les Bonus
                        </Link>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div variants={fadeUp} className="trust-badges">
                        {trustBadges.map(b => (
                            <div key={b.label} className="trust-badge">
                                <b.icon size={16} />
                                <span>{b.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hero decoration */}
                <div className="hero-glow" aria-hidden="true" />
                <div className="hero-chips" aria-hidden="true">
                    {['🃏', '🎲', '🎰', '💎', '🍀'].map((e, i) => (
                        <span key={i} className={`chip chip-${i}`}>{e}</span>
                    ))}
                </div>
            </motion.section>

            {/* Stats bar */}
            <section className="stats-bar">
                <div className="container">
                    <div className="stats-row">
                        {[
                            { val: casinos.length + '+', label: 'Casinos testés' },
                            { val: Math.max(...casinos.map(c => parseFloat(c.bonus))) + ' $', label: 'Bonus max disponible' },
                            { val: '100%', label: 'Casinos licenciés' },
                            { val: '18+', label: 'Jeu responsable' },
                        ].map(s => (
                            <div key={s.label} className="stat-item">
                                <div className="stat-val">{s.val}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top 3 Cards */}
            <section className="top-picks-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            <Trophy size={14} />
                            Top Picks de notre équipe
                        </div>
                        <h2 className="section-title">Nos 3 Coups de Cœur</h2>
                        <p className="section-sub">
                            Sélectionnés pour leur bonus, leur fiabilité et leur service en français.
                        </p>
                    </div>

                    <div className="casino-grid-top">
                        {topCasinos.map((casino, idx) => (
                            <CasinoCard key={casino.slug} casino={casino} rank={idx + 1} featured={idx === 0} />
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link to="/meilleurs-casinos" className="see-all-link">
                            Voir le classement complet <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How we rate */}
            <section className="how-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Comment on sélectionne nos casinos ?</h2>
                        <p className="section-sub">Notre processus de vérification en 5 étapes</p>
                    </div>
                    <div className="how-grid">
                        {[
                            { n: '01', title: 'Licence & Sécurité', desc: 'Nous vérifions que chaque casino possède une licence valide (MGA, Kahnawake, Gibraltar).' },
                            { n: '02', title: 'Bonus & Conditions', desc: 'On lit les petits caractères — exigences de mise, durée de validité, jeux exclus.' },
                            { n: '03', title: 'Paiements', desc: 'On teste les retraits : rapidité, méthodes disponibles (Interac, Visa), limites min/max.' },
                            { n: '04', title: 'Jeux & Logiciels', desc: 'Qualité des jeux, fournisseurs (Microgaming, NetEnt, Evolution), catalogue complet.' },
                            { n: '05', title: 'Service Client', desc: 'Test du chat en direct, disponibilité 24/7, qualité du français au Québec.' },
                        ].map(step => (
                            <div key={step.n} className="how-card">
                                <div className="how-number">{step.n}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA bottom */}
            <section className="home-cta-section">
                <div className="container">
                    <motion.div
                        className="home-cta-card"
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    >
                        <div className="home-cta-glow" />
                        <div className="home-cta-emoji">🎁</div>
                        <h2>Prêt à réclamer votre bonus ?</h2>
                        <p>Tous nos casinos offrent des bonus exclusifs aux joueurs québécois. Aucun code promo nécessaire — le bonus s'active automatiquement via nos liens.</p>
                        <Link to="/meilleurs-casinos" className="btn-primary" style={{ alignSelf: 'center' }}>
                            Voir les bonus disponibles <ArrowRight size={18} />
                        </Link>
                        <p className="home-cta-disclaimer">18+ uniquement. Jouez de façon responsable. Ces liens sont affiliés.</p>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
