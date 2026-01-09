import { Target, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Target,
    title: "Set Your Campaign",
    description: "Define goals, budget, and target athlete demographics.",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Match with your Ideal Athletes",
    description: "Brands collaborate with athletes whose values, audience, and goals align with each campaign",
    color: "primary"
  },
  {
    icon: TrendingUp,
    title: "Track Performance",
    description: "See campaign activity at a glance and keep track of athlete participation as campaigns move forward.",
    color: "primary"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-14 md:py-20 xl:py-24 xl2:py-28 2xl:py-32 bg-dark-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl xl2:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 xs:px-5 md:px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14 xl2:mb-16 2xl:mb-20">
          <h2 className="font-display text-2xl xs:text-3xl md:text-5xl xl2:text-6xl font-semibold text-white mb-3 md:mb-4 xl2:mb-6">
            How It Works
          </h2>
          <p className="text-base md:text-lg xl2:text-xl text-gray-300 max-w-3xl xl2:max-w-4xl mx-auto">How to Grow Your Brand Using DapUp</p>
        </div>

        {/* Steps - Horizontal Layout */}
        <div className="relative">
          {/* Connector line positioned below badges/icons to avoid overlap */}
          <div
            className="hidden lg:block absolute left-0 right-0 top-14 md:top-16 h-px bg-gradient-to-r from-transparent via-primary-500/25 to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12 xl2:gap-16 2xl:gap-20">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative text-center md:text-left"
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 w-12 h-12 xl2:w-14 xl2:h-14 bg-primary-500 text-dark-900 rounded-full flex items-center justify-center font-bold text-lg xl2:text-xl mx-auto md:mx-0 mb-6">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 flex justify-center md:justify-start">
                    <div className={`w-16 h-16 xl2:w-20 xl2:h-20 bg-primary-500/15 border border-primary-500/30 rounded-2xl flex items-center justify-center`}>
                      <Icon className={`w-8 h-8 xl2:w-10 xl2:h-10 text-primary-500`} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl xl2:text-2xl font-semibold text-white mb-3 xl2:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 xl2:text-lg leading-relaxed max-w-sm xl2:max-w-md mx-auto md:mx-0">
                    {step.description}
                  </p>

                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA placeholder */}
        <div className="text-center mt-14 xl2:mt-16 2xl:mt-20">
          <Link
            to="/waitlist"
            className="inline-flex items-center px-5 py-3 xl2:px-8 xl2:py-4 xl2:text-lg bg-primary-500 text-dark-900 font-semibold rounded-lg hover:bg-primary-400 transition-colors duration-200"
          >
            Join the waitlist
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
