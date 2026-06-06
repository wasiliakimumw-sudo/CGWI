-- Run this SQL in your Supabase SQL Editor to set up all tables

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB DEFAULT '[]',
  icon TEXT DEFAULT 'Heart',
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT DEFAULT 'bronze',
  description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT DEFAULT '',
  category TEXT DEFAULT 'events',
  title TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site texts (key-value for hero, about, contact, etc.)
CREATE TABLE IF NOT EXISTS site_texts (
  id SERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact info
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  address TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  email TEXT DEFAULT '',
  whatsapp TEXT DEFAULT '',
  social_links JSONB DEFAULT '[]',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site texts if not exists
INSERT INTO site_texts (key, value) VALUES
  ('hero', '{"headline": "Restoring Dignity, Promoting Wellness, Inspiring Hope", "subheadline": "Supporting vulnerable communities through grooming services, health awareness, mentorship, and strategic partnerships.", "ctaPrimary": "Donate Now", "ctaSecondary": "Become a Partner"}'),
  ('about_vision', '{"text": "A world where every individual has access to the dignity of basic grooming, the knowledge of wellness, and the support of a caring community."}'),
  ('about_mission', '{"text": "To empower vulnerable individuals and communities through professional grooming services, health education, motivational mentorship, and strategic community partnerships."}'),
  ('about_story', '{"text": "Founded in 2022, Community Grooming & Wellness Initiative began as a small volunteer effort in one neighborhood. What started with a pair of scissors, a folding chair, and a handful of passionate volunteers has grown into a movement touching thousands of lives across multiple communities."}'),
  ('stats', '{"livesReached": 1000, "outreachEvents": 50, "volunteers": 100, "partners": 20}')
ON CONFLICT (key) DO NOTHING;

-- Insert default programs
INSERT INTO programs (title, description, features, icon) VALUES
  ('Free Haircuts', 'Professional grooming services restoring dignity and confidence for individuals experiencing homelessness and low-income families.', '["Mobile grooming units", "Community salon days", "Hygiene kit distribution"]', 'Scissors'),
  ('Health Awareness', 'Health education, screenings, and wellness resources addressing preventive care and mental health support.', '["Free health screenings", "Mental health workshops", "Nutrition guidance"]', 'Stethoscope'),
  ('Motivational Talks', 'Inspiring sessions empowering individuals with tools for personal growth, resilience, and positive life choices.', '["Life skills coaching", "Career guidance", "Peer support groups"]', 'Mic'),
  ('Community Outreach', 'Strategic partnerships delivering holistic support through events, resource distribution, and advocacy.', '["Resource fairs", "Food & clothing drives", "Community events"]', 'Globe');

-- Insert default testimonials
INSERT INTO testimonials (name, role, quote, rating) VALUES
  ('Maria Gonzalez', 'Program Beneficiary', 'CGWI gave me more than a haircut — they gave me back my confidence. The team treated me with such dignity and care. I am forever grateful.', 5),
  ('James Carter', 'Volunteer', 'Volunteering with CGWI has been life-changing. Seeing the smiles on people''s faces after a fresh haircut or a health talk reminds me why community matters.', 5),
  ('Dr. Amara Okafor', 'Health Partner', 'The health awareness initiatives by CGWI are bridging critical gaps in underserved communities. Their approach is compassionate and impactful.', 5),
  ('David Chen', 'Donor', 'I support CGWI because they turn every donation into real, measurable impact. Transparency, dedication, and heart — they have it all.', 5);

-- Insert default partners
INSERT INTO partners (name, tier, description) VALUES
  ('Hope Foundation', 'platinum', '$100K+ annual contribution and pro-bono consulting'),
  ('Wellness Alliance', 'gold', 'Joint health awareness campaigns and referrals'),
  ('CareBridge Health', 'gold', 'Free clinic partnerships and health screenings'),
  ('Unity Corp', 'silver', 'Employee matching program and event sponsorship'),
  ('BrightFuture Org', 'silver', 'Cross-community outreach initiatives'),
  ('Local Community Trust', 'bronze', 'Local community support and funding'),
  ('Smiles Beyond Borders', 'bronze', 'Community wellness program funding'),
  ('GreenLeaf Partners', 'bronze', 'Sustainability and wellness program funding');

-- Insert default team members
INSERT INTO team_members (name, role, bio) VALUES
  ('Dr. Sarah Mitchell', 'Founder & Executive Director', 'With over 15 years in community health, Dr. Mitchell founded CGWI to bridge gaps in wellness access.'),
  ('Michael Adebayo', 'Programs Director', 'Michael oversees outreach operations and partnership development across all CGWI programs.'),
  ('Linda Park', 'Volunteer Coordinator', 'Linda manages our growing volunteer network and ensures every volunteer has a meaningful experience.'),
  ('Carlos Ramirez', 'Community Liaison', 'Carlos connects CGWI with local communities and ensures our programs meet real needs.');

-- Insert default contact info
INSERT INTO contact_info (address, phone, email, whatsapp, social_links) VALUES
  ('123 Wellness Avenue, Suite 200, Hope City, HC 10001', '+265999 678 150', 'info@cgwi.org', 'https://wa.me/265999678150', '["Facebook", "Twitter", "Instagram", "LinkedIn", "YouTube"]');

-- Enable Row Level Security
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access on site_texts" ON site_texts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact_info" ON contact_info FOR SELECT USING (true);

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated full access on programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on site_texts" ON site_texts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
