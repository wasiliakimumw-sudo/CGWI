import { motion } from 'framer-motion';
import { HandHeart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { partnerCategories } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader, Card } from '../components/SectionWrapper';
import Newsletter from '../components/Newsletter';

export default function Partners() {
  return (
    <>
      <PageHeader
        title="Our Partners"
        subtitle="Collaborating with corporations, NGOs, and individuals to amplify our impact."
        breadcrumb="Home / Partners"
      />

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Partner With Us"
            subtitle="Together, we can reach more communities and create lasting change."
          />
          <div className="space-y-12">
            {partnerCategories.map((category, ci) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full ${
                    category.tier === 'platinum' ? 'bg-yellow-400' :
                    category.tier === 'gold' ? 'bg-yellow-600' :
                    'bg-gray-400'
                  }`} />
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.partners.map((partner, i) => (
                    <Card key={partner.name}>
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-primary font-bold text-xl">
                          {partner.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{partner.name}</h3>
                      <p className="text-gray-600 text-sm">{partner.description}</p>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Become a Partner CTA */}
      <section className="py-16 lg:py-24 bg-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 text-primary rounded-2xl mb-6">
              <HandHeart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Become a Partner
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Whether you are a corporation, NGO, or individual, your partnership can transform lives. 
              Let us work together to create healthier, more dignified communities.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg"
            >
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </Container>
      </section>

      <Newsletter />
    </>
  );
}
