import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Heart, Users, Scissors, Stethoscope, Globe, HandHeart, Camera } from 'lucide-react';
import { volunteeringRoles } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';

const roleIcons = [Scissors, Stethoscope, Globe, Users, HandHeart, Camera];

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    availability: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', role: '', availability: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <PageHeader
        title="Volunteer With Us"
        subtitle="Join our team of dedicated volunteers and make a tangible difference in your community."
        breadcrumb="Home / Volunteer"
      />

      {/* Volunteer Roles */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Ways to Volunteer"
            subtitle="There is a role for everyone, regardless of your background or experience."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {volunteeringRoles.map((role, i) => {
              const Icon = roleIcons[i];
              return (
                <Card key={role.title}>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{role.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Registration Form */}
          <SectionHeader
            title="Sign Up to Volunteer"
            subtitle="Fill out the form below and our team will reach out with the next steps."
          />
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary/10 border border-secondary/20 rounded-2xl p-8 text-center"
              >
                <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  We have received your volunteer application. Our team will contact you within 48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-light rounded-2xl p-8 border border-gray-100"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Role *
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                    >
                      <option value="">Select a role</option>
                      {volunteeringRoles.map((r) => (
                        <option key={r.title} value={r.title}>{r.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>How much time can you commit?</span>
                  </div>
                  <select
                    id="availability"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select availability</option>
                    <option value="weekly">A few hours weekly</option>
                    <option value="monthly">A few hours monthly</option>
                    <option value="events">Event-based only</option>
                    <option value="flexible">Flexible / As needed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to volunteer?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors resize-none"
                    placeholder="Share your motivation and any relevant experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5" /> Submit Application
                </button>
              </motion.form>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
