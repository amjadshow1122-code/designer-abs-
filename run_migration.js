import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Client } = pkg;

// Connection details
const connectionString = "postgresql://postgres:XwTq2Cih50Kwqt1Y@db.numzdnwdlysgodumavjg.supabase.co:5432/postgres";

console.log("Connecting to Supabase PostgreSQL database...");
const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully!");

    const migrationPath = path.resolve('supabase/migrations/20260526000000_designer_sale_schema.sql');
    console.log(`Reading migration file: ${migrationPath}`);
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    console.log("Executing migration SQL...");
    await client.query(sql);
    console.log("Migration executed successfully!");

  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await client.end();
  }
}

run();
