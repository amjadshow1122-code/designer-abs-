import fs from 'fs';
import path from 'path';
import pkg from 'pg';
import http from 'http';
import https from 'https';
const { Client } = pkg;

// Connection details
const connectionString = "postgresql://postgres:XwTq2Cih50Kwqt1Y@db.numzdnwdlysgodumavjg.supabase.co:5432/postgres";

const logFilePath = path.resolve('daily_validation.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

function log(msg) {
  const formatted = `[${new Date().toISOString()}] ${msg}`;
  console.log(formatted);
  logStream.write(formatted + '\n');
}

// Helper to make lightweight HTTP request
const checkUrlHealth = (url) => {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const client = parsed.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      method: 'HEAD',
      timeout: 5000
    }, (res) => {
      resolve({
        statusCode: res.statusCode,
        ok: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: null,
        ok: false,
        error: err.message
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        statusCode: null,
        ok: false,
        error: 'Timeout (5s)'
      });
    });

    req.end();
  });
};

async function main() {
  log("Starting Daily Automation Validation Crawl...");
  
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    log("Connected successfully to PostgreSQL database.");

    // --- CHECK 1: EXPIRED DATE CHECK (SALES) ---
    log("Running Expired Date Check on Active Sales...");
    const expiredSalesRes = await client.query(`
      SELECT id, title, sale_end_date FROM public.sales_secure 
      WHERE status = 'active' AND sale_end_date IS NOT NULL AND sale_end_date < CURRENT_DATE
    `);

    log(`Found ${expiredSalesRes.rows.length} sales events past end date.`);
    for (const sale of expiredSalesRes.rows) {
      // Check if flag already exists
      const flagCheck = await client.query(`
        SELECT id FROM public.automation_flags 
        WHERE entity_type = 'sale' AND entity_id = $1 AND flag_type = 'expired_date' AND reviewed_at IS NULL
      `, [sale.id]);

      if (flagCheck.rows.length === 0) {
        await client.query(`
          INSERT INTO public.automation_flags (entity_type, entity_id, flag_type, raw_signal)
          VALUES ('sale', $1, 'expired_date', $2)
        `, [sale.id, `Sale ended on ${sale.sale_end_date}`]);
        log(`Flagged Sale: "${sale.title}" (ID: ${sale.id}) as expired.`);
      }
    }

    // --- CHECK 2: URL HEALTH CHECK (SALES & PRODUCTS) ---
    log("Running URL Health Check on active external Sales...");
    const activeSalesRes = await client.query(`
      SELECT id, title, sale_url FROM public.sales_secure WHERE status = 'active'
    `);

    for (const sale of activeSalesRes.rows) {
      if (sale.sale_url) {
        log(`Checking URL: ${sale.sale_url} for Sale "${sale.title}"`);
        const health = await checkUrlHealth(sale.sale_url);
        
        if (!health.ok) {
          const signal = health.error ? `Error: ${health.error}` : `HTTP Status: ${health.statusCode}`;
          log(`⚠️ BROKEN URL detected: ${sale.sale_url} - ${signal}`);

          const flagCheck = await client.query(`
            SELECT id FROM public.automation_flags 
            WHERE entity_type = 'sale' AND entity_id = $1 AND flag_type = 'suspected_stale' AND reviewed_at IS NULL
          `, [sale.id]);

          if (flagCheck.rows.length === 0) {
            await client.query(`
              INSERT INTO public.automation_flags (entity_type, entity_id, flag_type, raw_signal)
              VALUES ('sale', $1, 'suspected_stale', $2)
            `, [sale.id, signal]);
            log(`Flagged Sale: "${sale.title}" as suspected stale.`);
          }
        }
      }
    }

    log("Running URL Health Check on active external Products...");
    const activeProductsRes = await client.query(`
      SELECT id, name, external_url FROM public.products_secure 
      WHERE status = 'active' AND is_external = true
    `);

    for (const prod of activeProductsRes.rows) {
      if (prod.external_url) {
        log(`Checking URL: ${prod.external_url} for Product "${prod.name}"`);
        const health = await checkUrlHealth(prod.external_url);

        if (!health.ok) {
          const signal = health.error ? `Error: ${health.error}` : `HTTP Status: ${health.statusCode}`;
          log(`⚠️ BROKEN URL detected: ${prod.external_url} - ${signal}`);

          const flagCheck = await client.query(`
            SELECT id FROM public.automation_flags 
            WHERE entity_type = 'product' AND entity_id = $1 AND flag_type = 'suspected_stale' AND reviewed_at IS NULL
          `, [prod.id]);

          if (flagCheck.rows.length === 0) {
            await client.query(`
              INSERT INTO public.automation_flags (entity_type, entity_id, flag_type, raw_signal)
              VALUES ('product', $1, 'suspected_stale', $2)
            `, [prod.id, signal]);
            log(`Flagged Product: "${prod.name}" as suspected stale.`);
          }
        }
      }
    }

    // --- CHECK 3: STOCK CHECK (OWN PRODUCTS) ---
    log("Running Stock Check on active direct Products...");
    const stockRes = await client.query(`
      SELECT id, name FROM public.products_secure 
      WHERE status = 'active' AND is_external = false AND stock_qty = 0
    `);

    log(`Found ${stockRes.rows.length} out of stock products.`);
    for (const prod of stockRes.rows) {
      const flagCheck = await client.query(`
        SELECT id FROM public.automation_flags 
        WHERE entity_type = 'product' AND entity_id = $1 AND flag_type = 'out_of_stock' AND reviewed_at IS NULL
      `, [prod.id]);

      if (flagCheck.rows.length === 0) {
        await client.query(`
          INSERT INTO public.automation_flags (entity_type, entity_id, flag_type, raw_signal)
          VALUES ('product', $1, 'out_of_stock', 'stock_qty is 0')
        `, [prod.id]);
        log(`Flagged Product: "${prod.name}" as out of stock.`);
      }
    }

    log("Daily Automation Validation completed successfully!");

  } catch (err) {
    log(`FATAL ERROR during validation: ${err.message}`);
  } finally {
    await client.end();
    logStream.end();
  }
}

main();
