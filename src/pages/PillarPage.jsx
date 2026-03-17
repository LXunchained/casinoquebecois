import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Star, BookOpen, ArrowRight, CheckCircle, TrendingUp, Award } from 'lucide-react'
import { casinos } from '../data/casinos'
import { guides } from '../data/guides'
import SEOMeta from '../components/SEOMeta'

const PILLAR_GUIDES = [
    'stake-casino-quebec-legal',
    'gamdom-avis-quebec-2026',
    'rakeback-vs-bonus-bienvenue',
    'gamdom-vs-rollbit-2026',
    'casino-bitcoin-canada-guide',
    'stake-vs-bc-game-comparaison',
]

const FAQ = [
    { q: 'Les casinos crypto sont-ils légaux au Québec?', a: 'Dans la pratique, oui. Aucune loi fédérale canadienne n\'interdit explicitement aux citoyens de jouer sur des casinos étrangers en ligne. Ces plateformes opèrent sous licences internationales (Curaçao, Malta) et accueillent les joueurs québécois.' },
    { q: 'Qu\'est-ce que le rakeback?', a: 'Le rakeback est un remboursement automatique d\'un % de vos mises, sans condition. C\'est différent d\'un bonus de bienvenue : vous recevez ces fonds continuellement, au fil de votre jeu, sans wagering requis.' },
    { q: 'Comment déposer avec Bitcoin au casino?', a: 'Achetez du BTC sur une plateforme comme Shakepay ou Bitbuy, créez un compte sur le casino, copiez l\'adresse de dépôt BTC du casino, et envoyez le montant depuis votre portefeuille. Le dépôt arrive en 10-30 minutes.' },
    { q: 'Quel casino offre le meilleur bonus en 2026?', a: 'Pour les joueurs réguliers : Stake avec son rakeback automatique (aucun wagering). Pour le gros bonus de bienvenue : BC.Game (jusqu\'à 20 000 USD). Pour le gaming et les skins CS2 : Gamdom avec son rain bonus communautaire.' },
]

