import { Link } from 'react-router-dom'
import { guides } from '../data/guides'
import { BookOpen, Clock, ArrowRight, Tag } from 'lucide-react'
import SEOMeta from '../components/SEOMeta'

export default function GuidePage() {
    return (
        <div className="guide-page">
            <SEOMeta
                title="Guides Casino en Ligne Québec 2026 — Conseils & Comparatifs"
                description="Guides pratiques sur les casinos crypto pour joueurs québécois: comment déposer en Bitcoin, choisir un bonus, comprendre le provably fair et le rakeback."
                canonical="/guide"
            />
            <section className="guide-hero">
                <div className="container">
                    <div className="guide-hero-badge">
                        <BookOpen size={14} />
                        <span>Guides & Analyses</span>
                    </div>
                    <h1>Guides Crypto-Casino pour Québécois</h1>
                    <p>Tout ce que tu dois savoir pour jouer au casino avec Bitcoin au Québec — articles vérifiés, conseils pratiques et comparaisons honnêtes.</p>
                </div>
            </section>

            <section className="guide-grid-section">
                <div className="container">
                    <div className="guide-grid">
                        {guides.map((guide, index) => (
                            <Link
                                key={guide.slug}
                                to={`/guide/${guide.slug}`}
                                className={`guide-card ${index === 0 ? 'guide-card--featured' : ''}`}
                            >
                                <div className="guide-card-emoji">{guide.heroEmoji}</div>
                                <div className="guide-card-content">
                                    <div className="guide-card-meta">
                                        <span className="guide-card-category">{guide.category}</span>
                                        <span className="guide-card-read-time">
                                            <Clock size={12} />
                                            {guide.readTime}
                                        </span>
                                    </div>
                                    <h2 className="guide-card-title">{guide.title}</h2>
                                    <p className="guide-card-intro">{guide.intro.slice(0, 140)}...</p>
                                    <div className="guide-card-tags">
                                        {guide.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="guide-tag">
                                                <Tag size={10} />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="guide-card-cta">
                                        Lire l'article <ArrowRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
