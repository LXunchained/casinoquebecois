import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Star, Zap, Trophy, Gift, CheckCircle, Users, BookOpen, TrendingUp } from 'lucide-react'
import { casinos } from '../data/casinos'
import CasinoCard from '../components/CasinoCard'
import SEOMeta from '../components/SEOMeta'

const fadeUp = { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
const stagger = { animate: { transition: { staggerChildren: 0.1 } } }

const trustBadges = [
    { icon: Shield, label: 'Casinos licenciés' },
    { icon: Star, label: 'Revues indépendantes' },
    { icon: Zap, label: 'Bonus vérifiés' },
    { icon: Trophy, label: 'Top 5 sélectionnés' },
]

const topCasinos = casinos.filter(c => c.badge).slice(0, 3)

// Animated counter hook
function useCounter(target, duration = 1800, start = false) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        if (!start) return
        let startTime = null
        const step = (ts) => {
            if (!startTime) startTime = ts
            const progress = Math.min((ts - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setVal(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [start, target, duration])
    return val
}

function AnimatedStat({ value, suffix = '', label, started }) {
    const num = useCounter(value, 1600, started)
    return (
        <div className="stat-item">
            <div className="stat-val">{num.toLocaleString('fr-CA')}{suffix}</div>
            <div className="stat-label">{label}</div>
        </div>
    )
}

const WHY_TRUST = [
    {
        icon: '🔍',
        title: 'Tests réels, pas de publicité déguisée',
        desc: 'Chaque casino est testé manuellement : dépôt, jeu, retrait. Nos avis reflètent la réalité — on signale les problèmes même avec nos partenaires.',
    },
    {
        icon: '📋',
        title: 'Vérification des licences',
        desc: 'On vérifie chaque licence directement sur le registre de la Gaming Authority. Aucun casino sans licence valide n\'apparaît dans nos classements.',
    },
    {
        icon: '🇨🇦',
        title: 'Spécifique aux joueurs québécois',
        desc: 'Méthodes de paiement Interac, interface en français, support CAD, et contexte juridique canadien — tout est évalué pour vous.',
    },
    {
        icon: '🔄',
        title: 'Mis à jour chaque semaine',
        desc: 'Les conditions changent, les bonus expirent. Notre équipe re-vérifie chaque casino chaque semaine pour garantir la précision de nos informations.',
    },
]

export default function Home() {
    const statsRef = useRef(null)
    const [statsVisible, setStatsVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
            { threshold: 0.3 }
        )
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div className="home">
            <SEOMeta
                title="Meilleurs Casinos en Ligne au Québec 2026"
                description="Découvrez les meilleurs casinos en ligne pour joueurs québécois. Comparatif 2026, bonus exclusifs, revues honnêtes. Stake, BC.Game, Gamdom et plus."
                canonical="/"
            />

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

            {/* Animated Stats bar */}
            <section className="stats-bar" ref={statsRef}>
                <div className="container">
                    <div className="stats-row">
                        <AnimatedStat value={5} suffix="+" label="Casinos testés" started={statsVisible} />
                        <AnimatedStat value={20000} suffix=" $" label="Bonus max disponible" started={statsVisible} />
                        <AnimatedStat value={10} suffix="+" label="Guides rédigés" started={statsVisible} />
                        <AnimatedStat value={100} suffix="%" label="Casinos licenciés" started={statsVisible} />
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

            {/* Why trust us */}
            <section className="why-trust-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge">
                            <Shield size={14} /> Notre engagement
                        </div>
                        <h2 className="section-title">Pourquoi faire confiance à CasinoQuébécois ?</h2>
                        <p className="section-sub">
                            Indépendants, honnêtes, et 100% dédiés aux joueurs du Québec depuis le lancement.
                        </p>
                    </div>
                    <div className="why-trust-grid">
                        {WHY_TRUST.map(w => (
                            <motion.div
                                key={w.title}
                                className="why-trust-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="why-trust-icon">{w.icon}</div>
                                <h3>{w.title}</h3>
                                <p>{w.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick links to guides */}
            <section className="home-guides-section">
                <div className="container">
                    <div className="section-header">
                        <div className="section-badge"><BookOpen size={14} /> Nos guides</div>
                        <h2 className="section-title">Tout ce qu'il faut savoir</h2>
                    </div>
                    <div className="home-guides-grid">
                        {[
                            { emoji: '⚖️', title: 'Rakeback vs Bonus — Lequel choisir?', slug: 'rakeback-vs-bonus-bienvenue', badge: 'Nouveau' },
                            { emoji: '⚡', title: 'Stake Casino au Québec — Est-ce légal?', slug: 'stake-casino-quebec-legal', badge: null },
                            { emoji: '⚔️', title: 'Gamdom vs Rollbit 2026 — Comparaison', slug: 'gamdom-vs-rollbit-2026', badge: 'Nouveau' },
                            { emoji: '₿', title: 'Guide Bitcoin Casino Canada 2026', slug: 'casino-bitcoin-canada-guide', badge: null },
                        ].map(g => (
                            <Link key={g.slug} to={`/guide/${g.slug}`} className="home-guide-card">
                                <span className="hgc-emoji">{g.emoji}</span>
                                <span className="hgc-title">{g.title}</span>
                                {g.badge && <span className="hgc-badge">{g.badge}</span>}
                                <ArrowRight size={14} className="hgc-arrow" />
                            </Link>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <Link to="/guide" className="see-all-link">
                            Voir tous les guides <ArrowRight size={16} />
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
                            { n: '01', title: 'Licence & Sécurité', desc: 'Nous vérifions que chaque casino possède une licence valide (Curaçao, MGA, Kahnawake).' },
                            { n: '02', title: 'Bonus & Conditions', desc: 'On lit les petits caractères — exigences de mise, durée de validité, jeux exclus.' },
                            { n: '03', title: 'Paiements', desc: 'On teste les retraits : rapidité, méthodes disponibles (Bitcoin, Interac), limites min/max.' },
                            { n: '04', title: 'Jeux & Logiciels', desc: 'Qualité des jeux, fournisseurs (Pragmatic, Evolution), catalogue slots et live.' },
                            { n: '05', title: 'Service Client', desc: 'Test du chat en direct, disponibilité 24/7, qualité du support en français.' },
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
