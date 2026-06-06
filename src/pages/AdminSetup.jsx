import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Database, CheckCircle, XCircle, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const seedSQL = `-- Run this SQL in your Supabase SQL Editor to set up all tables

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

-- Drop existing policies first to avoid errors
DROP POLICY IF EXISTS "Allow public read access on programs" ON programs;
DROP POLICY IF EXISTS "Allow public read access on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow public read access on partners" ON partners;
DROP POLICY IF EXISTS "Allow public read access on team_members" ON team_members;
DROP POLICY IF EXISTS "Allow public read access on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow public read access on site_texts" ON site_texts;
DROP POLICY IF EXISTS "Allow public read access on contact_info" ON contact_info;

-- Allow public read access
CREATE POLICY "Allow public read access on programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access on testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read access on partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Allow public read access on team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Allow public read access on gallery_images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access on site_texts" ON site_texts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on contact_info" ON contact_info FOR SELECT USING (true);

-- Drop existing auth policies
DROP POLICY IF EXISTS "Allow authenticated full access on programs" ON programs;
DROP POLICY IF EXISTS "Allow authenticated full access on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow authenticated full access on partners" ON partners;
DROP POLICY IF EXISTS "Allow authenticated full access on team_members" ON team_members;
DROP POLICY IF EXISTS "Allow authenticated full access on gallery_images" ON gallery_images;
DROP POLICY IF EXISTS "Allow authenticated full access on site_texts" ON site_texts;
DROP POLICY IF EXISTS "Allow authenticated full access on contact_info" ON contact_info;

-- Allow authenticated users full access
CREATE POLICY "Allow authenticated full access on programs" ON programs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on partners" ON partners FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on gallery_images" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on site_texts" ON site_texts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access on contact_info" ON contact_info FOR ALL USING (auth.role() = 'authenticated');
`;

const tables = ['programs', 'testimonials', 'partners', 'team_members', 'gallery_images', 'site_texts', 'contact_info'];

export default function AdminSetup() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState({});
  const [checking, setChecking] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkTables();
  }, []);

  async function checkTables() {
    setChecking(true);
    const res = {};
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('id', { count: 'exact', head: true });
        res[table] = { exists: !error, error: error?.message };
      } catch {
        res[table] = { exists: false, error: 'Connection error' };
      }
    }
    setResults(res);
    setChecking(false);
  }

  const allExist = Object.values(results).every((r) => r?.exists);
  const anyExist = Object.values(results).some((r) => r?.exists);

  const copySQL = () => {
    navigator.clipboard.writeText(seedSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const sqlUrl = `https://supabase.com/dashboard/project/pbnvsnwdqmpoqzninqgb/sql/new`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-4 lg:p-8 pt-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary/10 text-primary p-3 rounded-xl">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Database Setup</h1>
              <p className="text-gray-500 text-sm">Initialize Supabase tables and seed data</p>
            </div>
          </div>

          {/* Status */}
          <div className="mb-8">
            <h2 className="font-semibold mb-4">Table Status</h2>
            {checking ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Checking database...
              </div>
            ) : (
              <div className="space-y-2">
                {tables.map((table) => {
                  const r = results[table];
                  return (
                    <div key={table} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                      <span className="text-sm font-medium">{table}</span>
                      {r?.exists ? (
                        <span className="flex items-center gap-1.5 text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4" /> Ready
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-red-500 text-sm">
                          <XCircle className="w-4 h-4" /> Missing
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {!checking && !allExist && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-amber-800 mb-2">Database Not Initialized</h3>
              <p className="text-amber-700 text-sm mb-4">
                Run the SQL seed script in your Supabase SQL Editor to create the required tables and seed default data.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={sqlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  Open Supabase SQL Editor <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={copySQL}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  {copied ? <><CheckCircle className="w-4 h-4 text-green-600" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy SQL Script</>}
                </button>
                <button
                  onClick={checkTables}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 px-5 py-2.5 rounded-xl font-medium text-sm transition-colors"
                >
                  <Database className="w-4 h-4" /> Re-check
                </button>
              </div>
            </div>
          )}

          {!checking && allExist && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-800 mb-1">All Tables Ready!</h3>
              <p className="text-green-600 text-sm mb-4">Your database is fully initialized and ready for the admin panel.</p>
              <button
                onClick={() => navigate('/admin')}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Go to Admin Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Next steps */}
          {!checking && allExist && (
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold mb-3">Next Steps</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                  Go to Supabase Dashboard &rarr; Authentication &rarr; Users
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                  Click "Add User" and create an admin account (email + password)
                </li>
                <li className="flex items-center gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                  Sign in at <strong>/admin/login</strong> with those credentials
                </li>
              </ol>
            </div>
          )}

          {!checking && !anyExist && (
            <div className="border-t border-gray-100 pt-6">
              <h3 className="font-semibold mb-3">Quick Setup Instructions</h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                  <span>Click <strong>"Open Supabase SQL Editor"</strong> above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                  <span>Click <strong>"Copy SQL Script"</strong>, paste it into the editor, and click <strong>Run</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                  <span>Come back here and click <strong>"Re-check"</strong> to verify</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">4</span>
                  <span>Go to Supabase Dashboard &rarr; Authentication &rarr; Users &rarr; <strong>Add User</strong> to create an admin account</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">5</span>
                  <span>Sign in at <strong>/admin/login</strong> with your new credentials</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
