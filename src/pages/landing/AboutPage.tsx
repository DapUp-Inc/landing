import { motion } from 'framer-motion';
import { Shield, LineChart, Handshake, Sparkles, Globe2, BadgeCheck } from 'lucide-react';
import LandingNav from '../../components/landing/LandingNav';
import Footer from '../../components/landing/Footer';

const pillars = [
  {
    icon: Shield,
    title: 'Compliance First',
    description: 'Built to align with NCAA guidance, school policies, and state NIL rules so brands and athletes stay protected.',
  },
  {
    icon: LineChart,
    title: 'Performance Driven',
    description: 'Automated matching, transparent workflows, and real-time analytics so budgets translate into measurable outcomes.',
  },
  {
    icon: Handshake,
    title: 'Aligned Incentives',
    description: 'Clear communication, approvals, and payouts to keep every stakeholder on the same page.',
  },
];

const differentiators = [
  { title: 'University-friendly', description: 'Designed with athletic departments and compliance teams in mind.' },
  { title: 'Brand-safe inventory', description: 'Pre-vetted athlete profiles and deal templates reduce risk.' },
  { title: 'Athlete-first experience', description: 'Simple onboarding, .edu validation, and transparent earnings.' },
  { title: 'Security & privacy', description: 'SOC 2 principles, least-privilege access, and GDPR-ready controls.' },
];

const AboutPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <LandingNav />

      <main className="pt-28 pb-16 md:pt-32 md:pb-20">
        {/* Hero */}
        <section className="relative max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-tech-blue/10 rounded-full blur-[140px]" />
          </div>
          <div className="relative z-10 text-center mb-14 md:mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-4">
              About DapUp
            </div>
            <h1 className="font-display text-3xl md:text-5xl xl:text-6xl font-semibold mb-4 tracking-tight">
              Automating compliant NIL partnerships
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              We connect brands with college athletes using transparent workflows, compliance guardrails, and real-time reporting—so marketing teams can scale NIL campaigns with confidence.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 mb-16 md:mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="bg-dark-800/60 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/15 border border-primary-500/30 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{pillar.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 mb-16 md:mb-20">
          <div className="bg-gradient-dark border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-10 top-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-tech-blue/10 rounded-full blur-3xl" />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-primary-300 font-semibold mb-3">Our mission</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Give every program and athlete a safe way to monetize their influence</h2>
                <p className="text-gray-300 leading-relaxed">
                  DapUp was founded to remove the friction between brands, athletes, and compliance teams. We are building infrastructure that keeps offers transparent, approvals auditable, and payouts tracked—so schools stay confident and athletes stay focused on performance.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary-400 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Automation that respects policy</p>
                    <p className="text-gray-300 text-sm leading-relaxed">Automated matching, templated workflows, and approval paths tuned for NIL oversight.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BadgeCheck className="w-5 h-5 text-primary-400 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Security and trust</p>
                    <p className="text-gray-300 text-sm leading-relaxed">Least-privilege access, audit trails, and a roadmap toward SOC 2 Type II readiness.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-primary-400 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Built for scale</p>
                    <p className="text-gray-300 text-sm leading-relaxed">From single campaigns to nationwide launches, we keep workflows consistent and measurable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((item) => (
              <motion.div
                key={item.title}
                className="bg-dark-800/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default AboutPage;
