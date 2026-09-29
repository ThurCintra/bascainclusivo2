import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/components/header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: '🏀 Início', path: '/' },
    { label: '📖 História', path: '/historia' },
    { label: '📋 Regras', path: '/regras' },
    { label: '⚡ Fundamentos', path: '/fundamentos' },
    { label: '👑 LeBron', path: '/lebron' },
    { label: '♿ Inclusão', path: '/inclusao' }
  ];

  return (
    <header className="header" role="banner">
      <div className="header-container">
        <Link to="/" className="logo" aria-label="Bola Livre - Página inicial">
          <span className="logo-ball">🏀</span>
          <span className="logo-text">Bola Livre</span>
        </Link>

        <nav className="nav-desktop" aria-label="Navegação principal">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Abrir menu de navegação"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {mobileMenuOpen && (
          <nav className="nav-mobile" id="mobile-nav" aria-label="Navegação móvel">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}