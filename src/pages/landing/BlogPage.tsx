import { motion } from 'framer-motion';
import { ArrowUpRight, Tag, Calendar, Clock } from 'lucide-react';
import LandingNav from '../../components/landing/LandingNav';
import Footer from '../../components/landing/Footer';

const posts = [
  {
    title: "How brands can run compliant NIL campaigns at scale",
    tag: "Compliance",
    date: "Dec 12, 2025",
    readTime: "6 min read",
    summary: "A practical checklist for keeping offers transparent, communicating with schools, and documenting approvals.",
  },
  {
    title: "Building athlete-first workflows without slowing down marketing",
    tag: "Product",
    date: "Nov 18, 2025",
    readTime: "5 min read",
    summary: "What we learned designing onboarding, payouts, and messaging that keep athletes focused on performance.",
  },
  {
    title: "Budgeting NIL campaigns like a media plan",
    tag: "Performance",
    date: "Oct 30, 2025",
    readTime: "7 min read",
    summary: "Forecast reach, set caps, and monitor results with the same rigor as paid social—now applied to NIL.",
  },
];

const BlogPage = () => {
  return (
    <motion.div
      className="min-h-screen bg-dark-900 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <LandingNav />

      <main className="pt-28 pb-16 md:pt-32 md:pb-20">
        <section className="relative max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12 mb-14 md:mb-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-14 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tech-blue/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-semibold mb-4">
              DapUp Insights
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight">Blog</h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Updates, playbooks, and compliance notes for running effective NIL advertising. New long-form guides launch soon.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 lg:px-8 xl:px-10 xl2:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <motion.article
                key={post.title}
                className="bg-dark-800/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300">
                    <Tag className="w-4 h-4" />
                    {post.tag}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-3">{post.title}</h2>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{post.summary}</p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-200 font-semibold"
                    onClick={(e) => e.preventDefault()}
                  >
                    Full post coming soon
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
};

export default BlogPage;
