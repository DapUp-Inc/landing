import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LandingNav from '../../components/landing/LandingNav';
import Footer from '../../components/landing/Footer';
import {
  Users,
  Briefcase,
  Check,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Calculator,
  DollarSign,
  Award,
  Target,
  ArrowRight
} from 'lucide-react';

const PricingPage = () => {
  const { user } = useAuth();
  const [selectedView, setSelectedView] = useState<'athlete' | 'brand'>('athlete');
  const [campaignAmount, setCampaignAmount] = useState<number>(1000);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate platform fee and total
  const platformFee = campaignAmount * 0.20;
  const totalCost = campaignAmount + platformFee;

  // Determine if user is logged in and what to show
  const isLoggedIn = !!user;
  const shouldShowTabs = !isLoggedIn; // Only show tabs if not logged in
  const currentView = selectedView;

  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation */}
      <LandingNav />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-dark-900">
        <div className="relative max-w-6xl lg:max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary-400" />
                <span className="text-primary-400 font-semibold text-sm">Simple, Transparent Pricing</span>
              </motion.div>

              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Connect, Create,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  Collaborate
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                {currentView === 'athlete'
                  ? 'Join for free. Connect with brands. Get paid for your influence.'
                  : 'No subscriptions. Pay only when you create campaigns. Scale with ease.'
                }
              </p>

              {/* View Toggle - Only show if not logged in */}
              {shouldShowTabs && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="inline-flex items-center gap-2 p-1 bg-dark-800/80 border border-white/10 rounded-xl mt-8"
                >
                  <button
                    onClick={() => setSelectedView('athlete')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedView === 'athlete'
                        ? 'bg-primary-500 text-dark-900 shadow-lg shadow-primary-500/30'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    For Athletes
                  </button>
                  <button
                    onClick={() => setSelectedView('brand')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedView === 'brand'
                        ? 'bg-primary-500 text-dark-900 shadow-lg shadow-primary-500/30'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    For Brands
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Athlete Pricing Section */}
      {currentView === 'athlete' && (
        <section className="py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
                <Users className="w-5 h-5 text-primary-400" />
                <span className="text-primary-400 font-semibold">For Athletes</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                100% Free Forever
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                No subscriptions. No hidden fees. Just you and your opportunities.
              </p>
            </motion.div>

            {/* Main Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-2 border-primary-500 shadow-2xl shadow-primary-500/20 p-8 md:p-12 mb-12"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 px-6 py-2 bg-primary-500 text-dark-900 text-sm font-bold rounded-full shadow-lg">
                  <Award className="w-4 h-4" />
                  ALWAYS FREE
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column - Price */}
                <div>
                  <div className="mb-8">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-6xl md:text-7xl font-bold text-white">$0</span>
                    </div>
                    <p className="text-primary-300 text-xl font-semibold">Forever free</p>
                    <p className="text-gray-400 mt-2">No credit card required</p>
                  </div>

                  <a
                    href="/signup"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-dark-900 font-bold rounded-lg hover:bg-primary-400 transition-all duration-200 shadow-lg shadow-primary-500/30 group"
                  >
                    Get Started Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Right Column - Features */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-white">Everything you need:</h3>
                  <ul className="space-y-4">
                    {[
                      'Unlimited campaign browsing',
                      'Connect with top brands',
                      'Apply to campaigns',
                      'Contract management tools',
                      'Deliverable tracking',
                      'Secure payment processing',
                      'Performance analytics',
                      'Direct messaging with brands',
                      'Profile & portfolio builder',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <div className="bg-dark-800/50 border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Keep 100%</h3>
                <p className="text-gray-400 text-sm">
                  You keep every dollar you earn. No platform fees, no commissions.
                </p>
              </div>

              <div className="bg-dark-800/50 border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Secure Payments</h3>
                <p className="text-gray-400 text-sm">
                  Get paid securely and on time. All payments processed through our platform.
                </p>
              </div>

              <div className="bg-dark-800/50 border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Grow Your Brand</h3>
                <p className="text-gray-400 text-sm">
                  Build your portfolio and connect with brands that align with your values.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Brand Pricing Section */}
      {currentView === 'brand' && (
        <section className="py-20 px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full mb-6">
                <Briefcase className="w-5 h-5 text-primary-400" />
                <span className="text-primary-400 font-semibold">For Brands</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pay-As-You-Go Campaign Creation
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                No subscriptions. No commitments. Pay only when you create campaigns.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Left Column - Pricing Details */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-2 border-primary-500 rounded-2xl p-8 md:p-10"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">All-Inclusive Platform Fee</h3>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-6xl md:text-7xl font-bold text-white">20%</span>
                  </div>
                  <p className="text-gray-300 text-lg">
                    Applied when your campaign goes live
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-white">What's included:</h4>
                  <ul className="space-y-3">
                    {[
                      'Patented AI campaign creation software',
                      'Athlete matching & discovery tools',
                      'Automated contract generation',
                      'Deliverable tracking & approval',
                      'Secure payment processing',
                      'Performance analytics dashboard',
                      'Direct messaging with athletes',
                      'Dedicated brand support',
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-200 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-dark-900 font-bold rounded-lg hover:bg-primary-400 transition-all duration-200 shadow-lg shadow-primary-500/30 group w-full justify-center"
                >
                  Start Creating Campaigns
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>

              {/* Right Column - Calculator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-dark-800 border border-white/10 rounded-2xl p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-2xl font-bold">Pricing Calculator</h3>
                </div>

                <div className="space-y-6">
                  {/* Slider Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3">
                      Campaign payment to athlete:
                    </label>
                    <div className="mb-4">
                      <input
                        type="range"
                        min="100"
                        max="10000"
                        step="100"
                        value={campaignAmount}
                        onChange={(e) => setCampaignAmount(Number(e.target.value))}
                        className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                      />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-gray-400">$</span>
                      <input
                        type="number"
                        value={campaignAmount}
                        onChange={(e) => setCampaignAmount(Number(e.target.value) || 0)}
                        className="text-3xl font-bold bg-transparent border-b-2 border-primary-500/30 focus:border-primary-500 outline-none w-full text-white"
                      />
                    </div>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-4 pt-6 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Campaign to athlete:</span>
                      <span className="text-white font-semibold text-lg">
                        ${campaignAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Platform fee (20%):</span>
                      <span className="text-primary-400 font-semibold text-lg">
                        ${platformFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-px bg-white/10"></div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-white font-bold text-lg">Total from wallet:</span>
                      <span className="text-white font-bold text-2xl">
                        ${totalCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Example Scenarios */}
                  <div className="bg-dark-700/50 rounded-xl p-4 mt-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Quick Examples:</h4>
                    <div className="space-y-2 text-sm">
                      <button
                        onClick={() => setCampaignAmount(500)}
                        className="flex justify-between w-full py-2 px-3 rounded-lg hover:bg-dark-600 transition-colors text-left"
                      >
                        <span className="text-gray-400">$500 campaign</span>
                        <span className="text-white font-medium">→ $600 total</span>
                      </button>
                      <button
                        onClick={() => setCampaignAmount(2000)}
                        className="flex justify-between w-full py-2 px-3 rounded-lg hover:bg-dark-600 transition-colors text-left"
                      >
                        <span className="text-gray-400">$2,000 campaign</span>
                        <span className="text-white font-medium">→ $2,400 total</span>
                      </button>
                      <button
                        onClick={() => setCampaignAmount(5000)}
                        className="flex justify-between w-full py-2 px-3 rounded-lg hover:bg-dark-600 transition-colors text-left"
                      >
                        <span className="text-gray-400">$5,000 campaign</span>
                        <span className="text-white font-medium">→ $6,000 total</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-dark-800/30 rounded-2xl p-8 md:p-10 mb-12"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">How It Works</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    icon: DollarSign,
                    title: 'Top Up Wallet',
                    description: 'Add funds to your DapUp wallet using credit card or bank transfer. Any amount, anytime.',
                  },
                  {
                    step: '2',
                    icon: Target,
                    title: 'Create Campaign',
                    description: 'Use our AI tools to create campaigns and connect with athletes that match your brand.',
                  },
                  {
                    step: '3',
                    icon: Zap,
                    title: 'Platform Fee Applies',
                    description: 'When your campaign goes live, the 20% platform fee is automatically calculated.',
                  },
                  {
                    step: '4',
                    icon: TrendingUp,
                    title: 'Scale Anytime',
                    description: 'Pause, resume, or scale up campaigns as needed. No commitments or contracts.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-8 h-8 text-primary-400" />
                    </div>
                    <div className="text-3xl font-bold text-primary-400 mb-2">{item.step}</div>
                    <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Value Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center">Why DapUp?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">Traditional Agencies</div>
                  <div className="text-2xl font-bold text-red-400 mb-1">30-50%</div>
                  <div className="text-xs text-gray-500">+ retainer fees</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 text-sm mb-2">In-House Team</div>
                  <div className="text-2xl font-bold text-orange-400 mb-1">$80K+</div>
                  <div className="text-xs text-gray-500">annual salary + tools</div>
                </div>
                <div className="text-center border-2 border-primary-500 rounded-xl p-4 -m-2">
                  <div className="text-primary-400 text-sm font-semibold mb-2">DapUp</div>
                  <div className="text-3xl font-bold text-primary-400 mb-1">20%</div>
                  <div className="text-xs text-primary-300">only when you create campaigns ✓</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-2 border-primary-500/50 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {currentView === 'athlete'
                ? 'Join thousands of athletes already monetizing their influence with DapUp.'
                : 'Join leading brands using DapUp to connect with talented athletes.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 text-dark-900 font-bold rounded-lg hover:bg-primary-400 transition-all duration-200 shadow-lg shadow-primary-500/30 group"
              >
                {currentView === 'athlete' ? 'Join Free Today' : 'Start Creating Campaigns'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:support@dapup.com"
                className="px-8 py-4 bg-dark-700 text-white font-semibold rounded-lg hover:bg-dark-600 transition-colors duration-200 border border-white/10"
              >
                Contact Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Hidden for now, might add later */}
      {/* <section className="py-20 px-4 md:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {[
                {
                  question: "Do brands have to pay for athletes who don't accept?",
                  answer: "No, brands only pay when athletes accept their campaigns and the campaigns go live. If an athlete declines or doesn't respond, there's no charge to your wallet."
                },
                {
                  question: "Can I cancel/delete later?",
                  answer: "Yes, you can pause or cancel campaigns at any time. For athletes, your account remains free forever with no commitments. Brands can pause campaigns, and unused wallet funds remain available for future use."
                },
                {
                  question: "How do payments work for athletes?",
                  answer: "Athletes receive payments directly to their connected bank account upon completing campaign deliverables. Once a brand approves your work, payment is processed automatically within 2-3 business days."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-dark-800 border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-dark-700/50 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-white pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-400 flex-shrink-0 transition-transform duration-300 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default PricingPage;
