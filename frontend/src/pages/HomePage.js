import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { getProductsList } from '../actions/productActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsListReducer?.products || []);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center z-50 overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        
        <div className="text-center z-10 px-4">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 sm:mb-8">
            <div className="absolute inset-0 border-4 border-t-purple-600 border-r-blue-600 border-b-pink-400 border-l-transparent rounded-full animate-spin" />
            <div className="absolute inset-3 border-4 border-t-transparent border-r-purple-400 border-b-blue-400 border-l-pink-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
            <div className="absolute inset-6 border-4 border-t-blue-600 border-r-transparent border-b-purple-600 border-l-pink-400 rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-wider">
            {['L','O','A','D','I','N','G'].map((letter, i) => (
              <span
                key={i}
                className="inline-block"
                style={{
                  animation: 'bounce 1s ease-in-out infinite',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {letter}
              </span>
            ))}
          </h2>
          
          <div className="w-64 sm:w-72 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-full animate-pulse" style={{ animation: 'loadProgress 2s ease-in-out infinite' }} />
          </div>
          
          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg animate-pulse">Preparing amazing products for you...</p>
        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); opacity: 0.2; }
            50% { transform: translate(50px, -50px); opacity: 0.6; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          @keyframes loadProgress {
            0% { width: 20%; }
            50% { width: 80%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 relative overflow-hidden">
      {/* Scroll Progress */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 z-50 transition-all duration-300 shadow-lg"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-purple-300 rounded-full blur-3xl opacity-20 -top-20 -left-20 transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
        />
        <div 
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -bottom-20 -right-20 transition-transform duration-1000"
          style={{ transform: `translate(${-mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)` }}
        />
        <div 
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-pink-300 rounded-full blur-3xl opacity-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000"
          style={{ transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.02}px)` }}
        />

        {/* Floating Shapes - Hidden on mobile for performance */}
        <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg opacity-10 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="hidden md:block absolute top-60 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full opacity-10 animate-bounce" style={{ animationDuration: '15s' }} />
        <div className="hidden md:block absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 opacity-10" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', animation: 'float 18s ease-in-out infinite' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[80vh] sm:min-h-screen flex items-center justify-center px-4 py-12 sm:py-20">
          <Hero />
        </section>

        {/* Divider */}
        <div className="flex items-center justify-center my-12 sm:my-20 px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent w-full max-w-md" />
          <div className="mx-4 sm:mx-8 p-3 sm:p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent w-full max-w-md" />
        </div>

        {/* Featured Products Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Featured
                </span>{' '}
                <span className="text-gray-900">Products</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4 px-4">
                Discover our handpicked selection of premium items
              </p>
            </div>

            {/* Products from Redux */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-purple-100">
              <FeaturedProducts products={products} />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50 my-12 sm:my-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
                What Our{' '}
                <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
                  Customers
                </span>{' '}
                Say
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-3 sm:mt-4 px-4">
                Real stories from real people
              </p>
            </div>

            <Testimonials />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-bounce">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Stay Updated</h3>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/90 px-4">
                Subscribe to get special offers, free giveaways, and updates
              </p>
              
              {subscribed ? (
                <div className="flex items-center justify-center gap-2 text-lg sm:text-xl font-semibold animate-pulse">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 sm:px-6 py-3 sm:py-4 rounded-full text-gray-900 text-base sm:text-lg focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-full font-bold text-base sm:text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                  >
                    Subscribe
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 sm:mt-20">
          <Footer />
        </footer>
      </div>

      {/* Scroll to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center z-50"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default HomePage;