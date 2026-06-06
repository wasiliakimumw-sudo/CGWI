import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { contactInfo } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, Card } from '../components/SectionWrapper';
import Newsletter from '../components/Newsletter';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out with questions, partnership ideas, or to get involved."
        breadcrumb="Home / Contact"
      />

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card hover={false} className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                  <p className="text-gray-600">{contactInfo.address}</p>
                </div>
              </Card>

              <Card hover={false} className="flex items-start gap-4">
                <div className="bg-green-500/10 text-green-500 p-3 rounded-xl shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                  <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-500 transition-colors flex items-center gap-2">
                    {contactInfo.phone}
                    <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Chat</span>
                  </a>
                </div>
              </Card>

              <Card hover={false} className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              </Card>

              <Card hover={false} className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-primary transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              </Card>

              <Card hover={false} className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-xl shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </Card>

              {/* Map Placeholder */}
              <div className="bg-light rounded-2xl overflow-hidden border border-gray-100 h-64">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-medium">Map Integration</p>
                    <p className="text-sm">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We will get back to you within 24-48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" /> Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      <Newsletter />
    </>
  );
}
