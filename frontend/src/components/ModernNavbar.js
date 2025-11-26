import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, ShoppingCart, User, Search } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ModernNavbar.css';

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const cart = useSelector((state) => state.cart?.cartItems || []);
  const history = useHistory();

  useEffect(() => {
    // Force light mode only - disable dark mode
    setIsDark(false);
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      history.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms', href: '/terms' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.nav
      className={`navbar-sticky ${
        isScrolled ? 'navbar-scroll-light' : 'navbar-default'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="navbar-logo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="navbar-logo-icon">E</div>
              <span className="navbar-logo-text">Store</span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-menu-desktop">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link to={item.href} className="navbar-menu-item">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <motion.form
            onSubmit={handleSearch}
            className="navbar-search-desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="navbar-search-btn"
            >
              <Search size={18} />
            </motion.button>
          </motion.form>

          {/* Right Actions */}
          <div className="navbar-actions">
            {/* Mobile Search Toggle */}
            <motion.button
              onClick={() => setShowSearch(!showSearch)}
              className="navbar-action-btn navbar-mobile-toggle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-6 h-6" />
            </motion.button>

            {/* Cart Button */}
            <Link to="/products">
              <motion.button
                className="navbar-action-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ position: 'relative' }}
              >
                <ShoppingCart className="w-6 h-6" />
                {cart.length > 0 && (
                  <motion.span
                    className="navbar-cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cart.length}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Theme Toggle - HIDDEN */}
            <motion.button
              onClick={toggleTheme}
              className="navbar-theme-toggle"
              whileHover={{ scale: 1.1, rotate: 20 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </motion.button>

            {/* User Menu */}
            <Link to="/account">
              <motion.button
                className="navbar-action-btn navbar-user-menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-6 h-6" />
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar-action-btn navbar-mobile-toggle"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <motion.form
            onSubmit={handleSearch}
            className="navbar-search-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-mobile-input"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="navbar-search-mobile-btn"
            >
              <Search size={18} />
            </motion.button>
          </motion.form>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="navbar-menu-mobile active"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div key={item.label} variants={itemVariants}>
                <Link
                  to={item.href}
                  className="navbar-mobile-item"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default ModernNavbar;