export default function PillarPage() {
    const pillarGuides = guides.filter(g => PILLAR_GUIDES.includes(g.slug))

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Casino Crypto Québec 2026 — Guide Complet",
        "description": "Le guide complet des casinos crypto pour les Québécois : légalité, meilleurs bonus rakeback, Bitcoin, Ethereum, et comparatifs détaillés.",
        "url": "https://www.casinoquebecois.net/casino-crypto-quebec",
        "publisher": {
            "@type": "Organization",
            "name": "CasinoQuébécois.net",
            "url": "https://www.casinoquebecois.net"
        },
        "hasPart": casinos.map(c => ({
            "@type": "Review",
            "name": `Avis ${c.name}`,
            "url": `https://www.casinoquebecois.net/casino/${c.slug}`
        }))
    }

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQ.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
    }

    return (
        <div className="pillar-page">
            <SEOMeta
                title="Casino Crypto Québec 2026 — Guide Complet Bitcoin & Rakeback"
                description="Tout ce que vous devez savoir sur les casinos crypto au Québec : légalité, meilleurs bonus Bitcoin, rakeback automatique, Stake, BC.Game, Gamdom. Guides vérifiés 2026."
                canonical="/casino-crypto-quebec"
            />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            {/* Hero */}
            <section className="pillar-hero">
                <div className="container">
                    <motion.div
                        className="pillar-hero-content"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="pillar-badge">
                            <Shield size={14} /> Contenu vérifié — mis à jour mars 2026
                        </div>
                        <h1 className="pillar-title">
                            Casino Crypto <span className="highlight">Québec</span> 2026<br />
                            Le Guide Complet
                        </h1>
                        <p className="pillar-intro">
                            Tout ce qu'un joueur québécois doit savoir avant de déposer sur un casino crypto :
                            légalité, meilleurs bonus, rakeback automatique, Bitcoin, et comparatifs honnêtes.
                        </p>
                        <div className="pillar-trust-row">
                            <span>✅ Légalité expliquée</span>
                            <span>⚡ Meilleures offres 2026</span>
                            <span>🔒 Casinos vérifiés</span>
                            <span>🇨🇦 Joueurs québécois</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="pillar-toc-section">
                <div className="container">
                    <div className="pillar-toc">
                        <h2><BookOpen size={18} /> Dans ce guide</h2>
                        <div className="pillar-toc-grid">
                            <a href="#meilleurs-casinos">🏆 Les 3 meilleurs casinos crypto</a>
                            <a href="#legalite">⚖️ Légalité au Québec</a>
                            <a href="#rakeback">💰 Rakeback vs bonus bienvenue</a>
                            <a href="#comment-deposer">₿ Comment déposer en Bitcoin</a>
                            <a href="#guides">📖 Tous nos guides détaillés</a>
                            <a href="#faq">❓ FAQ joueurs québécois</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Casinos */}
            <section className="pillar-section" id="meilleurs-casinos">
                <div className="container">
                    <h2 className="pillar-section-title">
                        <Award size={22} /> Les 3 Meilleurs Casinos Crypto au Québec en 2026
                    </h2>
                    <p className="pillar-section-sub">
                        Sélectionnés selon : licence valide, délais de retrait, bonus sans conditions, et réputation dans la communauté québécoise.
                    </p>
                    <div className="pillar-casino-list">
                        {casinos.map((c, i) => (
                            <motion.div
                                key={c.slug}
                                className="pillar-casino-card"
                                style={{ '--accent': c.color }}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="pcc-rank" style={{ color: c.color }}>#{i + 1}</div>
                                <div className="pcc-logo" style={{ background: c.color + '22' }}>
                                    {c.logo}
                                </div>
                                <div className="pcc-info">
                                    <div className="pcc-name">{c.name}</div>
                                    <div className="pcc-bonus" style={{ color: c.color }}>{c.bonus}</div>
                                    <div className="pcc-detail">{c.bonusDetail.slice(0, 60)}…</div>
                                </div>
                                <div className="pcc-rating">
                                    <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                                    {c.rating}
                                </div>
                                <div className="pcc-actions">
                                    <a
                                        href={`/go/${c.slug}`}
                                        className="pcc-btn-primary"
                                        style={{ background: c.color }}
                                        target="_blank" rel="nofollow noopener"
                                    >
                                        Jouer →
                                    </a>
                                    <Link to={`/casino/${c.slug}`} className="pcc-btn-secondary">
                                        Avis
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Legality */}
            <section className="pillar-section pillar-section--alt" id="legalite">
                <div className="container">
                    <div className="pillar-content-block">
                        <h2 className="pillar-section-title">
                            <Shield size={22} /> Les Casinos Crypto Sont-ils Légaux au Québec?
                        </h2>
                        <div className="pillar-text">
                            <p>
                                <strong>La réponse courte : dans la pratique, oui.</strong> Aucune loi canadienne
                                fédérale n'interdit explicitement aux citoyens de jouer sur des casinos étrangers en ligne.
                                Les plateformes comme Stake, BC.Game et Gamdom opèrent sous des licences internationales
                                reconnues (Curaçao Gaming Authority) et accueillent activement les joueurs québécois.
                            </p>
                            <p>
                                La zone grise juridique existe, mais elle concerne <em>l'opérateur</em> (qui doit avoir une
                                licence pour offrir des services aux Canadiens), pas <em>le joueur</em>. Des milliers de
                                Québécois jouent quotidiennement sur ces plateformes sans aucun problème légal.
                            </p>
                            <div className="pillar-check-list">
                                <div className="pillar-check-item">
                                    <CheckCircle size={16} />
                                    <span>Aucune poursuite connue contre un joueur canadien pour jeu en ligne offshore</span>
                                </div>
                                <div className="pillar-check-item">
                                    <CheckCircle size={16} />
                                    <span>Paiements Bitcoin — anonymes et traçables seulement par vous</span>
                                </div>
                                <div className="pillar-check-item">
                                    <CheckCircle size={16} />
                                    <span>Gains en crypto non imposables automatiquement, mais à déclarer si récurrents</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/guide/stake-casino-quebec-legal" className="pillar-read-more">
                            Lire le guide complet sur la légalité <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Rakeback section */}
            <section className="pillar-section" id="rakeback">
                <div className="container">
                    <h2 className="pillar-section-title">
                        <TrendingUp size={22} /> Rakeback vs Bonus de Bienvenue — Lequel Choisir?
                    </h2>
                    <div className="pillar-comparison-grid">
                        <div className="pillar-comp-card pillar-comp-card--green">
                            <div className="pcomp-title">✅ Rakeback (recommandé)</div>
                            <ul>
                                <li>Remboursement automatique en % de vos mises</li>
                                <li>Zéro condition de mise requise</li>
                                <li>Reçu en continu — quotidien/hebdo/mensuel</li>
                                <li>Retirable immédiatement</li>
                                <li><strong>Exemple : Stake Rakeback 15%</strong></li>
                            </ul>
                        </div>
                        <div className="pillar-comp-card pillar-comp-card--orange">
                            <div className="pcomp-title">⚠️ Bonus de bienvenue</div>
                            <ul>
                                <li>Reçu une seule fois au premier dépôt</li>
                                <li>x30 à x50 de wagering souvent requis</li>
                                <li>Perte statistique fréquente pendant le wagering</li>
                                <li>Jeux restreints pour le déblocage</li>
                                <li><strong>Exemple : BC.Game 20 000 USD</strong></li>
                            </ul>
                        </div>
                    </div>
                    <Link to="/guide/rakeback-vs-bonus-bienvenue" className="pillar-read-more">
                        Voir la comparaison chiffrée complète <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            {/* How to deposit */}
            <section className="pillar-section pillar-section--alt" id="comment-deposer">
                <div className="container">
                    <h2 className="pillar-section-title">
                        ₿ Comment Déposer en Bitcoin sur un Casino — 4 Étapes
                    </h2>
                    <div className="pillar-steps">
                        {[
                            { n: '1', title: 'Achetez du Bitcoin', desc: 'Sur Shakepay ou Bitbuy — les deux plateformes acceptent les virements Interac chez les Canadiens.' },
                            { n: '2', title: 'Créez votre compte casino', desc: 'Inscrivez-vous sur Stake, Gamdom ou BC.Game — email seulement, pas de vérification d\'identité au départ.' },
                            { n: '3', title: 'Copiez l\'adresse de dépôt', desc: 'Dans la section "Wallet" du casino, sélectionnez BTC et copiez l\'adresse de dépôt affichée.' },
                            { n: '4', title: 'Envoyez le BTC', desc: 'Depuis Shakepay/Bitbuy, collez l\'adresse casino et envoyez. Confirmation en 10-30 minutes.' },
                        ].map(s => (
                            <div key={s.n} className="pillar-step">
                                <div className="pillar-step-num">{s.n}</div>
                                <div>
                                    <div className="pillar-step-title">{s.title}</div>
                                    <div className="pillar-step-desc">{s.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guides hub */}
            <section className="pillar-section" id="guides">
                <div className="container">
                    <h2 className="pillar-section-title">
                        <BookOpen size={22} /> Tous Nos Guides Casinos Québec
                    </h2>
                    <div className="pillar-guides-grid">
                        {pillarGuides.map(g => (
                            <Link key={g.slug} to={`/guide/${g.slug}`} className="pillar-guide-card">
                                <div className="pgc-emoji">{g.heroEmoji}</div>
                                <div className="pgc-content">
                                    <div className="pgc-category">{g.category}</div>
                                    <div className="pgc-title">{g.title}</div>
                                    <div className="pgc-read">{g.readTime} de lecture</div>
                                </div>
                                <ArrowRight size={16} className="pgc-arrow" />
                            </Link>
                        ))}
                        <Link to="/guide" className="pillar-guide-card pillar-guide-card--all">
                            <div className="pgc-emoji">📚</div>
                            <div className="pgc-content">
                                <div className="pgc-title">Voir tous nos guides →</div>
                                <div className="pgc-read">10+ articles complets</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="pillar-section pillar-section--alt" id="faq">
                <div className="container">
                    <h2 className="pillar-section-title">❓ Questions Fréquentes — Joueurs Québécois</h2>
                    <div className="pillar-faq-list">
                        {FAQ.map((f, i) => (
                            <div key={i} className="pillar-faq-item">
                                <div className="pfaq-q">{f.q}</div>
                                <div className="pfaq-a">{f.a}</div>
                            </div>
                        ))}
                    </div>
                    <Link to="/faq" className="pillar-read-more">
                        Voir toutes nos FAQ <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    )
}
