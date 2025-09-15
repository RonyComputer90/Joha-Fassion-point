
import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  texts: string[];
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const typingSpeed = isDeleting ? 75 : 150;
    const currentFullText = texts[textIndex];

    const handleTyping = () => {
      if (isDeleting) {
        setCurrentText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentFullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <span className="border-r-2 border-gray-800 dark:border-white pr-1">
      {currentText}
    </span>
  );
};

export default TypingAnimation;