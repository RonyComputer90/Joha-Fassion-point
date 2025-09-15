import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideInterval = 3000; // 3 seconds per slide

  useEffect(() => {
    if (!isHovered && product.images.length > 1) {
      const timer = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      }, slideInterval);
      return () => clearTimeout(timer);
    }
  }, [currentImageIndex, isHovered, product.images.length]);

  const shortDescription = product.description.length > 80
    ? product.description.substring(0, 80) + '...'
    : product.description;

  const formatPriceAsTaka = (price: number) => {
    return `৳${price.toLocaleString('en-US')}`;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden shadow-md hover:shadow-xl rounded-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-96">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} - view ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? 'bg-white shadow-md' : 'bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 bg-slate-800 text-white">
        <h3 className="text-lg font-bold truncate">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-slate-300 h-10">
          {shortDescription}
        </p>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-white">
              {formatPriceAsTaka(product.price)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-slate-400 line-through">
                {formatPriceAsTaka(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-white group-hover:underline">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
