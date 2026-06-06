import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://pbnvsnwdqmpoqzninqgb.supabase.co';
const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('VITE_SUPABASE_SERVICE_KEY not set. Run:');
  console.error('  $env:VITE_SUPABASE_SERVICE_KEY="your-key" ; node scripts/seed-data.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function seed() {
  for (const t of ['site_texts','programs','testimonials','partners','team_members','contact_info']) {
    await supabase.from(t).delete().neq('id', 0);
  }

  await supabase.from('site_texts').insert([
    { key: 'hero', value: { headline: 'Restoring Dignity, Promoting Wellness, Inspiring Hope', subheadline: 'Supporting vulnerable communities through grooming services, health awareness, mentorship, and strategic partnerships.', ctaPrimary: 'Donate Now', ctaSecondary: 'Become a Partner' } },
    { key: 'about_vision', value: { text: 'A world where every individual has access to the dignity of basic grooming, the knowledge of wellness, and the support of a caring community.' } },
    { key: 'about_mission', value: { text: 'To empower vulnerable individuals and communities through professional grooming services, health education, motivational mentorship, and strategic community partnerships.' } },
    { key: 'about_story', value: { text: 'Founded in 2022, Community Grooming & Wellness Initiative began as a small volunteer effort in one neighborhood. What started with a pair of scissors, a folding chair, and a handful of passionate volunteers has grown into a movement touching thousands of lives across multiple communities.' } },
    { key: 'stats', value: { livesReached: 1000, outreachEvents: 50, volunteers: 100, partners: 20 } },
  ]);
  console.log('site_texts seeded');

  await supabase.from('programs').insert([
    { title: 'Free Haircuts', description: 'Professional grooming services restoring dignity and confidence for individuals experiencing homelessness and low-income families.', features: ['Mobile grooming units', 'Community salon days', 'Hygiene kit distribution'], icon: 'Scissors' },
    { title: 'Health Awareness', description: 'Health education, screenings, and wellness resources addressing preventive care and mental health support.', features: ['Free health screenings', 'Mental health workshops', 'Nutrition guidance'], icon: 'Stethoscope' },
    { title: 'Motivational Talks', description: 'Inspiring sessions empowering individuals with tools for personal growth, resilience, and positive life choices.', features: ['Life skills coaching', 'Career guidance', 'Peer support groups'], icon: 'Mic' },
    { title: 'Community Outreach', description: 'Strategic partnerships delivering holistic support through events, resource distribution, and advocacy.', features: ['Resource fairs', 'Food & clothing drives', 'Community events'], icon: 'Globe' },
  ]);
  console.log('programs seeded');

  await supabase.from('testimonials').insert([
    { name: 'Maria Gonzalez', role: 'Program Beneficiary', quote: 'CGWI gave me more than a haircut — they gave me back my confidence. The team treated me with such dignity and care. I am forever grateful.', rating: 5 },
    { name: 'James Carter', role: 'Volunteer', quote: "Volunteering with CGWI has been life-changing. Seeing the smiles on people's faces after a fresh haircut or a health talk reminds me why community matters.", rating: 5 },
    { name: 'Dr. Amara Okafor', role: 'Health Partner', quote: 'The health awareness initiatives by CGWI are bridging critical gaps in underserved communities. Their approach is compassionate and impactful.', rating: 5 },
    { name: 'David Chen', role: 'Donor', quote: 'I support CGWI because they turn every donation into real, measurable impact. Transparency, dedication, and heart — they have it all.', rating: 5 },
  ]);
  console.log('testimonials seeded');

  await supabase.from('partners').insert([
    { name: 'Hope Foundation', tier: 'platinum', description: '$100K+ annual contribution and pro-bono consulting' },
    { name: 'Wellness Alliance', tier: 'gold', description: 'Joint health awareness campaigns and referrals' },
    { name: 'CareBridge Health', tier: 'gold', description: 'Free clinic partnerships and health screenings' },
    { name: 'Unity Corp', tier: 'silver', description: 'Employee matching program and event sponsorship' },
    { name: 'BrightFuture Org', tier: 'silver', description: 'Cross-community outreach initiatives' },
    { name: 'Local Community Trust', tier: 'bronze', description: 'Local community support and funding' },
    { name: 'Smiles Beyond Borders', tier: 'bronze', description: 'Community wellness program funding' },
    { name: 'GreenLeaf Partners', tier: 'bronze', description: 'Sustainability and wellness program funding' },
  ]);
  console.log('partners seeded');

  await supabase.from('team_members').insert([
    { name: 'Dr. Sarah Mitchell', role: 'Founder & Executive Director', bio: 'With over 15 years in community health, Dr. Mitchell founded CGWI to bridge gaps in wellness access.' },
    { name: 'Michael Adebayo', role: 'Programs Director', bio: 'Michael oversees outreach operations and partnership development across all CGWI programs.' },
    { name: 'Linda Park', role: 'Volunteer Coordinator', bio: 'Linda manages our growing volunteer network and ensures every volunteer has a meaningful experience.' },
    { name: 'Carlos Ramirez', role: 'Community Liaison', bio: 'Carlos connects CGWI with local communities and ensures our programs meet real needs.' },
  ]);
  console.log('team_members seeded');

  await supabase.from('contact_info').insert({
    address: 'CGWI, Matawale, Zomba, Malawi.',
    phone: '+265999 678 150',
    email: 'info@cgwi.org',
    whatsapp: 'https://wa.me/265999678150',
    social_links: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'],
  });
  console.log('contact_info seeded');

  console.log('\nAll data seeded successfully!');
}

seed().catch(console.error);
