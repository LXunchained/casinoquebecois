import { useParams, Link, Navigate } from 'react-router-dom'
import { getGuideBySlug } from '../data/guides'
import { getCasinoBySlug } from '../data/casinos'
import { Clock, Tag, ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'

export default function GuideArticle() {
    const { slug } = useParams()
    const guide = getGuideBySlug(slug)

    if (!guide) return <Navigate to="/guide" replace />

    const linkedCasino = guide.casinoSlug ? getCasinoBySlug(guide.casinoSlug) : null

    return (
        <div className="guide-article-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="container">
                    <Link to="/">Accueil</Link>
                    <span>/</span>
                    <Link to="/guide">Guides</Link>
                    <span>/</span>
                    <span>{guide.category}</span>
                </div>
            </div>

            <div className="container">
                <div className="guide-article-layout">
                    {/* Main Content */}
                    <article className="guide-article">
                        <header className="guide-article-header">
                            <div className="guide-article-meta">
                                <span className="guide-card-category">{guide.category}</span>
                                <span className="guide-card-read-time">
                                    <Clock size={12} />
                                    {guide.readTime}
                                </span>
                                <span className="guide-date">{guide.date}</span>
                            </div>
                            <div className="guide-article-emoji">{guide.heroEmoji}</div>
                            <h1>{guide.title}</h1>
                            <p className="guide-article-intro">{guide.intro}</p>
                            <div className="guide-card-tags">
                                {guide.tags.map(tag => (
                                    <span key={tag} className="guide-tag">
                                        <Tag size={10} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </header>

                        {/* Table of Contents */}
                        <nav className="guide-toc">
                            <h3><BookOpen size={14} /> Table des matières</h3>
                            <ol>
                                {guide.sections.map((section, i) => (
                                    <li key={i}>
                                        <a href={`#section-${i}`}>{section.title}</a>
                                    </li>
                                ))}
                            </ol>
                        </nav>

                        {/* Sections */}
                        {guide.sections.map((section, i) => (
                            <section key={i} id={`section-${i}`} className="guide-section">
                                <h2>{section.title}</h2>
                                <div className="guide-section-content">
                                    {section.content.split('\n\n').map((para, j) => {
                                        // Handle bold markdown
                                        const parts = para.split(/(\*\*[^*]+\*\*)/)
                                        return (
                                            <p key={j}>
                                                {parts.map((part, k) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <strong key={k}>{part.slice(2, -2)}</strong>
                                                    }
                                                    return part
                                                })}
                                            </p>
                                        )
                                    })}
                                </div>
                            </section>
                        ))}

                        {/* CTA Box */}
                        <div className="guide-cta-box">
                            <p>{guide.cta.casino} — Notre recommandation pour les joueurs québécois</p>
                            <a
                                href={guide.cta.url}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="btn-primary"
                            >
                                {guide.cta.text} <ExternalLink size={14} />
                            </a>
                            <span className="guide-disclaimer">18+ · Jeu responsable · Conditions s'appliquent</span>
                        </div>

                        <div className="guide-back">
                            <Link to="/guide">
                                <ArrowLeft size={14} /> Retour aux guides
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="guide-sidebar">
                        <div className="guide-sidebar-card">
                            <h3>🏆 Notre sélection</h3>
                            <p>3 crypto-casinos vérifiés pour les joueurs québécois</p>
                            <Link to="/meilleurs-casinos" className="btn-primary" style={{display:'block', textAlign:'center'}}>
                                Voir le classement
                            </Link>
                        </div>

                        {linkedCasino && (
                            <div className="guide-sidebar-card">
                                <h3>{linkedCasino.logo} {linkedCasino.name}</h3>
                                <div className="sidebar-casino-bonus">{linkedCasino.bonus}</div>
                                <p style={{fontSize:'0.8rem', opacity:0.7}}>{linkedCasino.bonusDetail}</p>
                                <a
                                    href={linkedCasino.affiliateUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="btn-primary"
                                    style={{display:'block', textAlign:'center', marginTop:'0.75rem'}}
                                >
                                    Réclamer le bonus <ExternalLink size={12} />
                                </a>
                            </div>
                        )}

                        <div className="guide-sidebar-card">
                            <h3>📚 Autres guides</h3>
                            <Link to="/guide" style={{color:'var(--gold)', display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.9rem'}}>
                                <BookOpen size={14} /> Tous les guides
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
