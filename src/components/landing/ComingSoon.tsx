import { motion } from 'framer-motion';
import { Rocket, Users, Building, GraduationCap, Star, Calendar } from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Users,
    title: "Elite Athlete Partners",
    description: "Top-tier Division I athletes across major sports joining the platform",
    timeline: "Q2 2024",
    status: "recruiting" as const
  },
  {
    icon: Building,
    title: "Fortune 500 Brands",
    description: "Major brands preparing to launch comprehensive NIL campaigns",
    timeline: "Q2 2024",
    status: "partnerships" as const
  },
  {
    icon: GraduationCap,
    title: "University Integrations",
    description: "Direct integration with athletic department compliance systems",
    timeline: "Q3 2024",
    status: "development" as const
  }
];

const ComingSoon = () => {
  return (
    <section className="py-24 bg-dark-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-80 h-80 bg-tech-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-purple/20 border border-tech-purple/30 text-tech-purple text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            Coming Soon
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            What's
            <span className="block bg-gradient-to-r from-tech-purple via-primary-500 to-tech-cyan bg-clip-text text-transparent">
              Coming Next
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're constantly evolving the platform with new partnerships, 
            features, and integrations to make NIL advertising even more powerful.
          </p>
        </motion.div>

        {/* Upcoming Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {upcomingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            const statusColors = {
              recruiting: "text-tech-blue bg-tech-blue/20 border-tech-blue/30",
              partnerships: "text-primary-400 bg-primary-500/20 border-primary-500/30",
              development: "text-tech-purple bg-tech-purple/20 border-tech-purple/30"
            };

            return (
              <motion.div
                key={index}
                className="group relative bg-dark-700/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-tech-purple/30 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Timeline Badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center px-3 py-1 rounded-full bg-dark-600 text-gray-300 text-xs font-medium">
                    <Calendar className="w-3 h-3 mr-1" />
                    {feature.timeline}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-tech-purple/20 rounded-xl flex items-center justify-center group-hover:bg-tech-purple/30 transition-colors">
                    <Icon className="w-7 h-7 text-tech-purple group-hover:text-tech-purple transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-tech-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Status */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusColors[feature.status as keyof typeof statusColors]}`}>
                  <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
                  {feature.status === 'recruiting' && 'Actively Recruiting'}
                  {feature.status === 'partnerships' && 'Finalizing Partnerships'}
                  {feature.status === 'development' && 'In Development'}
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tech-purple/5 to-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Launch Timeline */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Platform Roadmap
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-primary-500 via-tech-blue to-tech-purple" />
            
            <div className="space-y-16">
              {[
                { 
                  phase: "Beta Launch", 
                  date: "Q1 2024", 
                  status: "current",
                  description: "Limited beta with select athletes and brands",
                  features: ["Core matching algorithm", "Basic compliance tools", "Mobile app beta"]
                },
                { 
                  phase: "Public Launch", 
                  date: "Q2 2024", 
                  status: "upcoming",
                  description: "Full platform launch with expanded features",
                  features: ["Advanced analytics", "University dashboards", "Payment automation"]
                },
                { 
                  phase: "Scale & Growth", 
                  date: "Q3-Q4 2024", 
                  status: "planned",
                  description: "National expansion and enterprise features",
                  features: ["Multi-sport coverage", "Enterprise integrations", "Advanced AI matching"]
                }
              ].map((milestone, index) => (
                <motion.div 
                  key={index}
                  className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary-500 to-tech-blue border-4 border-dark-800 z-10" />
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-dark-700/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                      {/* Status Badge */}
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                        milestone.status === 'current' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        milestone.status === 'upcoming' ? 'bg-tech-blue/20 text-tech-blue border border-tech-blue/30' :
                        'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {milestone.status === 'current' && <Star className="w-3 h-3 mr-1" />}
                        {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-2">{milestone.phase}</h4>
                      <div className="text-primary-400 font-semibold text-sm mb-3">{milestone.date}</div>
                      <p className="text-gray-300 mb-4">{milestone.description}</p>
                      
                      <div className="space-y-1">
                        {milestone.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-400">
                            <div className="w-1 h-1 bg-tech-blue rounded-full mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div 
          className="bg-gradient-dark border border-white/10 rounded-3xl p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay in the Loop
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Be the first to know about new features, athlete partnerships, and platform updates. 
            Get exclusive early access to new capabilities.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-dark-700 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <motion.button
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-dark-900 font-bold rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
