import { motion } from 'framer-motion';
import { Mail, ArrowRight, Users, Zap, Shield } from 'lucide-react';
import { useState } from 'react';

const EarlyAccessSignup = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Email:', email, 'User Type:', userType);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      setUserType('');
    }, 3000);
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
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-tech-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <Mail className="w-4 h-4 mr-2" />
            Limited Beta Access
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Join the
            <span className="block bg-gradient-gold-blue bg-clip-text text-transparent">
              Waitlist
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get early access to the future of NIL advertising. Join thousands already on the waitlist 
            for exclusive beta access and founding member benefits.
          </p>
        </motion.div>

        {/* Main Signup Form */}
        <motion.div 
          className="bg-gradient-dark border border-white/10 rounded-3xl p-12 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* User Type Selection */}
              <div>
                <label className="block text-white font-semibold mb-4 text-center">
                  I am a...
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'athlete', label: 'College Athlete', desc: 'Ready to monetize your brand' },
                    { value: 'brand', label: 'Brand/Business', desc: 'Looking for athlete partnerships' },
                    { value: 'university', label: 'University/AD', desc: 'Managing NIL compliance' }
                  ].map((type) => (
                    <motion.label
                      key={type.value}
                      className={`relative cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
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
                        <div className="text-white font-semibold mb-1">{type.label}</div>
                        <div className="text-gray-400 text-sm">{type.desc}</div>
                      </div>
                      {userType === type.value && (
                        <div className="absolute top-2 right-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </motion.label>
                  ))}
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-dark-700 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors text-lg"
                    required
                  />
                  <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!email || !userType}
                className="w-full py-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-dark-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 text-lg flex items-center justify-center"
                whileHover={email && userType ? { scale: 1.02 } : {}}
                whileTap={email && userType ? { scale: 0.98 } : {}}
              >
                <span>Join Early Access Waitlist</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </form>
          ) : (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  ✓
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Welcome to the Waitlist!</h3>
              <p className="text-gray-300 mb-6">
                You're all set! We'll notify you as soon as early access becomes available.
              </p>
              <div className="text-primary-400 font-semibold">
                Check your email for confirmation details
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
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
                className="text-center p-6 bg-dark-800/30 backdrop-blur-sm border border-white/10 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-primary-500 mb-1">2,500+</div>
              <div className="text-gray-400 text-sm">On Waitlist</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tech-blue mb-1">150+</div>
              <div className="text-gray-400 text-sm">Athletes Signed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tech-cyan mb-1">25+</div>
              <div className="text-gray-400 text-sm">Brand Partners</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EarlyAccessSignup;
