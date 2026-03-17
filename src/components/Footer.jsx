import { Link } from 'react-router-dom'
import { Shield, AlertCircle } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="logo">
                            <div className="logo-icon">🎰</div>
                            <div>
                                <span className="logo-name">Casino<span className="logo-highlight">Québécois</span></span>
                                <span className="logo-sub">.net</span>
                            </div>
                        </div>
                        <p className="footer-tagline">
                            Le guide indépendant des meilleurs casinos en ligne pour les joueurs québécois.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div>
                            <h4>Navigation</h4>
                            <Link to="/">Accueil</Link>
                            <Link to="/meilleurs-casinos">Top Casinos</Link>
                            <Link to="/bonus">Bonus & Promotions</Link>
                            <Link to="/guide">Guides</Link>
                            <Link to="/faq">FAQ</Link>
                        </div>
                        <div>
                            <h4>Information</h4>
                            <Link to="/jeu-responsable">Jeu responsable</Link>
                            <Link to="/confidentialite">Politique de confidentialité</Link>
                            <Link to="/a-propos">À propos</Link>
                        </div>
                    </div>
                </div>

                <div className="footer-responsible">
                    <div className="responsible-row">
                        <Shield size={16} />
                        <span><strong>Jeu responsable :</strong> Si le jeu devient un problème, appelez le <strong>1-800-461-0140</strong> (Jeu : Aide et Référence — 24h/7j)</span>
                    </div>
                </div>

                <div className="footer-disclaimer">
                    <AlertCircle size={13} />
                    <p>
                        CasinoQuébécois.net est un site affilié indépendant. Nous percevons une commission si vous vous inscrivez via nos liens — cela ne modifie pas votre bonus ni le prix. Le jeu en ligne est destiné aux personnes de <strong>18 ans et plus</strong>. Jouez de façon responsable.
                    </p>
                </div>
                <p className="footer-copy">© 2026 CasinoQuébécois.net — Tous droits réservés</p>
            </div>
        </footer>
    )
}
