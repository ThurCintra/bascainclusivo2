import { Link } from 'react-router-dom';
import '../styles/components/footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Bola Livre</h3>
          <p>Basquete, LeBron James e acessibilidade digital em uma experiência profissional.</p>
        </div>

        <div className="footer-section">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/historia">História</Link></li>
            <li><Link to="/regras">Regras</Link></li>
            <li><Link to="/fundamentos">Fundamentos</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/lebron">LeBron James</Link></li>
            <li><Link to="/inclusao">Inclusão</Link></li>
            <li><a href="#main-content">Voltar ao topo</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Acessibilidade</h4>
          <p>Este site foi desenvolvido com foco em acessibilidade digital para todas as pessoas.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Bola Livre • Projeto educativo de acessibilidade digital e basquete</p>
      </div>
    </footer>
  );
}