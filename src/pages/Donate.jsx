import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, CheckCircle, Shield, Truck } from 'lucide-react';
import { donationLevels } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';
import Newsletter from '../components/Newsletter';

const donationIcons = [Heart, undefined, undefined, undefined, undefined, Heart];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <PageHeader
        title="Support CGWI"
        subtitle="Your generosity fuels our mission to restore dignity and promote wellness."
        breadcrumb="Home / Donate"
      />

      {/* Donation CTA Banner */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary to-secondary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Every Gift Makes an Impact
            </h2>
            <p className="text-white/80 text-lg">
              Your donation goes directly to programs that provide grooming services, health education, 
              and community outreach to those who need it most.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Donation Levels */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Choose Your Impact"
            subtitle="Select a donation level or enter a custom amount."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {donationLevels.map((level, i) => (
              <motion.div
                key={level.amount}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setSelectedAmount(level.amount); setCustomAmount(''); }}
                className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all ${
                  selectedAmount === level.amount
                    ? 'border-primary shadow-lg shadow-primary/10'
                    : 'border-gray-100 hover:border-primary/30 hover:shadow-md'
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                  <level.icon className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-primary mb-2">${level.amount}</p>
                <p className="text-gray-600 text-sm">{level.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="max-w-md mx-auto mb-12">
            <label htmlFor="custom-amount" className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Or enter a custom amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg">$</span>
              <input
                id="custom-amount"
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                className="w-full pl-8 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none text-center text-lg font-medium"
                placeholder="Other amount"
              />
            </div>
          </div>

          {/* Donation Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto bg-secondary/10 border border-secondary/20 rounded-2xl p-8 text-center"
            >
              <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your generous support means the world to us. You will receive a confirmation email shortly.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleDonate}
              className="max-w-lg mx-auto space-y-6 bg-light rounded-2xl p-8 border border-gray-100"
            >
              <div>
                <label htmlFor="donor-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="donor-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="donor-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="donor-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="donor-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="donor-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none"
                  placeholder="Share a note with our team..."
                />
              </div>
              <button
                type="submit"
                disabled={!selectedAmount && !customAmount}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" /> Donate ${selectedAmount || customAmount || '0'}
              </button>
              <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> Secure donation processing
              </p>
            </motion.form>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
}
