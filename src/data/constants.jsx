import {
  Heart, HandHeart, Users, Scissors, Stethoscope,
  Mic, Globe, Star, Quote, MapPin, Phone,
  Mail, Shield, Target, Eye, Camera, Truck,
} from 'lucide-react';

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Programs', path: '/programs' },
  { name: 'Impact', path: '/impact' },
  { name: 'Partners', path: '/partners' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'Donate', path: '/donate' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export const heroContent = {
  headline: 'Restoring Dignity, Promoting Wellness, Inspiring Hope',
  subheadline:
    'Supporting vulnerable communities through grooming services, health awareness, mentorship, and strategic partnerships.',
  ctaPrimary: { text: 'Donate Now', link: '/donate' },
  ctaSecondary: { text: 'Become a Partner', link: '/partners' },
};

export const stats = [
  { value: 1000, suffix: '+', label: 'Lives Reached', icon: Heart },
  { value: 50, suffix: '+', label: 'Outreach Events', icon: Globe },
  { value: 100, suffix: '+', label: 'Volunteers', icon: Users },
  { value: 20, suffix: '+', label: 'Partners', icon: HandHeart },
];

export const programs = [
  {
    icon: Scissors,
    title: 'Free Haircuts',
    description:
      'Professional grooming services restoring dignity and confidence for individuals experiencing homelessness and low-income families.',
    features: ['Mobile grooming units', 'Community salon days', 'Hygiene kit distribution'],
  },
  {
    icon: Stethoscope,
    title: 'Health Awareness',
    description:
      'Health education, screenings, and wellness resources addressing preventive care and mental health support.',
    features: ['Free health screenings', 'Mental health workshops', 'Nutrition guidance'],
  },
  {
    icon: Mic,
    title: 'Motivational Talks',
    description:
      'Inspiring sessions empowering individuals with tools for personal growth, resilience, and positive life choices.',
    features: ['Life skills coaching', 'Career guidance', 'Peer support groups'],
  },
  {
    icon: Globe,
    title: 'Community Outreach',
    description:
      'Strategic partnerships delivering holistic support through events, resource distribution, and advocacy.',
    features: ['Resource fairs', 'Food & clothing drives', 'Community events'],
  },
];

export const programImages = [
  '/images/WhatsApp%20Image%202026-06-05%20at%2018.04.36.jpeg',
  '/images/WhatsApp%20Image%202026-06-05%20at%2018.04.35.jpeg',
  '/images/WhatsApp%20Image%202026-06-05%20at%2018.04.37%20(1).jpeg',
  '/images/CGWI.png',
];

export const testimonials = [
  {
    name: 'Maria Gonzalez',
    role: 'Program Beneficiary',
    quote:
      'CGWI gave me more than a haircut — they gave me back my confidence. The team treated me with such dignity and care. I am forever grateful.',
    rating: 5,
  },
  {
    name: 'James Carter',
    role: 'Volunteer',
    quote:
      'Volunteering with CGWI has been life-changing. Seeing the smiles on people\'s faces after a fresh haircut or a health talk reminds me why community matters.',
    rating: 5,
  },
  {
    name: 'Dr. Amara Okafor',
    role: 'Health Partner',
    quote:
      'The health awareness initiatives by CGWI are bridging critical gaps in underserved communities. Their approach is compassionate and impactful.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Donor',
    quote:
      'I support CGWI because they turn every donation into real, measurable impact. Transparency, dedication, and heart — they have it all.',
    rating: 5,
  },
];

export const partners = [
  { name: 'Hope Foundation', tier: 'platinum' },
  { name: 'Wellness Alliance', tier: 'gold' },
  { name: 'CareBridge Health', tier: 'gold' },
  { name: 'Unity Corp', tier: 'silver' },
  { name: 'BrightFuture Org', tier: 'silver' },
  { name: 'Local Community Trust', tier: 'bronze' },
  { name: 'Smiles Beyond Borders', tier: 'bronze' },
  { name: 'GreenLeaf Partners', tier: 'bronze' },
];

export const impactData = [
  {
    year: 2024,
    events: 28,
    peopleReached: 650,
    volunteers: 85,
    partners: 15,
    highlights: [
      'Launched mobile grooming unit serving 5 neighborhoods',
      'Held 12 health awareness workshops',
      'Distributed 3,000 hygiene kits',
    ],
  },
  {
    year: 2023,
    events: 22,
    peopleReached: 450,
    volunteers: 60,
    partners: 10,
    highlights: [
      'First annual Community Wellness Fair',
      'Expanded to 3 new communities',
      'Partnered with 5 local clinics',
    ],
  },
  {
    year: 2022,
    events: 15,
    peopleReached: 250,
    volunteers: 35,
    partners: 6,
    highlights: [
      'Founded with 5 core team members',
      'First outreach event reached 50 people',
      'Established partnership with Hope Foundation',
    ],
  },
];

export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'outreach', label: 'Outreach' },
  { id: 'grooming', label: 'Grooming' },
  { id: 'health', label: 'Health' },
  { id: 'events', label: 'Events' },
];

