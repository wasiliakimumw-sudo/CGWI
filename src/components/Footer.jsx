import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, ArrowUp, MessageCircle } from 'lucide-react';
import { navLinks, contactInfo } from '../data/constants';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-dark text-gray-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <Heart className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white">CGWI</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Community Grooming & Wellness Initiative — restoring dignity, promoting wellness, and inspiring hope one life at a time.
            </p>
            <div className="flex gap-3">
              {contactInfo.socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  aria-label={s.name}
                  className="w-9 h-9 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center text-xs font-medium transition-colors"
                >
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Our Programs</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Free Haircuts</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Health Awareness</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Motivational Talks</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Community Outreach</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 shrink-0 text-green-400" />
                <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  WhatsApp: {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} CGWI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <button
              onClick={scrollToTop}
              className="bg-primary hover:bg-primary-dark text-white p-2 rounded-lg transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
