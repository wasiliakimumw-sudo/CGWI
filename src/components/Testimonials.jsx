import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { testimonials } from '../data/constants';
import { Container, SectionHeader } from './SectionWrapper';

function Stars({ rating }) {
  return (
    <div className="flex gap-1 mb-3">
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <SectionHeader
          title="What People Say"
          subtitle="Hear from the individuals and partners whose lives have been touched by CGWI's work."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-light rounded-2xl p-6 lg:p-8 border border-gray-100"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <Stars rating={t.rating} />
              <p className="text-gray-700 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
