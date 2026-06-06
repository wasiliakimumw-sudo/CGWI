import { motion } from 'framer-motion';

export function Section({ children, className = '', id, dark = false }) {
  return (
    <section
      id={id}
      className={`py-16 lg:py-24 ${dark ? 'bg-dark text-white' : 'bg-light'} ${className}`}
    >
      {children}
    </section>
  );
}

export function Container({ children, className = '' }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ title, subtitle, light = false, centered = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-12 lg:mb-16`}
    >
      <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${light ? 'text-white' : 'text-dark'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed ${light ? 'text-gray-300' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function Card({ children, className = '', hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={hover ? { y: -5 } : undefined}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 transition-shadow ${
        hover ? 'hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
