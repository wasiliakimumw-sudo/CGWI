import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Container } from './SectionWrapper';

export default function DonateCTA() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-secondary to-secondary-dark overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur rounded-2xl mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Your Support Makes a Difference
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Every contribution, no matter the size, helps us reach more individuals with grooming services, health education, and hope.
          </p>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Donate Now <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
