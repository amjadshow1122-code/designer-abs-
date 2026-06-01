CREATE TABLE IF NOT EXISTS custom_pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    curated_product_ids UUID[] DEFAULT '{}',
    curated_sale_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE custom_pages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to custom pages
CREATE POLICY "Allow public select on custom_pages" 
ON custom_pages FOR SELECT USING (true);

-- Allow authenticated admins to do everything
CREATE POLICY "Allow admin all on custom_pages" 
ON custom_pages FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid() AND profiles.is_admin = true
  )
);
