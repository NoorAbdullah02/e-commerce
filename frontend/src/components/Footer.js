import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  ArrowUp,
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const supportLinks = [
    { label: 'FAQ', href: '/terms' },
    { label: 'Shipping Info', href: '/terms' },
    { label: 'Returns', href: '/terms' },
    { label: 'Track Order', href: '/all-orders/' },
  ];

  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/about' },
    { label: 'Blog', href: '/products' },
    { label: 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <footer className="bg-dark dark:bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Main Footer Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Top Section - Newsletter */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 pb-16 border-b border-gray-700"
          variants={itemVariants}
        >
          <div>
            <h3 className="text-2xl font-bold mb-3">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Stay Updated
              </span>
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to get special offers and updates on new products
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Subscribe</span>
            </motion.button>
          </form>

          {isSubscribed && (
            <motion.div
              className="col-span-full text-green-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✓ Thanks for subscribing!
            </motion.div>
          )}
        </motion.div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ translateX: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ translateX: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ translateX: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-primary rounded-full"></span>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 hover:text-primary transition-colors">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>123 E-Commerce St, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors cursor-pointer">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>support@ecommerce.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          className="border-t border-gray-700 pt-8 mb-8 flex items-center justify-between"
          variants={itemVariants}
        >
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Scroll to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
            whileHover={{ translateY: -3 }}
          >
            Scroll to Top
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 E-Commerce Store. All rights reserved.
            </p>

            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              Made with <Heart className="w-4 h-4 text-red-500" /> by Your Team
            </div>

            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
    </footer>
  );
};

export default Footer;