const localImages = [
  { src: '/images/CGWI.png', alt: 'CGWI community outreach event', category: 'outreach', title: 'Community Outreach 1' },
  { src: '/images/WhatsApp%20Image%202026-06-05%20at%2018.04.35.jpeg', alt: 'CGWI event photo 1', category: 'events', title: 'CGWI Event 1' },
  { src: '/images/WhatsApp%20Image%202026-06-05%20at%2018.04.36.jpeg', alt: 'CGWI event photo 2', category: 'events', title: 'CGWI Event 2' },
  { src: '/images/WhatsApp%20Image%202026-06-05%20at%2018.04.37%20(1).jpeg', alt: 'CGWI event photo 3', category: 'events', title: 'CGWI Event 3' },
];

export const galleryImages = [
  ...localImages.map((img, i) => ({ id: i + 1, ...img })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: localImages.length + i + 1,
    src: `https://placehold.co/800x600/0D6EFD/FFFFFF?text=Gallery+${i + 1}`,
    alt: `Gallery image ${i + 1}`,
    category: galleryCategories[(i % 4) + 1].id,
    title: `Community ${['Outreach', 'Grooming', 'Health Workshop', 'Event'][i % 4]} ${Math.floor(i / 4) + 1}`,
  })),
];

export const teamMembers = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Founder & Executive Director',
    image: 'https://placehold.co/400x400/0D6EFD/FFFFFF?text=Sarah+M',
    bio: 'With over 15 years in community health, Dr. Mitchell founded CGWI to bridge gaps in wellness access.',
  },
  {
    name: 'Michael Adebayo',
    role: 'Programs Director',
    image: 'https://placehold.co/400x400/198754/FFFFFF?text=Michael+A',
    bio: 'Michael oversees outreach operations and partnership development across all CGWI programs.',
  },
  {
    name: 'Linda Park',
    role: 'Volunteer Coordinator',
    image: 'https://placehold.co/400x400/0D6EFD/FFFFFF?text=Linda+P',
    bio: 'Linda manages our growing volunteer network and ensures every volunteer has a meaningful experience.',
  },
  {
    name: 'Carlos Ramirez',
    role: 'Community Liaison',
    image: 'https://placehold.co/400x400/198754/FFFFFF?text=Carlos+R',
    bio: 'Carlos connects CGWI with local communities and ensures our programs meet real needs.',
  },
];

export const aboutContent = {
  vision:
    'A world where every individual has access to the dignity of basic grooming, the knowledge of wellness, and the support of a caring community.',
  mission:
    'To empower vulnerable individuals and communities through professional grooming services, health education, motivational mentorship, and strategic community partnerships.',
  coreValues: [
    { icon: Heart, title: 'Compassion', description: 'We lead with empathy and treat every individual with dignity and respect.' },
    { icon: Shield, title: 'Integrity', description: 'Transparency and accountability guide every decision we make.' },
    { icon: Target, title: 'Impact', description: 'We measure success by tangible, positive change in lives.' },
    { icon: Users, title: 'Community', description: 'We believe in the power of collective action and partnership.' },
    { icon: Eye, title: 'Vision', description: 'We think long-term and invest in sustainable solutions.' },
    { icon: Star, title: 'Excellence', description: 'We strive for quality in every service, program, and relationship.' },
  ],
  history: `Founded in 2022, Community Grooming & Wellness Initiative began as a small volunteer effort in one neighborhood. What started with a pair of scissors, a folding chair, and a handful of passionate volunteers has grown into a movement touching thousands of lives across multiple communities.

Our founder, Dr. Sarah Mitchell, recognized that something as simple as a haircut could be a gateway to restoring a person's sense of dignity and self-worth. Combined with health awareness and motivational support, CGWI's holistic approach addresses both immediate needs and long-term wellness.

Today, CGWI operates mobile grooming units, hosts regular health workshops, and collaborates with over 20 partner organizations. Every year, we reach more individuals, train more volunteers, and deepen our impact.`,
};

