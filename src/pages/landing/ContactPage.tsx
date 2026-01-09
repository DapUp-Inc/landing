import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import LandingNav from '../../components/landing/LandingNav';
import Footer from '../../components/landing/Footer';

const contacts = [
  { icon: Mail, label: 'General', value: 'hello@dapup.com' },
  { icon: Mail, label: 'Partnerships', value: 'partnerships@dapup.com' },
  { icon: Mail, label: 'Compliance', value: 'compliance@dapup.com' },
  { icon: Phone, label: 'Phone', value: '+1 (512) 555-0173' },
  { icon: MapPin, label: 'HQ', value: 'Austin, TX' },
];

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('brand');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Placeholder for future SMTP/API integration
    console.log({ name, email, company, role, message });
  };

  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <LandingNav />

      <main className="pt-28 pb-16 md:pt-32 md:pb-20">
        <section className="relative max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 mb-14 md:mb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-14 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-4">
              Contact
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight">Talk with DapUp</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Reach out for partnerships, compliance questions, or media. We respond within one business day.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            {contacts.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  className="bg-dark-800/60 border border-white/10 rounded-2xl p-5 flex items-start gap-3 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-500/15 border border-primary-500/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-wide">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}
            <motion.div
              className="bg-dark-800/60 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-white font-semibold mb-2">Availability</p>
              <p className="text-gray-300 text-sm leading-relaxed">
                Monday–Friday, 9am–6pm CT. We prioritize compliance and partnership inquiries from schools and brands.
              </p>
            </motion.div>
          </div>

          <motion.div
            className="md:col-span-2 bg-gradient-dark border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {!submitted ? (
              <form className="space-y-5" onSubmit={onSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800/60 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder="Alex Johnson"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800/60 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company / School</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800/60 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                      placeholder="DapUp Partners"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 bg-dark-800/60 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="brand">Brand / agency</option>
                      <option value="university">University / compliance</option>
                      <option value="athlete">Athlete</option>
                      <option value="media">Media / press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">How can we help?</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-36 px-4 py-3 bg-dark-800/60 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
                    placeholder="Share details about your campaigns, compliance needs, or integration questions."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-dark-900 font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-primary-500/25"
                >
                  Send message
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="text-center space-y-3">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold">
                  Received
                </div>
                <h2 className="text-2xl font-bold">Thanks for reaching out</h2>
                <p className="text-gray-300 max-w-xl mx-auto">
                  We have your message and will respond within one business day. For urgent compliance questions, email compliance@dapup.com.
                </p>
              </div>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default ContactPage;
