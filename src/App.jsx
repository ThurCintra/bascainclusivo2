import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipLink from './components/SkipLink';
import AccessibilityPanel from './components/AccessibilityPanel';
import AccessibilityButton from './components/AccessibilityButton';

// Pages
import Home from './pages/Home';
import Historia from './pages/Historia';
import Regras from './pages/Regras';
import Fundamentos from './pages/Fundamentos';
import LeBron from './pages/LeBron';
import Inclusao from './pages/Inclusao';

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <SkipLink />
        <Header />
        <main id="main-content" role="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/regras" element={<Regras />} />
            <Route path="/fundamentos" element={<Fundamentos />} />
            <Route path="/lebron" element={<LeBron />} />
            <Route path="/inclusao" element={<Inclusao />} />
          </Routes>
        </main>
        <Footer />
        <AccessibilityPanel />
        <AccessibilityButton />
      </Router>
    </AccessibilityProvider>
  );
}

export default App;