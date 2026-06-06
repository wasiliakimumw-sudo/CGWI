import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

function Counter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatCounter({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
            <stat.icon className="w-6 h-6" />
          </div>
          <Counter value={stat.value} suffix={stat.suffix} />
          <p className="text-gray-600 mt-1 font-medium">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
