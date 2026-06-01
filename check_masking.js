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

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMasking() {
  console.log("=== Testing Guest/Unauthenticated Data Masking ===");

  // 1. Check sales masking
  const { data: sales, error: salesErr } = await supabase.from('sales').select('*').limit(1);
  if (salesErr) {
    console.error("❌ Failed to select from sales view:", salesErr.message);
  } else if (sales && sales.length > 0) {
    const sale = sales[0];
    console.log("\nFound Sale event in view:", sale.title);
    console.log("  - teaser_text (Visible):", sale.teaser_text);
    console.log("  - description (Should be null for guest):", sale.description);
    console.log("  - sale_url (Should be null for guest):", sale.sale_url);
    console.log("  - price_range_min (Should be null for guest):", sale.price_range_min);
    console.log("  - price_range_max (Should be null for guest):", sale.price_range_max);
    
    if (sale.description === null && sale.sale_url === null && sale.price_range_min === null && sale.price_range_max === null) {
      console.log("  ✅ Sales view column masking works perfectly! All sensitive fields are server-side NULL for guests.");
    } else {
      console.error("  ❌ WARNING: Guest can see gated sales data!");
    }
  } else {
    console.log("\n⚠️ No sales found to check.");
  }

  // 2. Check products masking
  const { data: products, error: prodErr } = await supabase.from('products').select('*').limit(1);
  if (prodErr) {
    console.error("❌ Failed to select from products view:", prodErr.message);
  } else if (products && products.length > 0) {
    const product = products[0];
    console.log("\nFound Product in view:", product.name);
    console.log("  - teaser_text (Visible):", product.teaser_text);
    console.log("  - description (Should be null for guest):", product.description);
    console.log("  - price (Should be null for guest):", product.price);
    console.log("  - external_url (Should be null for guest):", product.external_url);
    
    if (product.description === null && product.price === null && product.external_url === null) {
      console.log("  ✅ Products view column masking works perfectly! All sensitive fields are server-side NULL for guests.");
    } else {
      console.error("  ❌ WARNING: Guest can see gated product data!");
    }
  } else {
    console.log("\n⚠️ No products found to check.");
  }
}

testMasking();
