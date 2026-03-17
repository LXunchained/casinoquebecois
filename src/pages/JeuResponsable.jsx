import { Link } from 'react-router-dom'
import { Shield, Phone, ExternalLink, Heart, AlertCircle, CheckCircle } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'

const ressources = [
    {
        name: 'Jeu : Aide et Référence',
        phone: '1-800-461-0140',
        desc: 'Ligne d\'aide 24/7 pour les Québécois aux prises avec un problème de jeu. Gratuit et confidentiel.',
        url: 'https://www.jeu-aidereference.qc.ca',
        icon: '📞',
    },
    {
        name: 'Gambling Therapy',
        phone: null,
        desc: 'Support en ligne gratuit, disponible en français. Groupes de soutien et chat avec des conseillers.',
        url: 'https://www.gamblingtherapy.org',
        icon: '💬',
    },
    {
        name: 'Gamblers Anonymes Québec',
        phone: '1-855-999-7519',
        desc: 'Groupes de parole et programme en 12 étapes pour surmonter l\'addiction au jeu.',
        url: 'https://www.gaqc.ca',
        icon: '🤝',
    },
    {
        name: 'Loto-Québec — Autoexclusion',
        phone: null,
        desc: 'Programme d\'autoexclusion officiel de Loto-Québec pour les casinos terrestres et Espace Jeux en ligne.',
        url: 'https://lotoquebec.com/fr/responsabilite/autoexclusion',
        icon: '🔒',
    },
]

const signes = [
    'Tu passes plus de temps et d\'argent à jouer que prévu',
    'Tu penses constamment au jeu, même au travail ou en famille',
    'Tu joues pour récupérer des pertes (chasing losses)',
    'Tu empruntes de l\'argent ou vends des biens pour jouer',
    'Tu caches ton activité de jeu à tes proches',
    'Tu ressens de l\'anxiété ou de l\'irritation quand tu n\'as pas accès au jeu',
    'Le jeu affecte tes relations, ton travail ou ta santé',
]

const conseils = [
    { icon: '💰', title: 'Fixe un budget strict', desc: 'Ne mise que l\'argent que tu peux te permettre de perdre. Le jeu n\'est pas une source de revenus.' },
    { icon: '⏱️', title: 'Limite ton temps de jeu', desc: 'Définis une durée maximale par session et respecte-la. Utilise un minuteur si nécessaire.' },
    { icon: '🚫', title: 'Ne joue jamais à crédit', desc: 'Jouer avec un argent emprunté est un signe de problème. Stop immédiat si c\'est le cas.' },
    { icon: '🧠', title: 'Prends des pauses régulières', desc: 'Quitte le site toutes les heures. Fais une activité qui n\'implique pas d\'écran.' },
    { icon: '📊', title: 'Suis tes dépenses', desc: 'Note chaque dépôt et retrait. La transparence avec toi-même est la première étape.' },
    { icon: '🤝', title: 'Parle à quelqu\'un', desc: 'N\'attends pas que ça devienne un problème grave. Partager avec un proche allège le poids.' },
]

