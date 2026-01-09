import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Instagram, ExternalLink, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import Logo from '../common/Logo';
import { submitNewsletter } from '../../services/googleAppsScript';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:hello@dapup.com', label: 'Email' }
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError(null);
    setNewsletterSuccess(false);
    setIsNewsletterLoading(true);

    try {
      const result = await submitNewsletter({
        email: newsletterEmail.trim(),
      });

      if (result.success) {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
        // Reset success message after 5 seconds
        setTimeout(() => {
          setNewsletterSuccess(false);
        }, 5000);
      } else {
        setNewsletterError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setNewsletterError('An unexpected error occurred. Please try again.');
      console.error('Newsletter submission error:', err);
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  const footerLinks = {
    Product: [
      { name: 'How It Works', href: '#how-it-works' },
      { name: 'For Brands', href: '#for-brands' },
      { name: 'For Athletes', href: '#for-athletes' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ]
  };

  return (
    <footer className="bg-dark-900 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl xl2:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16 relative z-10">
        {/* Main Footer Content */}
        <div className="py-14 xl2:py-16 2xl:py-20">
          <div className="grid lg:grid-cols-4 gap-10 xl2:gap-12 2xl:gap-16">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 xl2:mb-8">
                  <Logo className="h-8 xl2:h-9 w-auto" />
                </div>
                <p className="text-gray-300 xl2:text-lg mb-8 leading-relaxed max-w-md xl2:max-w-lg">
                  The first automated NIL advertising platform connecting brands with college athletes
                  through intelligent AI matching and complete compliance oversight.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4 xl2:space-x-5">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 xl2:w-12 xl2:h-12 bg-dark-800 border border-white/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="w-5 h-5 xl2:w-6 xl2:h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <div key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <h3 className="text-white font-semibold mb-4 xl2:mb-5 xl2:text-lg">{category}</h3>
                  <ul className="space-y-3 xl2:space-y-4">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <motion.a
                          href={link.href}
                          className="text-gray-400 xl2:text-base hover:text-primary-400 transition-colors duration-200 flex items-center group"
                          whileHover={{ x: 4 }}
                        >
                          {link.name}
                          {link.href.startsWith('http') && (
                            <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div
          className="py-10 xl2:py-12 2xl:py-14 border-t border-white/10"
        >
          <form className="max-w-lg xl2:max-w-xl mx-auto text-center" onSubmit={handleNewsletterSubmit} aria-label="Newsletter signup form">
            <h3 className="text-xl xl2:text-2xl font-semibold text-white mb-3 xl2:mb-4">
              Stay Updated
            </h3>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="flex flex-col gap-3 xl2:gap-4">
              <div className="flex gap-3 xl2:gap-4">
                <input
                  id="newsletter-email"
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 xl2:px-5 xl2:py-4 xl2:text-base bg-dark-800 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
                  required
                  disabled={isNewsletterLoading}
                />
                <button
                  type="submit"
                  disabled={isNewsletterLoading || !newsletterEmail.trim()}
                  className="px-6 py-3 xl2:px-8 xl2:py-4 xl2:text-base bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-dark-900 font-semibold rounded-lg transition-colors flex items-center justify-center min-w-[120px]"
                >
                  {isNewsletterLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </div>
              {/* Success Message */}
              {newsletterSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Successfully subscribed! Check your email.</span>
                </motion.div>
              )}
              {/* Error Message */}
              {newsletterError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{newsletterError}</span>
                </motion.div>
              )}
            </div>
          </form>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="py-8 xl2:py-10 border-t border-white/10 flex justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-gray-400 text-sm xl2:text-base">
            © {new Date().getFullYear()} DapUp. All rights reserved.
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="pb-8 xl2:pb-10 flex justify-center items-center space-x-8 xl2:space-x-10 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-gray-500 text-xs xl2:text-sm font-medium">NCAA COMPLIANT</div>
          <div className="w-px h-4 xl2:h-5 bg-gray-600" />
          <div className="text-gray-500 text-xs xl2:text-sm font-medium">SOC 2 TYPE II</div>
          <div className="w-px h-4 xl2:h-5 bg-gray-600" />
          <div className="text-gray-500 text-xs xl2:text-sm font-medium">GDPR READY</div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
