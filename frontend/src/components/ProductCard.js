import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product = {}, index = 0 }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const {
    id = 1,
    name = 'Product Title',
    title = name, // Fallback to name if title not provided
    price = 0,
    image = '/placeholder.png',
    rating = 5,
    reviews = 0,
    discount = 0,
    category = 'Category',
    stock = true,
  } = product;

  // Convert price to number if string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  const stockCount = typeof stock === 'boolean' ? (stock ? 10 : 0) : stock;
  const discountedPrice = discount ? (numPrice * (1 - discount / 100)).toFixed(2) : numPrice.toFixed(2);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover="hover"
      className="h-full"
    >
      <div className="card h-full flex flex-col overflow-hidden group">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 h-64">
          {/* Product Image */}
          <motion.img
            src={image.startsWith('http') ? image : `http://127.0.0.1:8000${image}`}
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              e.target.src = '/placeholder.png';
            }}
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Link to={`/product/${id}/`}>
              <motion.button
                className="btn-primary mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
              </motion.button>
            </Link>
          </motion.div>

          {/* Discount Badge */}
          {discount > 0 && (
            <motion.div
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              -{discount}%
            </motion.div>
          )}

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-semibold"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {category}
          </motion.div>

          {/* Wishlist Button */}
          <motion.button
            onClick={() => setIsFavorited(!isFavorited)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={isFavorited ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      i < rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({reviews})
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                ৳ {discountedPrice}
              </span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ৳ {numPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <motion.div
            className={`mb-4 text-sm font-semibold ${
              stockCount > 0 ? 'text-green-500' : 'text-red-500'
            }`}
            animate={stockCount <= 3 ? { opacity: [1, 0.5, 1] } : {}}
            transition={stockCount <= 3 ? { duration: 1.5, repeat: Infinity } : {}}
          >
            {stockCount > 0 ? `${stockCount} in stock` : 'Out of stock'}
          </motion.div>

          {/* Add to Cart Button */}
          <motion.button
            className="btn-primary w-full flex items-center justify-center gap-2 mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            disabled={stockCount === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
