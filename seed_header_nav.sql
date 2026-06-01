-- Seed the header nav_links with the correct category menus shown on the frontend
-- Run this in your Supabase SQL Editor

UPDATE site_settings
SET header_config = jsonb_set(
  COALESCE(header_config, '{}'::jsonb),
  '{nav_links}',
  '[
    { "label": "MAXI DRESSES", "url": "/pages/maxi-dresses" },
    { "label": "KAFTANS", "url": "/pages/kaftans" },
    { "label": "TOPS & BLOUSES", "url": "/pages/tops-blouses" },
    { "label": "COATS & JACKETS", "url": "/pages/coats-jackets" },
    { "label": "BAGS & ACCESSORIES", "url": "/pages/bags-accessories" },
    { "label": "JEWELLERY", "url": "/pages/jewellery" },
    { "label": "BOUTIQUES", "url": "/pages/boutiques" }
  ]'::jsonb
)
WHERE id = 1;
