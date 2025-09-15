
import React, { useState, useEffect } from 'react';
import TypingAnimation from './TypingAnimation';

const slides = [
  {
    image: 'https://picsum.photos/seed/hero1/1920/1080',
    headline: 'Style Redefined.',
  },
  {
    image: 'https://picsum.photos/seed/hero2/1920/1080',
    headline: 'Crafted for Comfort.',
  },
  {
    image: 'https://picsum.photos/seed/hero3/1920/1080',
    headline: 'Discover Your Look.',
  },
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
          {slides[currentSlide].headline}
        </h1>
        <p className="text-xl md:text-2xl font-light h-8">
            <TypingAnimation texts={["Sustainable Fabrics.", "Timeless Designs.", "Free Shipping on All Orders."]} />
        </p>
      </div>
    </div>
  );
};

export default HeroSlider;
