import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REF = 'pbnvsnwdqmpoqzninqgb';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(r => rl.question(q, r));

async function main() {
  const sqlPath = resolve(__dirname, '..', 'src', 'lib', 'seed.sql');
  const sql = readFileSync(sqlPath, 'utf-8');

  console.log('\n=== CGWI Database Setup ===\n');
  console.log('Project Ref:', REF);
  console.log('SQL Editor URL: https://supabase.com/dashboard/project/' + REF + '/sql/new\n');
  console.log('Two ways to set up:\n');
  console.log('Option 1: Copy-paste seed.sql into the SQL Editor above and click "Run"');
  console.log('  File location: src/lib/seed.sql\n');
  console.log('Option 2: Enter your Supabase database password and I\'ll run it automatically.\n');
  console.log('  Get your DB password:');
  console.log('  1. Go to https://supabase.com/dashboard/project/' + REF + '/settings/database');
  console.log('  2. Look for "Database password" under "Connection string"');
  console.log('  3. If you forgot it, click "Reset database password"\n');

  const envPw = process.env.SUPABASE_DB_PASSWORD;
  const pw = envPw || await ask('Enter Supabase database password (or press Enter to use SQL Editor): ');

  if (!pw) {
    console.log('\nOpen this URL and paste the contents of src/lib/seed.sql:');
    console.log('https://supabase.com/dashboard/project/' + REF + '/sql/new\n');
    console.log('Quick copy command:');
    console.log('  Get-Content src/lib/seed.sql -Raw | Set-Clipboard');
    rl.close();
    return;
  }

  console.log('\nConnecting to PostgreSQL...');
  try {
    const { default: pg } = await import('pg');
    const pool = new pg.Pool({
      connectionString: `postgresql://postgres:${pw}@db.${REF}.supabase.co:5432/postgres`,
      ssl: { rejectUnauthorized: false },
    });
    const client = await pool.connect();
    console.log('Connected! Executing SQL...');
    await client.query(sql);
    console.log('\n✓ Database setup complete! Tables created and data seeded.');
    client.release();
    await pool.end();
  } catch (e) {
    console.error('\n✗ Error:', e.message);
    console.log('\nPlease use the SQL Editor method instead:');
    console.log('https://supabase.com/dashboard/project/' + REF + '/sql/new');
  }
  rl.close();
}

main().catch(console.error);
