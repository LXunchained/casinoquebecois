import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="site-header">
            <div className="header-inner">
                <Link to="/" className="logo">
                    <div className="logo-icon">🎰</div>
                    <div>
                        <span className="logo-name">Casino<span className="logo-highlight">Québécois</span></span>
                        <span className="logo-sub">.net</span>
                    </div>
                </Link>

                <nav className={`site-nav ${open ? 'open' : ''}`}>
                    <NavLink to="/" end onClick={() => setOpen(false)}>Accueil</NavLink>
                    <NavLink to="/meilleurs-casinos" onClick={() => setOpen(false)}>Top Casinos</NavLink>
                    <NavLink to="/bonus" onClick={() => setOpen(false)}>Bonus</NavLink>
                </nav>

                <div className="header-actions">
                    <Link to="/meilleurs-casinos" className="header-cta">
                        🎁 Voir les Bonus
                    </Link>
                    <button className="mobile-menu-btn" onClick={() => setOpen(o => !o)} aria-label="Menu">
                        {open ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>
        </header>
    )
}
