import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

const defaults = {
  fontSize: 100,
  highContrast: false,
  darkMode: false,
  grayScale: false,
  highlightLinks: false,
  highlightFocus: false,
  reduceMotion: false,
  isSpeaking: false
};

export function AccessibilityProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('bolaLivreA11y');
    return saved ? JSON.parse(saved) : defaults;
  });

  useEffect(() => {
    localStorage.setItem('bolaLivreA11y', JSON.stringify(state));
    applyStyles();
  }, [state]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState(prev => ({ ...prev, reduceMotion: true }));
    }
  }, []);

  const applyStyles = () => {
    const root = document.documentElement;
    root.style.fontSize = state.fontSize + '%';
    document.body.classList.toggle('high-contrast', state.highContrast);
    document.body.classList.toggle('dark-mode', state.darkMode);
    document.body.classList.toggle('gray-scale', state.grayScale);
    document.body.classList.toggle('highlight-links', state.highlightLinks);
    document.body.classList.toggle('highlight-focus', state.highlightFocus);
    document.body.classList.toggle('reduce-motion', state.reduceMotion);
  };

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const resetAll = () => {
    setState(defaults);
  };

  const speak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    setState(prev => ({ ...prev, isSpeaking: true }));
  };

  return (
    <AccessibilityContext.Provider value={{ state, updateState, resetAll, speak }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}