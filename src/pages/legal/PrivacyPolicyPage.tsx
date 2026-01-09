import { motion } from 'framer-motion';
import LandingNav from '../../components/landing/LandingNav';
import Footer from '../../components/landing/Footer';

const sections = [
  {
    title: "Data We Collect",
    bullets: [
      "Contact information you provide (like name, email, organization, role) when you join the waitlist or contact us.",
      "Usage data about how you interact with our sites and campaigns (pages viewed, device and browser metadata, referral source, approximate location).",
      "Cookies and similar technologies to remember preferences, improve performance, and measure audience reach; you can control cookies through your browser settings.",
      "Information shared in communications with us (support emails, feedback, or survey responses)."
    ],
  },
  {
    title: "How We Use Information",
    bullets: [
      "To operate, secure, and improve the DapUp marketing site and future NIL platform.",
      "To communicate with you about the waitlist, product updates, and relevant marketing (with opt-out links in every marketing message).",
      "To analyze aggregated usage trends, measure campaign performance, and prevent fraud or abuse.",
      "To comply with legal obligations and enforce our terms."
    ],
  },
  {
    title: "Sharing & Disclosure",
    bullets: [
      "Service providers that help us run the site (hosting, analytics, email delivery) under contracts that require data protection.",
      "Professional advisors and regulators when required to protect our rights, comply with law, or respond to lawful requests.",
      "Business transfers if we merge, acquire, or sell assets; we will continue to protect your data under this policy.",
      "We do not sell personal information."
    ],
  },
  {
    title: "Retention & Security",
    bullets: [
      "We keep personal data only as long as needed for the purposes above, then delete or de-identify it.",
      "Data may be processed in the United States and other countries; we use appropriate safeguards for cross-border transfers where required.",
      "We apply administrative, technical, and physical safeguards; no system is perfectly secure, so please use strong passwords when applicable."
    ],
  },
  {
    title: "Your Choices & Rights",
    bullets: [
      "You can request access, correction, deletion, or a copy of your data where applicable (e.g., GDPR/EEA, UK, California).",
      "You can opt out of marketing emails at any time using the link in the message.",
      "Browser settings let you manage cookies; blocking some cookies may impact site performance.",
      "To exercise rights, contact privacy@dapup.com with enough detail to verify your request."
    ],
  },
  {
    title: "Children",
    bullets: [
      "The marketing site is not directed to children under 13, and we do not knowingly collect their data. If you believe a child provided data, contact us to remove it."
    ],
  },
  {
    title: "Updates & Contact",
    bullets: [
      "We may update this policy as our practices evolve. We will note the “Last updated” date below and post changes here.",
      "Questions or requests: privacy@dapup.com"
    ],
  },
];

const lastUpdated = "January 8, 2026";

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <LandingNav />

      <main className="pt-28 pb-16 md:pt-32 md:pb-20">
        <section className="relative max-w-5xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 right-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-4">
                Privacy Commitment
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                How DapUp collects, uses, and protects your information on our marketing experiences and waitlist forms.
              </p>
              <p className="text-gray-400 text-sm md:text-base mt-3">Last updated: {lastUpdated}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <motion.div
                  key={section.title}
                  className="bg-dark-800/50 border border-white/10 rounded-2xl p-6 md:p-7 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                  <ul className="space-y-2.5 text-gray-300 text-sm md:text-base leading-relaxed">
                    {section.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-primary-500 flex-shrink-0" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default PrivacyPolicyPage;
