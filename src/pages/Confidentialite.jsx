import { Link } from 'react-router-dom'
import { Lock, Mail } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'

export default function Confidentialite() {
    return (
        <div className="legal-page">
            <SEOMeta
                title="Politique de Confidentialité"
                description="Politique de confidentialité de CasinoQuébécois.net — données collectées, cookies, droits des utilisateurs et contact."
                canonical="/confidentialite"
            />

            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">
                        <Lock size={14} /> Politique de confidentialité
                    </div>
                    <h1 className="page-hero-title">Politique de <span className="highlight">Confidentialité</span></h1>
                    <p className="page-hero-sub">Dernière mise à jour : mars 2026</p>
                </div>
            </section>

            <div className="container">
                <div className="legal-content">

                    <section className="legal-section">
                        <h2>1. Qui sommes-nous ?</h2>
                        <p>
                            CasinoQuébécois.net est un site de comparaison et d'avis indépendant sur les casinos en ligne, ciblant les joueurs du Québec et du Canada francophone. Nous opérons en tant que site affilié — nous percevons des commissions des casinos recommandés lorsqu'un joueur s'inscrit via nos liens.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Données collectées</h2>
                        <p>Nous collectons un minimum de données pour faire fonctionner le site :</p>
                        <ul className="legal-list">
                            <li><strong>Données de navigation :</strong> pages visitées, durée, appareil utilisé — via Google Analytics (anonymisé)</li>
                            <li><strong>Cookies de performance :</strong> pour mémoriser les préférences et analyser le trafic</li>
                            <li><strong>Liens affiliés :</strong> si tu cliques sur un lien partenaire, le casino concerné peut placer un cookie de suivi sur ton navigateur (voir leurs politiques respectives)</li>
                        </ul>
                        <p>Nous ne collectons <strong>aucune donnée personnelle identifiable</strong> (nom, email, adresse) directement sur ce site.</p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Cookies</h2>
                        <p>Notre site utilise les types de cookies suivants :</p>
                        <div className="cookie-table-wrap">
                            <table className="legal-table">
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Finalité</th>
                                        <th>Durée</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Essentiel</td>
                                        <td>Fonctionnement du site (React Router)</td>
                                        <td>Session</td>
                                    </tr>
                                    <tr>
                                        <td>Analytique</td>
                                        <td>Google Analytics — trafic anonymisé</td>
                                        <td>13 mois</td>
                                    </tr>
                                    <tr>
                                        <td>Affilié</td>
                                        <td>Suivi des conversions (partenaires casino)</td>
                                        <td>30-90 jours</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>Tu peux désactiver les cookies dans les paramètres de ton navigateur à tout moment.</p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Liens affiliés</h2>
                        <p>
                            CasinoQuébécois.net participe à des programmes d'affiliation avec les casinos recommandés (Stake, BC.Game, Gamdom, Rollbit, Roobet). Lorsque tu cliques sur un lien « Jouer » ou « Réclamer le bonus », nous recevons une commission si tu t'inscris.
                        </p>
                        <p>
                            <strong>Important :</strong> cette rémunération n'influence pas nos avis. Nous recommandons uniquement des plateformes que nous estimons fiables et de qualité. Les bonus et conditions que tu obtiens via nos liens sont identiques à ceux disponibles en accès direct.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Partage de données</h2>
                        <p>Nous ne vendons ni ne louons aucune donnée à des tiers. Nous partageons uniquement avec :</p>
                        <ul className="legal-list">
                            <li>Google Analytics (analyse du trafic anonymisé)</li>
                            <li>Les plateformes affiliées (uniquement via tracking pixel lors d'un clic volontaire)</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>6. Tes droits</h2>
                        <p>Conformément à la <em>Loi 25</em> (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels) et au RGPD pour les visiteurs européens, tu as le droit :</p>
                        <ul className="legal-list">
                            <li>D'accéder aux données te concernant</li>
                            <li>De demander leur suppression</li>
                            <li>De refuser le suivi analytique (mode incognito ou extension uBlock Origin)</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>7. Contact</h2>
                        <p>Pour toute question relative à la confidentialité ou pour exercer tes droits :</p>
                        <a href="mailto:contact@casinoquebecois.net" className="contact-email-link">
                            <Mail size={16} />
                            contact@casinoquebecois.net
                        </a>
                    </section>

                    <div className="legal-nav-links">
                        <Link to="/">← Retour à l'accueil</Link>
                        <Link to="/jeu-responsable">Jeu responsable</Link>
                        <Link to="/a-propos">À propos</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
