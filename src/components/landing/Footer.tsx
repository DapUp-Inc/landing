import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Mail, href: 'mailto:hello@dapup.com', label: 'Email' }
  ];

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
      <div className="max-w-7xl xl2:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 xs:px-5 md:px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16 relative z-10">
        {/* Main Footer Content */}
        <div className="py-10 md:py-14 xl2:py-16 2xl:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10 xl2:gap-12 2xl:gap-16">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-3 lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-4 md:mb-6 xl2:mb-8">
                  <Logo className="h-6 md:h-8 xl2:h-9 w-auto" />
                </div>
                <p className="text-gray-300 text-sm md:text-base xl2:text-lg mb-6 md:mb-8 leading-relaxed max-w-md xl2:max-w-lg">
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
          className="pb-6 md:pb-8 xl2:pb-10 flex flex-wrap justify-center items-center gap-4 md:gap-0 md:space-x-8 xl2:space-x-10 opacity-60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-gray-500 text-xs xl2:text-sm font-medium">NCAA COMPLIANT</div>
          <div className="hidden md:block w-px h-4 xl2:h-5 bg-gray-600" />
          <div className="text-gray-500 text-xs xl2:text-sm font-medium">SOC 2 TYPE II</div>
          <div className="hidden md:block w-px h-4 xl2:h-5 bg-gray-600" />
          <div className="text-gray-500 text-xs xl2:text-sm font-medium">GDPR READY</div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
