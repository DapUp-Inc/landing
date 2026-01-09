import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
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

  return (
    <section className="py-14 md:py-20 xl:py-24 bg-dark-800 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 xs:px-5 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs md:text-sm font-medium mb-4 md:mb-6">
            <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
            Limited Beta Access
          </div>
          <h2 className="text-2xl xs:text-3xl md:text-5xl xl:text-6xl font-bold text-white mb-4 md:mb-6">
            Join the
            <span className="block text-primary-400">
              Waitlist
            </span>
          </h2>
          <p className="text-base md:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto">
            Get early access to the future of NIL advertising. Join thousands already on the waitlist
            for exclusive beta access and founding member benefits.
          </p>
        </motion.div>

        {/* Main Signup Form */}
        <motion.div
          className="bg-dark-900 border border-white/10 rounded-2xl md:rounded-3xl p-5 xs:p-6 md:p-10 xl:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
              {/* User Type Selection */}
              <div>
                <label className="block text-white font-semibold mb-3 md:mb-4 text-center text-sm md:text-base">
                  I am a...
                </label>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { value: 'athlete', label: 'College Athlete', desc: 'Ready to monetize your brand' },
                    { value: 'brand', label: 'Brand/Business', desc: 'Looking for athlete partnerships' },
                    { value: 'university', label: 'University/AD', desc: 'Managing NIL compliance' }
                  ].map((type) => (
                    <motion.label
                      key={type.value}
                      className={`relative cursor-pointer p-3 md:p-4 rounded-xl border-2 transition-all duration-300 ${
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
                        <div className="text-white font-semibold mb-0.5 md:mb-1 text-sm md:text-base">{type.label}</div>
                        <div className="text-gray-400 text-xs md:text-sm">{type.desc}</div>
                      </div>
                      {userType === type.value && (
                        <div className="absolute top-2 right-2 w-3.5 h-3.5 md:w-4 md:h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-white font-semibold mb-2 md:mb-3 text-sm md:text-base">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-dark-700 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors text-base md:text-lg"
                    required
                    disabled={isLoading}
                  />
                  <Mail className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 md:p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                >
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span className="text-xs md:text-sm">{error}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!email || !userType || isLoading}
                className="w-full py-3 md:py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-dark-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 text-base md:text-lg flex items-center justify-center"
                whileHover={email && userType && !isLoading ? { scale: 1.02 } : {}}
                whileTap={email && userType && !isLoading ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 mr-2 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Join Early Access Waitlist</span>
                    <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center py-6 md:py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 text-white text-xl md:text-2xl font-bold">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Welcome to the Waitlist!</h3>
              <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                You're all set! We'll notify you as soon as early access becomes available.
              </p>
              <div className="text-primary-400 font-semibold text-sm md:text-base">
                Check your email for confirmation details
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default EarlyAccessSignup;
