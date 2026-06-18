import { useEffect, useState } from 'react';

const SCREEN_READER_STORAGE_KEY = 'fo_screen_reader';

function getInitialScreenReader(): boolean {
  try {
    const saved = localStorage.getItem(SCREEN_READER_STORAGE_KEY);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch (e) {
    console.warn('Storage access unavailable:', e);
  }
  return false;
}

export function extractAccessibleText(element: HTMLElement): string {
  // Clone the element so we can modify it without affecting the real UI
  const clone = element.cloneNode(true) as HTMLElement;
  
  // Remove all elements marked as hidden for screen readers
  const hiddenElements = clone.querySelectorAll('[aria-hidden="true"], [data-sr-ignore="true"]');
  hiddenElements.forEach(el => el.remove());

  // We must temporarily attach the clone to the document to allow the browser 
  // to compute `innerText` properly (which adds newlines for block elements).
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  document.body.appendChild(clone);
  
  const text = clone.innerText || '';
  
  // Clean up
  document.body.removeChild(clone);

  // Replace layout newlines with a comma and space to force a natural pause in TTS without reading 'dot'
  return text.replace(/\n+/g, ', ');
}

export function speakText(text: string, lang: string = 'en') {
  if (!('speechSynthesis' in window)) return;
  
  // Cancel previous speech to avoid queueing
  window.speechSynthesis.cancel();
  
  if (!text.trim()) return;

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map short code to standard locale for speech synthesis
  let locale = 'en-US';
  if (lang.startsWith('de')) locale = 'de-DE';
  else if (lang.startsWith('fr')) locale = 'fr-FR';
  else if (lang.startsWith('en')) locale = 'en-GB';

  utterance.lang = locale;
  utterance.rate = 1.0; // Normal rate
  
  // Try to explicitly set the voice to ensure correct language pronunciation
  const voices = window.speechSynthesis.getVoices();
  const matchingVoices = voices.filter((v) => v.lang === locale || v.lang.startsWith(lang));
  
  if (matchingVoices.length > 0) {
    // Favor higher quality voices on macOS / Chrome
    const premiumVoice = matchingVoices.find(v => 
      v.name.includes('Premium') || 
      v.name.includes('Enhanced') || 
      v.name.includes('Google')
    );
    utterance.voice = premiumVoice || matchingVoices[0];
  }
  
  window.speechSynthesis.speak(utterance);
}

export function cancelSpeech() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

export function useScreenReader() {
  const [isScreenReaderEnabled, setIsScreenReaderEnabled] = useState<boolean>(getInitialScreenReader());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsScreenReaderEnabled(getInitialScreenReader());
    };

    window.addEventListener('screenReaderChanged', handleStorageChange);
    return () => {
      window.removeEventListener('screenReaderChanged', handleStorageChange);
    };
  }, []);

  const toggleScreenReader = () => {
    const newValue = !isScreenReaderEnabled;
    setIsScreenReaderEnabled(newValue);
    try {
      localStorage.setItem(SCREEN_READER_STORAGE_KEY, String(newValue));
      window.dispatchEvent(new Event('screenReaderChanged'));
      if (!newValue) {
        cancelSpeech();
      }
    } catch (e) {
      console.warn('Error saving screen reader preference:', e);
    }
  };

  return {
    isScreenReaderEnabled,
    toggleScreenReader,
  };
}
