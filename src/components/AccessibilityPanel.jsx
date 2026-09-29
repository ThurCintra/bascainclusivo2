import { useState, useEffect } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, updateState, resetAll, speak } = useAccessibility();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openAccessibilityPanel', handleOpen);
    return () => window.removeEventListener('openAccessibilityPanel', handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const speakPageContent = () => {
    const main = document.querySelector('main');
    if (main) speak(main.innerText.replace(/\s+/g, ' ').trim());
  };

  const pauseSpeech = () => {
    window.speechSynthesis?.pause();
  };

  const resumeSpeech = () => {
    window.speechSynthesis?.resume();
  };

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
  };

  return (
    <>
      {isOpen && (
        <div className="accessibility-panel-overlay" onClick={() => setIsOpen(false)} />
      )}
      <aside
        className={`accessibility-panel ${isOpen ? 'open' : ''}`}
        aria-labelledby="panel-title"
        role="complementary"
      >
        <div className="panel-header">
          <h2 id="panel-title">♿ Acessibilidade</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="panel-close"
            aria-label="Fechar painel de acessibilidade"
          >
            ✕
          </button>
        </div>

        <div className="panel-content">
          <section className="panel-section">
            <h3>Leitura por voz</h3>
            <div className="button-group">
              <button onClick={speakPageContent} className="panel-button">
                🔊 Ler página
              </button>
              <button onClick={pauseSpeech} className="panel-button">
                ⏸ Pausar
              </button>
              <button onClick={resumeSpeech} className="panel-button">
                ▶ Continuar
              </button>
              <button onClick={stopSpeech} className="panel-button">
                ⏹ Parar
              </button>
            </div>
          </section>

          <section className="panel-section">
            <h3>Tamanho da fonte</h3>
            <div className="button-group">
              <button
                onClick={() => updateState('fontSize', Math.min(200, state.fontSize + 20))}
                className="panel-button"
              >
                A+ Aumentar
              </button>
              <button
                onClick={() => updateState('fontSize', Math.max(80, state.fontSize - 20))}
                className="panel-button"
              >
                A− Diminuir
              </button>
              <button
                onClick={() => updateState('fontSize', 100)}
                className="panel-button"
              >
                Aa Padrão
              </button>
            </div>
          </section>

          <section className="panel-section">
            <h3>Contraste e cor</h3>
            <div className="button-group">
              <button
                onClick={() => updateState('highContrast', !state.highContrast)}
                className={`panel-button ${state.highContrast ? 'active' : ''}`}
              >
                ◐ Alto contraste
              </button>
              <button
                onClick={() => updateState('darkMode', !state.darkMode)}
                className={`panel-button ${state.darkMode ? 'active' : ''}`}
              >
                🌙 Modo escuro
              </button>
              <button
                onClick={() => updateState('grayScale', !state.grayScale)}
                className={`panel-button ${state.grayScale ? 'active' : ''}`}
              >
                ◒ Escala de cinza
              </button>
            </div>
          </section>

          <section className="panel-section">
            <h3>Destaque</h3>
            <div className="button-group">
              <button
                onClick={() => updateState('highlightLinks', !state.highlightLinks)}
                className={`panel-button ${state.highlightLinks ? 'active' : ''}`}
              >
                🔗 Links
              </button>
              <button
                onClick={() => updateState('highlightFocus', !state.highlightFocus)}
                className={`panel-button ${state.highlightFocus ? 'active' : ''}`}
              >
                🎯 Foco
              </button>
            </div>
          </section>

          <section className="panel-section">
            <h3>Movimento</h3>
            <div className="button-group">
              <button
                onClick={() => updateState('reduceMotion', !state.reduceMotion)}
                className={`panel-button ${state.reduceMotion ? 'active' : ''}`}
              >
                ♻ Reduzir animações
              </button>
            </div>
          </section>

          <section className="panel-section">
            <button onClick={resetAll} className="panel-button reset-button">
              ⚙ Restaurar tudo
            </button>
          </section>
        </div>
      </aside>
    </>
  );
}