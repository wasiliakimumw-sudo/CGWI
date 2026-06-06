import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ChevronDown, Scissors, Stethoscope, Mic, Globe } from 'lucide-react';
import { heroContent, stats, programs, partners, programImages } from '../data/constants';
import StatCounter from '../components/StatCounter';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';
import TestimonialsSection from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import DonateCTA from '../components/DonateCTA';
import HeroCarousel from '../components/HeroCarousel';

const programIcons = [Scissors, Stethoscope, Mic, Globe];

export default function Home() {
  return (
    <>
      {/* Hero Section with Carousel */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-dark/95 to-primary-dark overflow-hidden">
        <HeroCarousel />
        <div className="relative z-10 w-full pt-20 pb-16">
          <Container>
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur text-white text-sm px-4 py-2 rounded-full mb-4"
              >
                <Heart className="w-4 h-4" /> One Haircut &bull; One Message &bull; One Life at a Time
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-white/50 text-4xl sm:text-5xl lg:text-6xl font-medium mb-2"
              >
                Welcome to
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
              >
                Community Grooming & Wellness Initiative (CGWI)
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg lg:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed"
              >
                {heroContent.subheadline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to={heroContent.ctaPrimary.link}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  <Heart className="w-5 h-5" /> {heroContent.ctaPrimary.text}
                </Link>
                <Link
                  to={heroContent.ctaSecondary.link}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur border border-white/20"
                >
                  {heroContent.ctaSecondary.text} <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/40 animate-bounce" />
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <SectionHeader
            title="Our Reach"
            subtitle="Numbers that reflect the lives we've touched and the communities we've served."
          />
          <StatCounter stats={stats} />
        </Container>
      </section>

      {/* Programs Section */}
      <section className="py-16 lg:py-24 bg-light">
        <Container>
          <SectionHeader
            title="Our Programs"
            subtitle="Holistic initiatives designed to restore dignity and empower individuals."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, i) => {
              const Icon = programIcons[i];
              return (
                <Card key={program.title}>
                  <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img
                      src={programImages[i]}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-6 flex items-center gap-2 text-white">
                      <div className="bg-white/20 backdrop-blur p-2 rounded-lg">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{program.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Impact Preview Section */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Making a Tangible Difference
              </h2>
              <div className="space-y-4">
                {[
                  { year: 2024, desc: '650+ individuals reached through 28 outreach events' },
                  { year: 2023, desc: '450+ lives impacted across 3 communities' },
                  { year: 2022, desc: 'Founded and served 250+ individuals' },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4 items-start">
                    <div className="bg-primary/10 text-primary font-bold text-sm px-3 py-1 rounded-lg shrink-0">
                      {item.year}
                    </div>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium mt-6 transition-colors"
              >
                View Full Impact <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src="https://placehold.co/400x500/0D6EFD/FFFFFF?text=Impact+1"
                  alt="Community outreach event"
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <img
                  src="https://placehold.co/400x300/198754/FFFFFF?text=Impact+2"
                  alt="Health workshop"
                  className="rounded-2xl w-full h-36 object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://placehold.co/400x300/0D6EFD/FFFFFF?text=Impact+3"
                  alt="Grooming service"
                  className="rounded-2xl w-full h-36 object-cover"
                />
                <img
                  src="https://placehold.co/400x500/198754/FFFFFF?text=Impact+4"
                  alt="Community gathering"
                  className="rounded-2xl w-full h-48 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Partners Section */}
      <section className="py-16 lg:py-24 bg-light">
        <Container>
          <SectionHeader
            title="Our Partners"
            subtitle="Collaborating with organizations and individuals who share our vision."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">
                      {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">{partner.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{partner.tier} Partner</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <DonateCTA />
      <TestimonialsSection />
      <Newsletter />
    </>
  );
}
