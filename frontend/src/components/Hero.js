import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-light to-white dark:from-dark dark:via-gray-900 dark:to-dark pt-20">
      {/* Animated Background Elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-primary rounded-full filter blur-3xl opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary/10 border border-primary/20 rounded-full w-fit"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Welcome to Our Store
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Discover
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Amazing Products
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-lg"
              variants={itemVariants}
            >
              Shop the latest trends with exclusive collections, premium quality, and unbeatable prices. Your perfect find is just a click away.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={itemVariants}
            >
              <Link to="/products">
                <motion.button
                  className="btn-primary group flex items-center justify-center gap-2 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(102, 126, 234, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8"
              variants={itemVariants}
            >
              {[
                { number: '50K+', label: 'Products' },
                { number: '10K+', label: 'Customers' },
                { number: '24/7', label: 'Support' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image with Floating Elements */}
          <motion.div
            className="relative h-96 md:h-[500px] flex items-center justify-center"
            variants={itemVariants}
          >
            {/* Floating Card */}
            <motion.div
              className="absolute w-64 h-64 bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              {/* Floating Elements inside */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Floating Shapes */}
            <motion.div
              className="absolute w-48 h-48 border-2 border-primary rounded-full opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            ></motion.div>

            <motion.div
              className="absolute w-32 h-32 bg-secondary/10 rounded-3xl opacity-50"
              animate={{
                y: [0, -30, 0],
                x: [0, 30, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            ></motion.div>

            {/* Accent Shapes */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-20 border border-primary/20 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
              ></motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Wave SVG at Bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-24"
          >
            <path
              d="M0,30 Q300,60 600,30 T1200,30 L1200,120 L0,120 Z"
              fill="url(#gradient)"
              opacity="0.1"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
