import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, HandHeart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { stats, impactData, galleryImages } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';
import StatCounter from '../components/StatCounter';
import TestimonialsSection from '../components/Testimonials';
import Newsletter from '../components/Newsletter';

export default function Impact() {
  return (
    <>
      <PageHeader
        title="Our Impact"
        subtitle="Measurable change driven by compassion, partnership, and community engagement."
        breadcrumb="Home / Impact"
      />

      {/* Statistics */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <SectionHeader
            title="By the Numbers"
            subtitle="Real results from real efforts — our impact in quantifiable terms."
          />
          <StatCounter stats={stats} />
        </Container>
      </section>

      {/* Year-over-year growth */}
      <section className="py-16 lg:py-24 bg-light">
        <Container>
          <SectionHeader
            title="Year-over-Year Growth"
            subtitle="Tracking our expanding reach and deepening impact since inception."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {impactData.map((year, i) => (
              <Card key={year.year}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-primary">{year.year}</span>
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-light rounded-xl p-4 text-center">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{year.events}</p>
                    <p className="text-xs text-gray-500">Events</p>
                  </div>
                  <div className="bg-light rounded-xl p-4 text-center">
                    <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{year.peopleReached}</p>
                    <p className="text-xs text-gray-500">Reached</p>
                  </div>
                  <div className="bg-light rounded-xl p-4 text-center">
                    <HandHeart className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{year.volunteers}</p>
                    <p className="text-xs text-gray-500">Volunteers</p>
                  </div>
                  <div className="bg-light rounded-xl p-4 text-center">
                    <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-2xl font-bold">{year.partners}</p>
                    <p className="text-xs text-gray-500">Partners</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {year.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Impact in Pictures"
            subtitle="A glimpse into the moments that define our work."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.slice(0, 8).map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      <TestimonialsSection />
      <Newsletter />
    </>
  );
}
