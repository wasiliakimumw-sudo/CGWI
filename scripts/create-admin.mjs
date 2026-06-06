import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://pbnvsnwdqmpoqzninqgb.supabase.co';
const SERVICE_KEY = process.env.VITE_SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('VITE_SUPABASE_SERVICE_KEY not set. Run:');
  console.error('  $env:VITE_SUPABASE_SERVICE_KEY="your-key" ; node scripts/create-admin.mjs');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const email = 'admin@cgwi.org';
const password = 'Admin123!';

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error('Error creating admin user:', error.message);
  process.exit(1);
}

console.log('Admin user created!');
console.log('Email:', data.user?.email);
console.log('ID:', data.user?.id);
