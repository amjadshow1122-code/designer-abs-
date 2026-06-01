import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length === 2) env[parts[0].trim()] = parts[1].trim();
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('homepage_content').insert({
    section_name: 'featured_brand',
    content: {
      title: 'Fashion Spectrum',
      subtitle: 'FEATURED BRAND',
      description: 'A luxurious collection of statement pieces, redefining elegance for the modern individual.',
      button_text: 'Shop the Collection',
      button_link: '/shop',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    },
    is_visible: true
  });
  console.log(error || 'Inserted successfully');
}
check();
