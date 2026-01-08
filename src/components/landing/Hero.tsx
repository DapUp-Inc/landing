import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import heroImage from '../../assets/hero1.png';
import LightRays from '../ui/LightRays';
import BlurText from '../ui/BlurText';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[75vh] xl2:min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">
      {/* Clean Background with Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Futuristic Sports Analytics"
          className="w-full h-full object-cover opacity-30 object-[55%_50%] md:object-center xl2:object-[52%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-dark-900/75 to-dark-900/95" />
      </div>

      {/* Light Rays Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#60a5fa"
          raysSpeed={0.5}
          lightSpread={1.5}
          rayLength={2.5}
          fadeDistance={1.2}
          saturation={1.2}
          followMouse={false}
          pulsating={false}
          className="opacity-70"
        />
      </div>

      {/* Minimal overlay only – reduce motion */}
      <div className="absolute inset-0 z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl lg:max-w-7xl xl2:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 xs:px-5 md:px-6 lg:px-8 xl:px-10 xl2:px-12 2xl:px-16 py-14 md:py-16 xl:py-20 xl2:py-24 2xl:py-28">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 xl2:gap-12 2xl:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left lg:col-span-7"
          >
            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5 animate-pulse"></span>
              Join the Waitlist
            </motion.div>

            {/* Modern Headline with Better Typography */}
            <h1 className="font-display font-semibold mb-4 md:mb-5 xl2:mb-6 tracking-tight">
              <BlurText
                text="Automated NIL Advertising"
                className="text-white text-3xl xs:text-4xl md:text-6xl xl2:text-6xl 2xl:text-7xl leading-tight font-display font-semibold"
                delay={50}
                animateBy="words"
              />
              <span className="block text-3xl xs:text-4xl md:text-6xl xl2:text-6xl 2xl:text-7xl leading-tight text-primary-500">for Brands and Athletes</span>
            </h1>

            {/* Improved Subheadline */}
            <p className="text-sm xs:text-base md:text-lg xl2:text-xl text-gray-300 mb-6 md:mb-8 xl2:mb-10 leading-relaxed max-w-xl xl2:max-w-2xl">
              Connect brands with college athletes through intelligent matching and transparent workflows.
              <span className="block mt-1 text-white">Set budgets. Get results. Stay compliant.</span>
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/signup')}
              className="inline-flex items-center px-6 py-3 xl2:px-8 xl2:py-4 xl2:text-lg bg-primary-500 hover:bg-primary-600 text-dark-900 font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 mb-8 xl2:mb-10"
            >
              Get Started
            </button>

            {/* Clean Trust Indicators */}
            <div className="pt-5 md:pt-6 xl2:pt-8 border-t border-white/10 mt-6 xl2:mt-8">
              <p className="text-gray-400 text-xs md:text-sm xl2:text-base mb-4 md:mb-6 font-medium">Building relationships with athletes, universities and businesses</p>
              <p className="text-gray-500 text-xs xl2:text-sm mb-3 xl2:mb-4 font-medium">Potential Reach via DapUp</p>
              <div className="flex gap-12 xl2:gap-16 2xl:gap-20">
                <div>
                  <div className="text-xl md:text-2xl xl2:text-3xl font-bold text-primary-400 mb-1">520,000+</div>
                  <div className="text-gray-500 text-sm xl2:text-base font-medium">NCAA Athletes</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl xl2:text-3xl font-bold text-primary-400 mb-1">1,100+</div>
                  <div className="text-gray-500 text-sm xl2:text-base font-medium">NCAA Schools</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl xl2:text-3xl font-bold text-primary-400 mb-1">$1.67B</div>
                  <div className="text-gray-500 text-sm xl2:text-base font-medium">NIL Market Size</div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* Right column removed for minimal hero */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </div>

      {/* Scroll indicator removed for minimal motion */}
    </section>
  );
};

export default Hero;
