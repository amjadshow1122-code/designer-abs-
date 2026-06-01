-- Helper to insert or update the pages with 10 random active products and 10 random active sales

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'MAXI DRESSES', 
  'maxi-dresses',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'KAFTANS', 
  'kaftans',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'TOPS & BLOUSES', 
  'tops-blouses',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'COATS & JACKETS', 
  'coats-jackets',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'BAGS & ACCESSORIES', 
  'bags-accessories',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'JEWELLERY', 
  'jewellery',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;

INSERT INTO custom_pages (title, slug, curated_product_ids, curated_sale_ids)
VALUES 
(
  'BOUTIQUES', 
  'boutiques',
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM products WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}'),
  COALESCE((SELECT array_agg(id) FROM (SELECT id FROM sales WHERE status = 'active' ORDER BY random() LIMIT 10) as t), '{}')
)
ON CONFLICT (slug) DO UPDATE SET 
  curated_product_ids = EXCLUDED.curated_product_ids,
  curated_sale_ids = EXCLUDED.curated_sale_ids;
