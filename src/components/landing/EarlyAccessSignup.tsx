import { motion } from 'framer-motion';
import { Mail, ArrowRight, Users, Zap, Shield, Loader2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { submitWaitlist } from '../../services/googleAppsScript';

const EarlyAccessSignup = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await submitWaitlist({
        email: email.trim(),
        userType: userType as 'athlete' | 'brand' | 'university',
      });

      if (result.success) {
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail('');
          setUserType('');
        }, 5000);
      } else {
        setError(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Waitlist submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Users,
      title: "Priority Access",
      description: "Be among the first to join when we launch publicly"
    },
    {
      icon: Zap,
      title: "Early Features",
      description: "Get access to new features before anyone else"
    },
    {
      icon: Shield,
      title: "Founding Member Benefits",
      description: "Special rates and exclusive perks for early adopters"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-dark-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            Limited Beta Access
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Join the
            <span className="block text-primary-400">
              Waitlist
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2 sm:px-0">
            Get early access to the future of NIL advertising. Join thousands already on the waitlist 
            for exclusive beta access and founding member benefits.
          </p>
        </motion.div>

        {/* Main Signup Form */}
        <motion.div
          className="bg-dark-900 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* User Type Selection */}
              <div>
                <label className="block text-white font-semibold mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  I am a...
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { value: 'athlete', label: 'College Athlete', desc: 'Ready to monetize your brand' },
                    { value: 'brand', label: 'Brand/Business', desc: 'Looking for athlete partnerships' },
                    { value: 'university', label: 'University/AD', desc: 'Managing NIL compliance' }
                  ].map((type) => (
                    <motion.label
                      key={type.value}
                      className={`relative cursor-pointer p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 ${
                        userType === type.value 
                          ? 'border-primary-500 bg-primary-500/10' 
                          : 'border-white/20 bg-dark-800/50 hover:border-primary-500/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={type.value}
                        checked={userType === type.value}
                        onChange={(e) => setUserType(e.target.value)}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <div className="text-white font-semibold mb-1 text-sm sm:text-base leading-tight">{type.label}</div>
                        <div className="text-gray-400 text-xs sm:text-sm leading-snug">{type.desc}</div>
                      </div>
                      {userType === type.value && (
                        <div className="absolute top-2 right-2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-dark-700 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors text-base sm:text-lg"
                    required
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg sm:rounded-xl text-red-400"
                >
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm leading-relaxed">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!email || !userType || isLoading}
                className="w-full py-3 sm:py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-dark-900 font-bold rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 text-base sm:text-lg flex items-center justify-center"
                whileHover={email && userType && !isLoading ? { scale: 1.02 } : {}}
                whileTap={email && userType && !isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span className="whitespace-nowrap">Join Early Access Waitlist</span>
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div 
              className="text-center py-6 sm:py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-white text-xl sm:text-2xl font-bold"
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Welcome to the Waitlist!</h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 px-2">
                You're all set! We'll notify you as soon as early access becomes available.
              </p>
              <div className="text-primary-400 font-semibold text-sm sm:text-base">
                Check your email for confirmation details
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-4 sm:p-5 md:p-6 bg-dark-800/30 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default EarlyAccessSignup;
