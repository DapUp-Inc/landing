import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  index?: number;
}

const PricingCard = ({
  title,
  description,
  price,
  priceSubtext,
  features,
  highlighted = false,
  badge,
  ctaText = 'Get Started',
  ctaLink = '/signup',
  index = 0,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        highlighted
          ? 'bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-2 border-primary-500 shadow-xl shadow-primary-500/20'
          : 'bg-dark-800/50 border border-white/10 hover:border-primary-500/50'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary-500 text-dark-900 text-sm font-semibold rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
            {badge}
          </span>
        </div>
      )}

      {/* Title & Description */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">{price}</span>
        </div>
        {priceSubtext && (
          <p className="text-gray-400 text-sm mt-1">{priceSubtext}</p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        to={ctaLink}
        className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
          highlighted
            ? 'bg-primary-500 text-dark-900 hover:bg-primary-400 shadow-lg shadow-primary-500/30'
            : 'bg-dark-700 text-white hover:bg-dark-600 border border-white/10'
        }`}
      >
        {ctaText}
      </Link>
    </motion.div>
  );
};

export default PricingCard;
