import { useState } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

export default function AccessibilityButton() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { state } = useAccessibility();

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
    // Dispatch event for AccessibilityPanel to listen
    window.dispatchEvent(new CustomEvent('openAccessibilityPanel'));
  };

  return (
    <button
      className="accessibility-button"
      onClick={handleOpenPanel}
      aria-label="Abrir painel de acessibilidade"
      title="Acessibilidade (A11y)"
    >
      <span className="a11y-icon" aria-hidden="true">♿</span>
      <span className="a11y-text">Acessibilidade</span>
    </button>
  );
}