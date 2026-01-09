import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const LandingNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'How It Works', href: '#how-it-works', isLink: false },
    { name: 'For Brands', href: '#for-brands', isLink: false },
    { name: 'For Athletes', href: '#for-athletes', isLink: false },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 pt-4 xl2:pt-5 px-4 md:px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex justify-center items-start relative">
          {/* Logo */}
              <Link
                to="/"
                className="fixed top-4 xl2:top-5 left-4 md:left-6 lg:left-8 xl:left-10 xl2:left-12 2xl:left-16 z-50 flex items-center gap-4"
                onClick={() => window.scrollTo(0, 0)}
              >
                <Logo className="h-6 xl2:h-7 w-auto" />
              </Link>
          {/* Floating Pill Container */}
          <div className="bg-white/10 backdrop-blur-md backdrop-saturate-150 border border-white/20 rounded-full pl-4 md:pl-6 xl2:pl-8 pr-4 md:pr-12 xl2:pr-14 py-2 md:py-2.5 xl2:py-3 shadow-lg shadow-black/20 w-fit">
            <div className="flex items-center gap-4 md:gap-16 xl2:gap-20 2xl:gap-24">

              {/* Desktop Navigation - Center */}
              <div className="hidden md:flex items-center space-x-12 lg:space-x-14 xl2:space-x-16 2xl:space-x-20">
                {navItems.map((item, index) => (
                  item.isLink ? (
                    <Link
                      key={index}
                      to={item.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium text-sm xl2:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 rounded whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <motion.a
                      key={index}
                      href={`/${item.href}`}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium text-sm xl2:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 rounded whitespace-nowrap"
                      whileHover={{ y: -1 }}
                      onClick={(e) => {
                        const element = document.querySelector(item.href);
                        if (element) {
                          e.preventDefault();
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {item.name}
                    </motion.a>
                  )
                ))}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <motion.button
                  className="text-gray-300 hover:text-white transition-colors p-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Buttons - Top Right */}
      <motion.div
        className="fixed top-4 xl2:top-5 right-4 md:right-6 lg:right-8 xl:right-10 xl2:right-12 2xl:right-16 z-50 flex items-center gap-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link
          to="/waitlist"
          className="hidden md:flex px-5 py-2.5 xl2:px-6 xl2:py-3 xl2:text-base bg-primary-500 text-dark-900 font-semibold rounded-full transition-all duration-200 items-center hover:bg-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 whitespace-nowrap shadow-lg shadow-black/20"
        >
          Join waitlist
          <ArrowRight className="ml-2 w-4 h-4 xl2:w-5 xl2:h-5" />
        </Link>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden fixed top-14 left-0 right-0 z-40 ${isMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-dark-900/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item, index) => (
              item.isLink ? (
                <Link
                  key={index}
                  to={item.href}
                  className="block text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <motion.a
                  key={index}
                  href={`/${item.href}`}
                  className="block text-gray-300 hover:text-primary-400 transition-colors duration-300 font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={(e) => {
                    const element = document.querySelector(item.href);
                    if (element) {
                      e.preventDefault();
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {item.name}
                </motion.a>
              )
            ))}
            
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link
                to="/waitlist"
                className="w-full px-4 py-3 bg-primary-500 text-dark-900 font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Join waitlist
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LandingNav;
