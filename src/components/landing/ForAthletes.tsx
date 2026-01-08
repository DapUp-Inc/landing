import { motion } from 'framer-motion';
import { Smartphone, TrendingUp, Shield, Clock, Star, Zap } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

const benefits = [
  {
    icon: Smartphone,
    title: "Simple Mobile App",
    description: "Accept or decline brand partnerships with a single swipe. No complex negotiations or paperwork.",
    highlight: "One-tap decisions"
  },
  {
    icon: TrendingUp,
    title: "Maximize Your Value",
    description: "Our AI ensures you're matched with brands that value your audience and pay competitive rates.",
    highlight: "Fair compensation"
  },
  {
    icon: Shield,
    title: "Compliance Handled",
    description: "We manage all NCAA and state NIL regulations automatically, so you can focus on performance.",
    highlight: "Regulatory peace of mind"
  },
  {
    icon: Clock,
    title: "Instant Payments",
    description: "Get paid immediately upon campaign completion through secure, automated payment processing.",
    highlight: "No payment delays"
  },
  {
    icon: Star,
    title: "Build Your Brand",
    description: "Work with quality brands that align with your values and help grow your personal brand.",
    highlight: "Strategic partnerships"
  },
  {
    icon: Zap,
    title: "Performance Insights",
    description: "Track your campaign performance and audience growth with detailed analytics and insights.",
    highlight: "Data-driven growth"
  }
];

const ForAthletes = () => {
  return (
    <section className="py-20 xl:py-24 xl2:py-28 2xl:py-32 bg-gradient-to-b from-dark-800 to-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0" />

      <div className="max-w-7xl xl2:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl xl2:max-w-4xl mb-14 xl2:mb-16 2xl:mb-20">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/25 text-primary-300 text-xs xl2:text-sm font-medium mb-5">
            For College Athletes
          </div>
          <h2 className="font-display text-3xl md:text-5xl xl2:text-6xl font-semibold text-white mb-4 xl2:mb-6">
            Monetize Your Athletic Brand
          </h2>
          <p className="text-lg xl2:text-xl text-gray-300">
            Turn your social presence into real income with compliant, high‑quality partnerships.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl2:gap-10 2xl:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <SpotlightCard
                key={index}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 xl2:p-8 hover:border-primary-500/30 transition-colors duration-200"
                spotlightColor="rgba(96, 165, 250, 0.15)"
              >
                {/* Icon */}
                <div className="mb-5 xl2:mb-6">
                  <div className="w-12 h-12 xl2:w-14 xl2:h-14 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                    <Icon className="w-6 h-6 xl2:w-7 xl2:h-7 text-primary-400 group-hover:text-primary-300 transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg xl2:text-xl font-bold text-white mb-3 xl2:mb-4 group-hover:text-primary-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm xl2:text-base">
                  {benefit.description}
                </p>

                {/* Highlight */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs xl2:text-sm font-medium">
                  {benefit.highlight}
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* How It Works for Athletes */}
        <div
          className="mt-14 xl2:mt-16 2xl:mt-20"
        >
          <h3 className="font-display text-2xl md:text-3xl xl2:text-4xl font-semibold text-white text-center mb-10 xl2:mb-12">
            How Athletes Get Started
          </h3>

          <div className="grid md:grid-cols-4 gap-8 xl2:gap-12 2xl:gap-16">
            {[
              { step: "1", title: "Create Profile", desc: "Upload your stats, social media, and athletic achievements" },
              { step: "2", title: "Get Matched", desc: "Our AI connects you with relevant brand opportunities" },
              { step: "3", title: "Accept Deals", desc: "Review and accept campaigns that fit your brand" },
              { step: "4", title: "Get Paid", desc: "Complete campaigns and receive instant payments" }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="w-12 h-12 xl2:w-14 xl2:h-14 bg-gradient-to-r from-tech-cyan to-primary-500 rounded-full flex items-center justify-center text-dark-900 font-bold text-lg xl2:text-xl mx-auto mb-4">
                  {item.step}
                </div>

                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 xl2:top-7 left-full w-full h-px bg-gradient-to-r from-tech-cyan/50 to-transparent -z-10" />
                )}

                <h4 className="text-lg xl2:text-xl font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-sm xl2:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <motion.div
          className="mt-20 xl2:mt-24 2xl:mt-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-dark border border-white/10 rounded-3xl p-12 xl2:p-16 2xl:p-20 text-center">
            <div className="flex justify-center mb-6 xl2:mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 xl2:w-7 xl2:h-7 text-primary-500 fill-current" />
              ))}
            </div>
            <blockquote className="text-xl xl2:text-2xl text-gray-300 mb-6 xl2:mb-8 max-w-3xl xl2:max-w-4xl mx-auto italic">
              "DapUp made it so easy to monetize my social media while staying compliant.
              I've worked with amazing brands and earned more than I ever thought possible."
            </blockquote>
            <div className="text-white font-semibold xl2:text-lg">Sarah M.</div>
            <div className="text-gray-400 text-sm xl2:text-base">Division I Basketball Player</div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="mt-16 xl2:mt-20 2xl:mt-24 text-center">
          <h3 className="font-display text-2xl md:text-3xl xl2:text-4xl font-semibold text-white mb-3 xl2:mb-4">
            Ready to Start Earning?
          </h3>
          <p className="text-gray-300 xl2:text-lg mb-6 xl2:mb-8 max-w-2xl xl2:max-w-3xl mx-auto">
            Join college athletes earning through authentic brand partnerships.
          </p>
          <button
            type="button"
            className="px-6 py-3 xl2:px-8 xl2:py-4 xl2:text-lg bg-primary-500 text-dark-900 font-semibold rounded-lg"
            onClick={(e) => e.preventDefault()}
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForAthletes;
