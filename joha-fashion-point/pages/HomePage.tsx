

import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { Link } from 'react-router-dom';
// FIX: Import Variants type from framer-motion to fix type errors.
import { motion, Variants } from 'framer-motion';

const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 8);

  // FIX: Explicitly type animation variants with the Variants type.
  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="dark:bg-gray-900">
      <HeroSlider />
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Collection
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Discover our hand-picked selection of this season's best styles.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 gap-x-8"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={gridItemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-center mt-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Link 
              to="/products" 
              className="inline-block bg-gray-800 dark:bg-gray-700 text-white font-semibold py-3 px-8 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              Shop All Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;