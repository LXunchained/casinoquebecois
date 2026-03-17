import { Link } from 'react-router-dom'
import { Users, CheckCircle, ExternalLink, Star } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'
import { casinos } from '../data/casinos'

const methodologie = [
    { n: '01', title: 'Tests réels', desc: 'Chaque casino est testé avec de vrais dépôts — pas juste une revue des CGU. On vérifie les retraits, le support, les bonus.' },
    { n: '02', title: 'Vérification des licences', desc: 'On consulte les registres officiels de chaque autorité de jeu (Curaçao, MGA, Kahnawake) pour confirmer la validité.' },
    { n: '03', title: 'Conditions analysées', desc: 'On lit les petits caractères des bonus — exigences de mise, jeux exclus, délais d\'expiration. Pas de surprise pour toi.' },
    { n: '04', title: 'Mise à jour continue', desc: 'Le marché évolue vite. Nos avis sont mis à jour chaque semaine pour refléter les changements de bonus et de conditions.' },
    { n: '05', title: 'Indépendance éditoriale', desc: 'Nos partenariats affiliés ne dictent jamais nos avis. On a refusé des partenariats avec des casinos qu\'on estime indignes.' },
]

export default function APropos() {
    return (
        <div className="legal-page">
            <SEOMeta
                title="À Propos — Notre Mission"
                description="CasinoQuébécois.net: le guide indépendant des meilleurs casinos en ligne pour les joueurs québécois. Notre méthodologie de test et notre équipe."
                canonical="/a-propos"
            />

            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">
                        <Users size={14} /> À propos
                    </div>
                    <h1 className="page-hero-title">
                        Notre <span className="highlight">Mission</span>
                    </h1>
                    <p className="page-hero-sub">
                        Aider les joueurs québécois à naviguer dans l'univers complexe des casinos en ligne — avec honnêteté, transparence et rigueur.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className="legal-content">

                    <section className="legal-section">
                        <h2>🎯 Pourquoi CasinoQuébécois.net ?</h2>
                        <p>
                            Le marché des casinos en ligne est saturé de faux avis payés et de sites qui recommandent n'importe quoi pour maximiser leurs commissions. On a créé CasinoQuébécois.net avec un objectif opposé : <strong>être le guide qu'on aurait voulu avoir</strong> quand on a commencé à s'intéresser aux crypto-casinos.
                        </p>
                        <p>
                            Notre équipe — deux Québécois passionnés par les technologies blockchain et le jeu en ligne — a passé des centaines d'heures à tester, analyser et comparer les meilleures plateformes disponibles pour les joueurs du Québec et du Canada francophone.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>🔬 Notre méthodologie</h2>
                        <div className="how-grid">
                            {methodologie.map(step => (
                                <div key={step.n} className="how-card">
                                    <div className="how-number">{step.n}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="legal-section">
                        <h2>⚡ Nos critères de sélection</h2>
                        <p>Un casino doit obtenir la note minimale dans chacun de ces critères pour figurer sur notre liste :</p>
                        <div className="criteria-list">
                            {[
                                'Licence valide et vérifiable (Curaçao, MGA, Kahnawake)',
                                'Historique de paiement documenté — zéro incident non résolu',
                                'Retraits en crypto en moins de 30 minutes',
                                'Support réactif (chat ou email) — test personnel',
                                'Fonctionnalités de jeu responsable disponibles (limites, autoexclusion)',
                                'Bonus avec conditions raisonnables et documentées',
                            ].map((c, i) => (
                                <div key={i} className="criteria-item">
                                    <CheckCircle size={16} className="criteria-check" />
                                    <span>{c}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="legal-section">
                        <h2>💰 Transparence sur nos revenus</h2>
                        <p>
                            CasinoQuébécois.net est un site <strong>affilié</strong>. Ça signifie que nous recevons une commission (entre 25% et 35% des revenus nets générés) lorsqu'un joueur s'inscrit sur un casino via nos liens.
                        </p>
                        <p>
                            Ce modèle nous permet de maintenir le site <strong>gratuitement</strong> pour toi et de continuer à publier des guides honnêtes. Voici nos partenariats actifs :
                        </p>
                        <div className="partners-list">
                            {casinos.map(c => (
                                <div key={c.slug} className="partner-item">
                                    <span>{c.logo} {c.name}</span>
                                    <span className="partner-commission">{c.commission} rev. share</span>
                                    <a href={c.affiliateUrl} target="_blank" rel="noopener nofollow noreferrer" className="partner-link">
                                        Visiter <ExternalLink size={11} />
                                    </a>
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '1rem' }}>
                            <strong>Important :</strong> nos commissions n'influencent <em>jamais</em> le classement ni les avis. Nous avons des partenaires affiliés que nous classons en 2e ou 3e position parce qu'ils le méritent objectivement moins.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>📬 Nous contacter</h2>
                        <p>Pour partenariats, corrections, ou questions éditoriales :</p>
                        <a href="mailto:contact@casinoquebecois.net" className="contact-email-link">
                            contact@casinoquebecois.net
                        </a>
                        <p style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                            Délai de réponse habituel : 24-48 heures ouvrables.
                        </p>
                    </section>

                    <div className="legal-nav-links">
                        <Link to="/">← Retour à l'accueil</Link>
                        <Link to="/meilleurs-casinos">Voir les casinos</Link>
                        <Link to="/jeu-responsable">Jeu responsable</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
