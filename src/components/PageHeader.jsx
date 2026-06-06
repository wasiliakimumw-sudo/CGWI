import { motion } from 'framer-motion';
import { Container } from './SectionWrapper';

export default function PageHeader({ title, subtitle, breadcrumb }) {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-dark overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>
      <Container className="relative z-10">
        {breadcrumb && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 text-sm mb-4"
          >
            {breadcrumb}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </Container>
    </section>
  );
}
