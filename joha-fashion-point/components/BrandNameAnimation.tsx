import React, { useState, useEffect } from 'react';

const brandNames = ["Joha Fashion Point", "Joha Fashion Wear"];

const BrandNameAnimation: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const typingSpeed = isDeleting ? 75 : 150;
    const currentFullText = brandNames[textIndex];

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
        setTextIndex((prevIndex) => (prevIndex + 1) % brandNames.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <span className="relative inline-block text-left min-h-[32px] min-w-[280px]">
      {currentText}
      <span 
        className="inline-block w-0.5 h-7 bg-gray-900 dark:bg-white ml-1 animate-pulse" 
        style={{ verticalAlign: 'bottom' }}
      />
    </span>
  );
};

export default BrandNameAnimation;