export default function JeuResponsable() {
    return (
        <div className="legal-page">
            <SEOMeta
                title="Jeu Responsable — Aide et Ressources"
                description="Ressources pour le jeu responsable au Québec. Signes d'addiction, conseils pratiques, numéros d'aide et programme d'autoexclusion. 1-800-461-0140."
                canonical="/jeu-responsable"
            />

            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">
                        <Shield size={14} /> Jeu Responsable
                    </div>
                    <h1 className="page-hero-title">
                        Joue de façon <span className="highlight">Responsable</span>
                    </h1>
                    <p className="page-hero-sub">
                        Le jeu doit rester un divertissement. Si tu ressens que c'est devenu autre chose, de l'aide est disponible — gratuitement et en toute confidentialité.
                    </p>
                    <a href="tel:18004610140" className="legal-hotline-btn">
                        <Phone size={20} />
                        <div>
                            <strong>1-800-461-0140</strong>
                            <span>Jeu : Aide et Référence — 24h/7j, gratuit</span>
                        </div>
                    </a>
                </div>
            </section>

            <div className="container">
                <div className="legal-content">

                    {/* Avertissement */}
                    <div className="legal-alert">
                        <AlertCircle size={20} />
                        <p>
                            <strong>18+ uniquement.</strong> Le jeu en ligne est réservé aux adultes. Si vous êtes mineur ou si vous connaissez un mineur qui joue, contactez immédiatement le 1-800-461-0140.
                        </p>
                    </div>

                    {/* Signes d'un problème */}
                    <section className="legal-section">
                        <h2>🚨 Signes d'un problème de jeu</h2>
                        <p>Reconnais-tu un ou plusieurs de ces comportements dans ta vie ?</p>
                        <div className="signe-list">
                            {signes.map((s, i) => (
                                <div key={i} className="signe-item">
                                    <AlertCircle size={16} className="signe-icon" />
                                    <span>{s}</span>
                                </div>
                            ))}
                        </div>
                        <div className="legal-callout">
                            <strong>Si tu te reconnais dans 3 signes ou plus</strong>, parle à un conseiller immédiatement. Ce n'est pas une faiblesse — c'est du courage.
                        </div>
                    </section>

                    {/* Conseils */}
                    <section className="legal-section">
                        <h2>✅ Nos conseils pour jouer prudemment</h2>
                        <div className="conseils-grid">
                            {conseils.map((c) => (
                                <div key={c.title} className="conseil-card">
                                    <div className="conseil-icon">{c.icon}</div>
                                    <h3>{c.title}</h3>
                                    <p>{c.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Ressources */}
                    <section className="legal-section">
                        <h2>📞 Ressources d'aide disponibles</h2>
                        <div className="ressources-grid">
                            {ressources.map((r) => (
                                <div key={r.name} className="ressource-card">
                                    <div className="ressource-icon">{r.icon}</div>
                                    <div className="ressource-info">
                                        <h3>{r.name}</h3>
                                        {r.phone && <div className="ressource-phone"><Phone size={13} /> {r.phone}</div>}
                                        <p>{r.desc}</p>
                                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="ressource-link">
                                            Visiter le site <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Autoexclusion */}
                    <section className="legal-section">
                        <h2>🔒 Autoexclusion des casinos en ligne</h2>
                        <p>Si tu veux prendre une pause forcée, voici tes options :</p>
                        <div className="autoexclusion-list">
                            <div className="autoexclusion-item">
                                <CheckCircle size={16} />
                                <div>
                                    <strong>Stake :</strong> Paramètres → Limites du compte → Autoexclusion (7j / 30j / 6 mois / permanent)
                                </div>
                            </div>
                            <div className="autoexclusion-item">
                                <CheckCircle size={16} />
                                <div>
                                    <strong>BC.Game :</strong> Profil → Sécurité → Autoexclusion — ou contacter le support
                                </div>
                            </div>
                            <div className="autoexclusion-item">
                                <CheckCircle size={16} />
                                <div>
                                    <strong>Gamdom :</strong> Paramètres → Jeu responsable → Définir une limite ou s'autoexclure
                                </div>
                            </div>
                            <div className="autoexclusion-item">
                                <CheckCircle size={16} />
                                <div>
                                    <strong>Loto-Québec :</strong> Programme provincial d'autoexclusion pour les casinos terrestres et Espace Jeux
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Notre politique */}
                    <section className="legal-section">
                        <h2><Heart size={18} /> Notre engagement</h2>
                        <p>
                            CasinoQuébécois.net ne fait la promotion du jeu qu'auprès des adultes. Nous refusons de recommander des casinos qui ne disposent pas de fonctionnalités de jeu responsable. Toutes nos pages affichent des avertissements 18+.
                        </p>
                        <p>
                            Si tu penses que notre site t'a causé un tort, contacte-nous — nous prendrons tes préoccupations très au sérieux.
                        </p>
                    </section>

                    <div className="legal-nav-links">
                        <Link to="/">← Retour à l'accueil</Link>
                        <Link to="/meilleurs-casinos">Voir les casinos</Link>
                        <Link to="/faq">FAQ</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