export const partnerCategories = [
  {
    title: 'Corporate Partners',
    description: 'Organizations that provide funding, resources, and employee volunteer support.',
    tier: 'platinum',
    partners: [
      { name: 'Hope Foundation', description: '$100K+ annual contribution and pro-bono consulting' },
      { name: 'Unity Corp', description: 'Employee matching program and event sponsorship' },
      { name: 'GreenLeaf Partners', description: 'Sustainability and wellness program funding' },
    ],
  },
  {
    title: 'NGO Partners',
    description: 'Collaborating organizations working alongside us to amplify impact.',
    tier: 'gold',
    partners: [
      { name: 'Wellness Alliance', description: 'Joint health awareness campaigns and referrals' },
      { name: 'CareBridge Health', description: 'Free clinic partnerships and health screenings' },
      { name: 'Smiles Beyond Borders', description: 'Cross-community outreach initiatives' },
    ],
  },
  {
    title: 'Individual Donors',
    description: 'Generous individuals whose contributions sustain our programs.',
    tier: 'silver',
    partners: [
      { name: 'The Carter Family Fund', description: 'Monthly sustaining donors' },
      { name: 'Dr. Amara Okafor', description: 'Health program sponsor and advisor' },
      { name: 'David & Lisa Chen', description: 'Annual gala sponsors' },
    ],
  },
];

export const faqs = [
  {
    q: 'How are donations used?',
    a: '93% of every donation goes directly to program delivery, including grooming supplies, health workshop materials, and operational costs for outreach events.',
  },
  {
    q: 'Can I volunteer without experience?',
    a: 'Absolutely! We provide full training for all volunteers. Whether you are a professional barber or simply have a willing heart, there is a role for you.',
  },
  {
    q: 'Do you accept in-kind donations?',
    a: 'Yes! We gratefully accept hygiene products, grooming supplies, clothing, and non-perishable food items.',
  },
  {
    q: 'How can I become a partner?',
    a: 'Reach out through our contact form or partnerships page. Our team will work with you to create a meaningful collaboration.',
  },
];

export const contactInfo = {
  address: 'CGWI, Matawale, Zomba, Malawi.',
  phone: '+265999 678 150',
  whatsapp: 'https://wa.me/265999678150',
  email: 'info@cgwi.org',
  socialLinks: [
    { name: 'Facebook', url: '#' },
    { name: 'Twitter', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: '#' },
    { name: 'YouTube', url: '#' },
  ],
};

export const donationLevels = [
  { amount: 25, label: 'Provides hygiene kits for 5 people', icon: HandHeart },
  { amount: 50, label: 'Funds a full grooming session for 10 individuals', icon: Scissors },
  { amount: 100, label: 'Supports a community health workshop', icon: Stethoscope },
  { amount: 250, label: 'Sponsors a full outreach event', icon: Globe },
  { amount: 500, label: 'Funds one month of mobile grooming unit operations', icon: Truck },
  { amount: 1000, label: 'Sustains programs for an entire neighborhood for a month', icon: Heart },
];

export const volunteeringRoles = [
  { title: 'Barber / Stylist', description: 'Provide professional grooming services at outreach events', icon: Scissors },
  { title: 'Health Educator', description: 'Lead workshops on health, hygiene, and wellness topics', icon: Stethoscope },
  { title: 'Event Coordinator', description: 'Help plan and execute community outreach events', icon: Globe },
  { title: 'Administrative Support', description: 'Assist with office tasks, data entry, and communications', icon: Users },
  { title: 'Fundraising Ambassador', description: 'Help raise awareness and funds for CGWI programs', icon: HandHeart },
  { title: 'Photographer / Media', description: 'Capture our impact through photos and social media', icon: Camera },
];
