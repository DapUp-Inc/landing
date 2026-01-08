import { motion } from 'framer-motion';
import LandingNav from '../../components/landing/LandingNav';
import Hero from '../../components/landing/Hero';
import HowItWorks from '../../components/landing/HowItWorks';
import ForBrands from '../../components/landing/ForBrands';
import ForAthletes from '../../components/landing/ForAthletes';
// import ComplianceSection from '../../components/landing/ComplianceSection';
// import ComingSoon from '../../components/landing/ComingSoon';
// import EarlyAccessSignup from '../../components/landing/EarlyAccessSignup';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
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
      <Hero />
      
      {/* How It Works */}
      <div id="how-it-works">
        <HowItWorks />
      </div>
      
      {/* For Brands */}
      <div id="for-brands">
        <ForBrands />
      </div>
      
      {/* For Athletes */}
      <div id="for-athletes">
        <ForAthletes />
      </div>
      
      {/* Non-v1 sections removed: Compliance, Coming Soon, Early Access */}
      
      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default LandingPage;
