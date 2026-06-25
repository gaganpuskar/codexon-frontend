import { useState, useEffect } from 'react';

export function useTypingEffect(words, typeSpeed = 110, deleteSpeed = 55, delay = 1400) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const fullWord = words[wordIndex];

    if (!isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length + 1));
      }, typeSpeed);

      if (currentText === fullWord) {
        timer = setTimeout(() => setIsDeleting(true), delay);
      }
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullWord.slice(0, currentText.length - 1));
      }, deleteSpeed);

      if (currentText === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delay]);

  return currentText;
}