import { motion } from 'framer-motion';
import { Heart, Shield, Target, Users, Eye, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aboutContent, teamMembers } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';
import TestimonialsSection from '../components/Testimonials';
import DonateCTA from '../components/DonateCTA';

const valueIcons = [Heart, Shield, Target, Users, Eye, Star];

export default function About() {
  return (
    <>
      <PageHeader
        title="About CGWI"
        subtitle="Learn about our mission, vision, and the story behind Community Grooming & Wellness Initiative."
        breadcrumb="Home / About"
      />

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{aboutContent.mission}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{aboutContent.vision}</p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-24 bg-light">
        <Container>
          <SectionHeader
            title="Our Core Values"
            subtitle="The principles that guide every program, partnership, and interaction."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutContent.coreValues.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <Card key={value.title}>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary rounded-xl mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Our Story / History */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader title="Our Story" centered={false} />
              {aboutContent.history.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-600 leading-relaxed mb-4">
                  {paragraph.trim()}
                </p>
              ))}
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors mt-4"
              >
                Explore Our Programs <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://placehold.co/600x700/0D6EFD/FFFFFF?text=Our+Story"
                alt="CGWI team at community event"
                className="rounded-2xl w-full object-cover shadow-lg"
              />
              <div className="absolute -bottom-4 -left-4 bg-secondary text-white p-6 rounded-2xl shadow-lg max-w-[200px]">
                <p className="text-3xl font-bold">2022</p>
                <p className="text-sm text-white/80">Founded with a vision</p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-light">
        <Container>
          <SectionHeader
            title="Meet Our Team"
            subtitle="Dedicated individuals driving our mission forward every day."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <Card key={member.name}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-xl object-cover mb-5"
                />
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <TestimonialsSection />
      <DonateCTA />
    </>
  );
}
