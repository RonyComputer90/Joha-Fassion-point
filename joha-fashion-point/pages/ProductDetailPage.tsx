import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import OrderForm from '../components/OrderForm';
import { motion, Variants } from 'framer-motion';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === Number(id));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-gray-50 dark:bg-gray-900 px-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Product Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">We couldn't find the product you're looking for.</p>
        <Link to="/products" className="inline-block bg-gray-800 dark:bg-gray-700 text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300">
          Back to Products
        </Link>
      </div>
    );
  }

  const formatPriceAsTaka = (price: number) => `৳${price.toLocaleString('en-US')}`;

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const detailsVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const mainImage = product.images[selectedImageIndex];
  const isOrderable = selectedSize && selectedColor;

  return (
    <>
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <motion.div variants={imageVariants} initial="hidden" animate="visible" className="flex flex-col items-center">
              <div className="w-full max-w-md aspect-[4/5] rounded-lg overflow-hidden shadow-lg mb-4">
                <img src={mainImage} alt={`${product.name} - view ${selectedImageIndex + 1}`} className="w-full h-full object-cover" />
              </div>
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button key={index} onClick={() => setSelectedImageIndex(index)} className={`w-16 h-20 md:w-20 md:h-24 rounded-md overflow-hidden border-2 transition-all duration-200 ${selectedImageIndex === index ? 'border-gray-800 dark:border-white' : 'border-transparent hover:border-gray-400'}`}>
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Product Info & Order */}
            <motion.div variants={detailsVariants} initial="hidden" animate="visible">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{product.category}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">{product.name}</h1>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPriceAsTaka(product.price)}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-lg text-gray-400 line-through">{formatPriceAsTaka(product.originalPrice)}</span>
                )}
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{product.description}</p>
              
              {/* Size Selector */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Select Size:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${selectedSize === size ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2">Select Color: <span className="font-normal text-gray-600 dark:text-gray-400">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${selectedColor === color ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-gray-900 dark:ring-white dark:ring-offset-gray-800' : 'border-gray-300'}`} style={{ backgroundColor: color.split(' ')[0].toLowerCase() }} aria-label={`Select color ${color}`} />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8 max-w-[150px]">
                <label htmlFor="quantity" className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-2 block">Quantity:</label>
                <input id="quantity" type="number" value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400" />
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={() => setIsOrderFormVisible(true)}
                disabled={!isOrderable}
                className="w-full bg-gray-800 dark:bg-gray-700 text-white font-semibold py-4 px-6 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-lg"
              >
                Add to cart
              </button>
              {!isOrderable && <p className="text-xs text-red-500 dark:text-red-400 mt-2 text-center">Please select a size and color.</p>}
            </motion.div>
          </div>
        </div>
      </div>
      {isOrderFormVisible && (
        <OrderForm
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          quantity={quantity}
          onClose={() => setIsOrderFormVisible(false)}
        />
      )}
    </>
  );
};

export default ProductDetailPage;
