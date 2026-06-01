import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from('newsletter_subscribers').insert([{ email: 'test@example.com' }]).select();
  console.log("INSERT RESULT:", { data, error });
  
  const { data: fetch, error: fetchErr } = await supabase.from('newsletter_subscribers').select('*');
  console.log("FETCH RESULT:", { data: fetch, error: fetchErr });
}

test();
