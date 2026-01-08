import { motion } from 'framer-motion';
import { Shield, Eye, FileText, Users, CheckCircle, AlertTriangle } from 'lucide-react';

const complianceFeatures = [
  {
    icon: Shield,
    title: "NCAA Compliance",
    description: "Built-in monitoring ensures all partnerships meet current NCAA Name, Image, Likeness regulations.",
    status: "Automated"
  },
  {
    icon: Eye,
    title: "Real-time Oversight",
    description: "Athletic departments get live dashboards to monitor all athlete partnerships and maintain compliance.",
    status: "24/7 Monitoring"
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Automatic contract generation and record-keeping for all NIL agreements and transactions.",
    status: "Complete Records"
  },
  {
    icon: Users,
    title: "Multi-stakeholder Access",
    description: "Transparent reporting for athletes, brands, athletic departments, and compliance officers.",
    status: "Full Transparency"
  }
];

const ComplianceSection = () => {
  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-tech-blue/3 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary-500/3 rounded-full blur-3xl" />
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
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Compliance & Trust
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Built for
            <span className="block bg-gradient-to-r from-green-400 via-tech-blue to-primary-500 bg-clip-text text-transparent">
              Complete Compliance
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Navigate NIL regulations with confidence. Our platform ensures every partnership 
            meets NCAA standards while providing full transparency to all stakeholders.
          </p>
        </motion.div>

        {/* Compliance Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {complianceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {feature.status}
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <Icon className="w-7 h-7 text-green-400 group-hover:text-green-300 transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-tech-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-white font-semibold mb-1">NCAA Compliant</div>
            <div className="text-gray-400 text-sm">All partnerships reviewed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-tech-blue mb-2">24/7</div>
            <div className="text-white font-semibold mb-1">Monitoring</div>
            <div className="text-gray-400 text-sm">Real-time oversight</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">50+</div>
            <div className="text-white font-semibold mb-1">University Partners</div>
            <div className="text-gray-400 text-sm">Trusted institutions</div>
          </div>
        </motion.div>

        {/* Athletic Department Dashboard Preview */}
        <motion.div 
          className="bg-gradient-dark border border-white/10 rounded-3xl p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Athletic Department Dashboard
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Give your compliance team complete visibility into all NIL activities 
              with real-time monitoring and automated reporting.
            </p>
          </div>

          {/* Dashboard Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: "Live Monitoring", desc: "Real-time partnership tracking" },
              { icon: FileText, title: "Auto Reports", desc: "Compliance documentation" },
              { icon: AlertTriangle, title: "Risk Alerts", desc: "Proactive issue detection" },
              { icon: Users, title: "Multi-user Access", desc: "Team collaboration tools" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center p-6 bg-dark-800/50 rounded-xl border border-white/5">
                  <div className="w-10 h-10 bg-tech-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-tech-blue" />
                  </div>
                  <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <motion.button
              className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Compliance Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Trust Statement */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-green-400 mr-3" />
              <span className="text-2xl font-bold text-white">Compliance Guarantee</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              We guarantee 100% NCAA compliance for all partnerships facilitated through our platform. 
              Our legal team continuously monitors regulatory changes and updates our systems accordingly, 
              ensuring your institution remains in full compliance at all times.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;
