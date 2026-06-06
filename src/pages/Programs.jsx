import { motion } from 'framer-motion';
import { Scissors, Stethoscope, Mic, Globe, CheckCircle } from 'lucide-react';
import { programs, programImages } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';
import DonateCTA from '../components/DonateCTA';

const icons = [Scissors, Stethoscope, Mic, Globe];

export default function Programs() {
  return (
    <>
      <PageHeader
        title="Our Programs"
        subtitle="Comprehensive initiatives designed to uplift and empower vulnerable communities."
        breadcrumb="Home / Programs"
      />

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            title="What We Do"
            subtitle="Each program is designed to address specific needs while contributing to holistic community wellness."
          />
          <div className="space-y-16">
            {programs.map((program, i) => {
              const Icon = icons[i];
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    i % 2 === 1 ? 'lg:direction-rtl' : ''
                  }`}
                >
                  <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-5">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4">{program.title}</h2>
                    <p className="text-gray-600 leading-relaxed text-lg mb-6">
                      {program.description}
                    </p>
                    <ul className="space-y-3">
                      {program.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                    <img
                      src={programImages[i]}
                      alt={program.title}
                      className="rounded-2xl w-full object-cover shadow-lg aspect-[3/2]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      <DonateCTA />
    </>
  );
}
