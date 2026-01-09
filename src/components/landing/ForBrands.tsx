import { DollarSign, BarChart3, Users, Shield, Zap, Target } from 'lucide-react';
import SpotlightCard from '../ui/SpotlightCard';

const features = [
  {
    icon: DollarSign,
    title: "Budget Control",
    description: "Set your campaign budget and let our AI optimize spending across the most effective athlete partnerships.",
    highlight: "Smart spend optimization"
  },
  {
    icon: Target,
    title: "Automated Matching",
    description: "Our intelligent system finds athletes whose audience perfectly aligns with your target demographics.",
    highlight: "AI-powered targeting"
  },
  {
    icon: BarChart3,
    title: "Performance Tracking",
    description: "Track campaign progress through clear deliverables, timelines, and athlete participation.",
    highlight: "Live performance data"
  },
  {
    icon: Users,
    title: "Audience Insights",
    description: "Explore athlete audiences through direct access to their social media profiles and public engagement.",
    highlight: "Detailed audience data"
  },
  {
    icon: Shield,
    title: "Transparent Partnerships",
    description: "Campaign term sheets generated in-app to help align expectations and promote transparent partnerships between athletes and brands.",
    highlight: "Regulatory compliance"
  },
  {
    icon: Zap,
    title: "Instant Activation",
    description: "Campaigns go live in minutes, not weeks. No lengthy negotiations or complex contract processes.",
    highlight: "Rapid deployment"
  }
];

const ForBrands = () => {
  return (
    <section className="py-14 md:py-20 xl:py-24 xl2:py-28 2xl:py-32 bg-gradient-to-b from-dark-900 to-dark-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0" />

      <div className="max-w-7xl xl2:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 xs:px-5 md:px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl xl2:max-w-4xl mb-10 md:mb-14 xl2:mb-16 2xl:mb-20">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary-500/15 border border-primary-500/25 text-primary-300 text-xs xl2:text-sm font-medium mb-4 md:mb-5">
            For Brands & Businesses
          </div>
          <h2 className="font-display text-2xl xs:text-3xl md:text-5xl xl2:text-6xl font-semibold text-white mb-3 md:mb-4 xl2:mb-6">
            Marketing That Works
          </h2>
          <p className="text-base md:text-lg xl2:text-xl text-gray-300">
            Connect with college athletes who drive real engagement and measurable results.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl2:gap-10 2xl:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
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
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-sm xl2:text-base">
                  {feature.description}
                </p>

                {/* Highlight */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs xl2:text-sm font-medium">
                  {feature.highlight}
                </div>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Stats Section */}
        <div
          className="mt-10 md:mt-14 xl2:mt-16 2xl:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 xl2:gap-12 2xl:gap-16"
        >
          {[
            { value: "10x", label: "Higher Engagement", subtitle: "vs traditional ads" },
            { value: "478%", label: "ROI", subtitle: "$5.78 for every $1 Spent" },
            { value: "24/7", label: "Campaign Monitoring", subtitle: "Campaign details and terms available anytime" },
            { value: "Real-Time", label: "Insights into campaign progress", subtitle: "Instant Insights" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl xs:text-3xl md:text-4xl xl2:text-5xl font-bold bg-gradient-gold-blue bg-clip-text text-transparent mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-white font-semibold mb-1 text-sm md:text-base xl2:text-lg">{stat.label}</div>
              <div className="text-gray-400 text-xs md:text-sm xl2:text-base">{stat.subtitle}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 xl2:mt-20 2xl:mt-24 text-center">
          <div className="bg-gradient-dark border border-white/10 rounded-2xl p-6 xs:p-8 md:p-10 xl2:p-12 2xl:p-16">
            <h3 className="font-display text-xl xs:text-2xl md:text-3xl xl2:text-4xl font-semibold text-white mb-2 md:mb-3 xl2:mb-4">
              Ready to Transform Your Marketing?
            </h3>
            <p className="text-gray-300 text-sm md:text-base xl2:text-lg mb-5 md:mb-6 xl2:mb-8 max-w-2xl xl2:max-w-3xl mx-auto">
              Join forward-thinking brands leveraging athlete partnerships for authentic, high-performance campaigns.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 md:px-6 md:py-3 xl2:px-8 xl2:py-4 xl2:text-lg bg-primary-500 text-dark-900 font-semibold rounded-lg"
              onClick={(e) => e.preventDefault()}
            >
              Join Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForBrands;
