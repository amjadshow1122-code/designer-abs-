import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Read .env file
const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length === 2) {
    env[parts[0].trim()] = parts[1].trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tables = [
  'profiles',
  'products',
  'merchants',
  'sales',
  'categories',
  'orders',
  'order_items',
  'affiliate_clicks',
  'automation_flags',
  'site_settings',
  'homepage_content',
  'backups',
  'wishlist',
  'notifications',
  'user_addresses'
];

async function probe() {
  console.log("\nProbing tables in Supabase...");
  for (const table of tables) {
    const { error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      if (error.code === '42P01') {
        console.log(`❌ Table '${table}' does NOT exist (42P01).`);
      } else {
        console.log(`⚠️ Table '${table}' exists but returned error code: ${error.code} (${error.message})`);
      }
    } else {
      console.log(`✅ Table '${table}' EXISTS!`);
    }
  }
}

probe();
