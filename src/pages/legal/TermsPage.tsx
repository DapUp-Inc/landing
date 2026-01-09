import { motion } from 'framer-motion';
import LandingNav from '../../components/landing/LandingNav';
import Footer from '../../components/landing/Footer';

const sections = [
  {
    title: "Acceptance & Scope",
    bullets: [
      "These Terms govern your access to DapUp marketing sites and waitlist experiences. By browsing or submitting your information, you agree to these Terms.",
      "If you use DapUp on behalf of a company, you represent you have authority to bind that company to these Terms.",
      "You must be at least 18 (or the age of majority in your location) to use this site."
    ],
  },
  {
    title: "Use of the Site",
    bullets: [
      "Do not misuse the site, interfere with security, attempt unauthorized access, or use automated scraping without permission.",
      "Content is provided for informational purposes about future products; availability and features may change.",
      "You are responsible for the accuracy of information you submit (e.g., waitlist details or feedback)."
    ],
  },
  {
    title: "Intellectual Property",
    bullets: [
      "All site content, branding, and materials are owned by DapUp or its licensors and protected by law.",
      "You receive a limited, revocable right to access and view the site for your internal evaluation; no resale, reverse engineering, or derivative works.",
      "If you provide feedback, you grant DapUp a worldwide, royalty-free license to use it to improve our offerings."
    ],
  },
  {
    title: "Compliance & NIL Guidance",
    bullets: [
      "DapUp supports compliant name, image, and likeness (NIL) activity. You are responsible for meeting school, conference, and state requirements.",
      "We do not provide legal, financial, or tax advice. Consult your advisors for compliance with NCAA and applicable regulations."
    ],
  },
  {
    title: "Disclaimers",
    bullets: [
      "The site is provided “as is” without warranties of any kind, including availability, accuracy, or fitness for a particular purpose.",
      "We do not guarantee campaign outcomes, earnings, or partnerships. Pre-release information may change before launch."
    ],
  },
  {
    title: "Limitation of Liability",
    bullets: [
      "To the maximum extent permitted by law, DapUp is not liable for indirect, incidental, special, or consequential damages, or lost profits/revenue.",
      "Our total liability for claims relating to the site will not exceed $100."
    ],
  },
  {
    title: "Third Parties & Links",
    bullets: [
      "Links to third-party sites are provided for convenience and are not endorsements. Their terms and privacy practices apply separately.",
      "Service providers supporting the site (hosting, analytics, email) operate under agreements requiring appropriate safeguards."
    ],
  },
  {
    title: "Termination",
    bullets: [
      "We may suspend or restrict access at any time for any reason, including suspected misuse or security risks.",
      "You may stop using the site at any time; provisions that by nature should survive (e.g., intellectual property, disclaimers, liability limits) will remain in effect."
    ],
  },
  {
    title: "Governing Law & Disputes",
    bullets: [
      "These Terms are governed by U.S. federal law and the laws of the State of Delaware, without regard to conflict-of-law principles.",
      "Any disputes will be resolved in the state or federal courts located in Delaware, and you consent to their jurisdiction."
    ],
  },
  {
    title: "Changes & Contact",
    bullets: [
      "We may update these Terms periodically. When we do, we will revise the “Last updated” date below and post the new version here.",
      "Questions: legal@dapup.com"
    ],
  },
];

const lastUpdated = "January 8, 2026";

const TermsPage = () => {
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
            <div className="absolute top-10 right-1/4 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 left-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10 md:mb-14">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-4">
                Legal Terms
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight">
                Terms of Service
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Rules for using DapUp marketing properties and joining the waitlist before launch.
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

export default TermsPage;
