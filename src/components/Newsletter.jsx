import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Container } from './SectionWrapper';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-primary-dark overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-5 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-5 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
      </div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay Connected
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Subscribe to our newsletter for updates on events, impact stories, and ways to get involved.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl border-0 text-dark placeholder-gray-400 focus:ring-2 focus:ring-white/50 outline-none"
            />
            <button
              type="submit"
              className="bg-dark hover:bg-dark/90 text-white px-6 py-3.5 rounded-xl font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              {subscribed ? (
                <><CheckCircle className="w-5 h-5" /> Subscribed</>
              ) : (
                <><Send className="w-5 h-5" /> Subscribe</>
              )}
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
