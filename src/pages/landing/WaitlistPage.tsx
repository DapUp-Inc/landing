import { motion } from 'framer-motion';
import LandingNav from '../../components/landing/LandingNav';
import EarlyAccessSignup from '../../components/landing/EarlyAccessSignup';
import Footer from '../../components/landing/Footer';

const WaitlistPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <LandingNav />

      <main className="pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <section className="relative overflow-hidden pb-6 sm:pb-8 md:pb-10 bg-dark-850">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 xl2:px-12">
            <div className="text-center mb-8 sm:mb-10 md:mb-14">
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Limited seats while we scale onboarding
              </div>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-3 sm:mb-4 tracking-tight px-2 sm:px-0">
                Join the DapUp Waitlist
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                Reserve your spot for automated NIL campaigns. Share where you fit today and we&apos;ll notify you as soon as your cohort opens.
              </p>
            </div>
          </div>
        </section>

        <EarlyAccessSignup />
      </main>

      <Footer />
    </motion.div>
  );
};

export default WaitlistPage;
