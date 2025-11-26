import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Enthusiast',
      image: '👩‍💼',
      content: 'The quality of products here is exceptional. I keep coming back for more amazing finds!',
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Blogger',
      image: '👨‍💻',
      content: 'Fast delivery, excellent customer service, and fantastic product selection. Highly recommended!',
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Business Owner',
      image: '👩‍🔬',
      content: 'This platform has completely transformed how I shop online. The UI is intuitive and the prices are competitive.',
      rating: 5,
      verified: true,
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Entrepreneur',
      image: '👨‍🎓',
      content: 'Outstanding experience from start to finish. The checkout process is smooth and secure.',
      rating: 5,
      verified: true,
    },
    {
      id: 5,
      name: 'Lisa Anderson',
      role: 'Digital Creator',
      image: '👩‍🎨',
      content: 'Love the variety of products and the modern design. Makes shopping fun and easy!',
      rating: 5,
      verified: true,
    },
  ];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white dark:from-gray-900 to-light dark:to-dark overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Customer Love
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for quality and service
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative h-96 flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full px-4"
              >
                {/* Testimonial Card */}
                <motion.div
                  className="card p-8 md:p-12 text-center relative"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Quote Icon Background */}
                  <div className="absolute top-6 right-6 text-primary opacity-20">
                    <Quote className="w-16 h-16" />
                  </div>

                  {/* Avatar */}
                  <motion.div
                    className="text-6xl mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {testimonials[current].image}
                  </motion.div>

                  {/* Star Rating */}
                  <motion.div
                    className="flex justify-center gap-1 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.2 + i * 0.1,
                          duration: 0.4,
                        }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    className="text-lg text-gray-700 dark:text-gray-300 mb-6 italic"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials[current].content}"
                  </motion.p>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonials[current].name}
                    </p>
                    <p className="text-sm text-primary font-medium">
                      {testimonials[current].role}
                      {testimonials[current].verified && ' ✓'}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={() => paginate(-1)}
              className="p-3 rounded-full bg-gradient-primary text-white hover:shadow-glow transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === current
                      ? 'bg-gradient-primary w-8'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={() => paginate(1)}
              className="p-3 rounded-full bg-gradient-primary text-white hover:shadow-glow transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { number: '50K+', label: 'Happy Customers' },
            { number: '4.9/5', label: 'Average Rating' },
            { number: '98%', label: 'Satisfaction Rate' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card text-center p-6 hover:shadow-glow transition-all"
              whileHover={{ translateY: -5 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Testimonials;
