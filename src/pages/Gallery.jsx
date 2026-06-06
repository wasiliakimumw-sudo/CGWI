import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryCategories, galleryImages } from '../data/constants';
import PageHeader from '../components/PageHeader';
import { Container, SectionHeader } from '../components/SectionWrapper';
import Newsletter from '../components/Newsletter';
import Lightbox from '../components/Lightbox';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % filtered.length);
  }, [filtered.length]);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Click any photo to view in full size."
        breadcrumb="Home / Gallery"
      />

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <SectionHeader
            title="Our Impact in Pictures"
            subtitle="Browse through photos that tell the story of CGWI's journey."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-light text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, index) => (
                <motion.button
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(index)}
                  className="relative group overflow-hidden rounded-xl aspect-[4/3] text-left w-full"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="text-white font-medium">{img.title}</p>
                    <p className="text-white/70 text-sm capitalize">{img.category}</p>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 mt-12">No images found in this category.</p>
          )}
        </Container>
      </section>

      <Newsletter />

      {lightboxOpen && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
