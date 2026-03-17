import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, HelpCircle, ExternalLink } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'

const faqs = [
    {
        category: 'Légalité & Sécurité',
        questions: [
            {
                q: 'Est-ce légal de jouer sur un crypto-casino au Québec?',
                a: 'Dans la pratique, oui. Il n\'est pas illégal pour un Québécois de jouer sur un casino étranger en ligne. Ce qui est illégal, c\'est d\'opérer un casino non-autorisé — pas d\'y jouer. Des milliers de Québécois jouent sur Stake, BC.Game et Gamdom sans aucun problème légal.'
            },
            {
                q: 'Les crypto-casinos peuvent-ils fermer sans avertissement et garder mon argent?',
                a: 'C\'est un risque réel avec les plateformes non-réputées. C\'est pourquoi on recommande uniquement Stake (fondé 2017), BC.Game et Gamdom — des plateformes avec des années d\'historique, des millions d\'utilisateurs, et aucun incident de non-paiement documenté. Retire régulièrement tes gains pour minimiser le risque.'
            },
            {
                q: 'Dois-je déclarer mes gains de casino au fisc canadien?',
                a: 'En général non. L\'Agence du revenu du Canada (ARC) considère les gains de jeu comme un loisir non-imposable pour les joueurs occasionnels. L\'exception : si tu joues professionnellement et systématiquement comme source de revenus principale, l\'ARC pourrait considérer ça comme un revenu imposable. En cas de doute, consulte un comptable.'
            },
            {
                q: 'Mon FAI peut-il savoir que je joue sur un crypto-casino?',
                a: 'Vidéotron et Bell bloquent certains casinos au niveau DNS, mais ne surveillent pas activement le contenu de tes connexions. Changer tes DNS vers Cloudflare (1.1.1.1) ou utiliser un VPN résout le blocage et ajoute une couche de confidentialité.'
            }
        ]
    },
    {
        category: 'Dépôts & Retraits',
        questions: [
            {
                q: 'Comment déposer de l\'argent sur un crypto-casino depuis le Canada?',
                a: 'Achète du Bitcoin ou USDT sur une plateforme canadienne régulée (Shakepay, Newton, Bitbuy), puis envoie-le vers l\'adresse de dépôt générée dans ton compte casino. Le processus complet prend 10-30 minutes la première fois.'
            },
            {
                q: 'Combien de temps prennent les retraits?',
                a: 'Sur Stake, BC.Game et Gamdom, les retraits en crypto sont traités automatiquement. En pratique : moins de 10 minutes pour la plupart des transactions, souvent instantané. Bien plus rapide que les virements bancaires des casinos traditionnels.'
            },
            {
                q: 'Y a-t-il un montant minimum de dépôt?',
                a: 'Oui et ils sont très bas : Gamdom et BC.Game à partir de 1 USDT (≈ 1,40 CAD). Stake à partir de 0.001 BTC (≈ quelques dollars). Idéal pour essayer avec un petit budget.'
            },
            {
                q: 'Comment convertir mes gains crypto en dollars canadiens?',
                a: 'Retire tes gains en BTC ou USDT vers une plateforme canadienne (Shakepay ou Newton), vends-les en CAD, puis transfère par e-Transfer vers ton compte bancaire. Délai total : 1-3 jours ouvrables. Shakepay est le plus simple pour les débutants.'
            },
            {
                q: 'Faut-il vérifier son identité (KYC) pour retirer?',
                a: 'Pour les petits montants, généralement non — juste un email suffit pour jouer et retirer. Les gros montants (souvent au-delà de 2 000-5 000 USD cumulés) peuvent déclencher une demande de vérification d\'identité. C\'est une mesure anti-blanchiment standard.'
            }
        ]
    },
    {
        category: 'Blockchain & Crypto',
        questions: [
            {
                q: 'Quelle crypto est la meilleure pour jouer au casino?',
                a: 'USDT (Tether) sur le réseau TRC20 (Tron) est souvent le meilleur choix : stable comme le dollar, frais de transaction de quelques centimes, et accepté partout. Bitcoin est le plus populaire mais sa valeur fluctue. Pour éviter la volatilité crypto pendant tes sessions, USDT est idéal.'
            },
            {
                q: 'C\'est quoi un jeu "Provably Fair"?',
                a: 'Un jeu provably fair utilise la cryptographie pour prouver mathématiquement que le casino ne peut pas tricher sur les résultats. Avant chaque partie, un "hash" du résultat futur est publié. Tu peux vérifier après coup que ce hash correspond et que le résultat n\'a pas été manipulé. Stake et Gamdom offrent le provably fair sur leurs jeux originaux.'
            },
            {
                q: 'Qu\'est-ce que le rakeback?',
                a: 'Le rakeback est un remboursement automatique d\'un pourcentage de tes mises, indépendamment de si tu gagnes ou perds. Sur Stake, le rakeback est distribué quotidiennement, hebdomadairement et mensuellement. C\'est un avantage unique des crypto-casinos qui n\'existe pas dans les casinos traditionnels.'
            }
        ]
    },
    {
        category: 'Nos Recommandations',
        questions: [
            {
                q: 'Quel casino recommandez-vous pour les débutants?',
                a: 'Stake est notre recommandation #1 pour débuter : interface simple, jeux provably fair faciles à comprendre (Crash, Dice), et rakeback automatique dès le premier euro misé. Commence avec un petit montant pour te familiariser avec la plateforme.'
            },
            {
                q: 'Quel casino choisir si j\'ai des skins CS2?',
                a: 'Gamdom, sans hésitation. C\'est la seule plateforme qui accepte les skins CS2 (et Dota2) comme monnaie de dépôt directement depuis votre inventaire Steam. Le rain bonus communautaire est aussi un avantage exclusif à Gamdom.'
            },
            {
                q: 'Quelle plateforme offre le plus gros bonus de bienvenue?',
                a: 'BC.Game avec son bonus jusqu\'à 20 000 USD sur les premiers dépôts. Attention aux conditions de mise (wagering requirements) associées. Stake n\'a pas de bonus de bienvenue mais offre un rakeback automatique sans conditions — souvent plus avantageux sur le long terme.'
            },
            {
                q: 'Vos liens affiliés changent-ils quelque chose pour moi en tant que joueur?',
                a: 'Non — les conditions, bonus et odds sont identiques que tu passes par notre lien ou directement. En utilisant nos liens, tu nous aides à maintenir ce site gratuitement et à continuer à publier des guides honnêtes. Merci! 🙏'
            }
        ]
    }
]

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div className={`faq-item ${open ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpen(o => !o)}>
                <span>{q}</span>
                <ChevronDown size={18} className="faq-chevron" />
            </button>
            {open && <div className="faq-answer">{a}</div>}
        </div>
    )
}

export default function FaqPage() {
    return (
        <div className="faq-page">
            <SEOMeta
                title="FAQ — Questions Fréquentes sur les Crypto-Casinos au Québec"
                description="Toutes vos questions sur les casinos crypto au Québec: légalité, dépôts, retraits, Bitcoin, rakeback. Réponses expertes et pratiques pour joueurs canadiens."
                canonical="/faq"
            />
            <section className="faq-hero">
                <div className="container">
                    <div className="guide-hero-badge">
                        <HelpCircle size={14} />
                        <span>FAQ</span>
                    </div>
                    <h1>Questions Fréquentes — Crypto-Casinos au Québec</h1>
                    <p>Tout ce que tu dois savoir avant de commencer à jouer sur un crypto-casino depuis le Québec ou le Canada.</p>
                </div>
            </section>

            <div className="container">
                <div className="faq-layout">
                    <main className="faq-main">
                        {faqs.map((section) => (
                            <section key={section.category} className="faq-section">
                                <h2 className="faq-category-title">{section.category}</h2>
                                <div className="faq-list">
                                    {section.questions.map((item) => (
                                        <FaqItem key={item.q} q={item.q} a={item.a} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </main>

                    <aside className="faq-sidebar">
                        <div className="guide-sidebar-card">
                            <h3>🏆 Top 3 Casinos</h3>
                            <p>Nos recommandations vérifiées pour les Québécois</p>
                            <Link to="/meilleurs-casinos" className="btn-primary" style={{display:'block', textAlign:'center'}}>
                                Voir le classement
                            </Link>
                        </div>
                        <div className="guide-sidebar-card">
                            <h3>📚 Guides complets</h3>
                            <p>Articles détaillés pour tout comprendre</p>
                            <Link to="/guide" className="btn-primary" style={{display:'block', textAlign:'center', background:'rgba(255,255,255,0.08)', color:'var(--text)'}}>
                                Lire les guides
                            </Link>
                        </div>
                        <div className="guide-sidebar-card" style={{background:'rgba(245,158,11,0.06)', borderColor:'var(--border-gold)'}}>
                            <h3>⚡ Commencer maintenant</h3>
                            <p style={{fontSize:'0.8rem'}}>Stake — Notre #1. Rakeback automatique, jeux provably fair.</p>
                            <a
                                href="https://stake.com/?c=tARfHbZE"
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="btn-primary"
                                style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', marginTop:'12px'}}
                            >
                                Créer un compte <ExternalLink size={12} />
                            </a>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
