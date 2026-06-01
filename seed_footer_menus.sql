-- Seed the footer_config columns with the 4 default menus shown on the frontend
-- Run this in your Supabase SQL Editor

UPDATE site_settings
SET footer_config = jsonb_set(
  COALESCE(footer_config, '{}'::jsonb),
  '{columns}',
  '[
    {
      "title": "SHOP",
      "links": [
        { "label": "Maxi Dresses", "url": "/pages/maxi-dresses" },
        { "label": "Kaftans", "url": "/pages/kaftans" },
        { "label": "Tops & Blouses", "url": "/pages/tops-blouses" },
        { "label": "Coats & Jackets", "url": "/pages/coats-jackets" },
        { "label": "Bags & Accessories", "url": "/pages/bags-accessories" },
        { "label": "Jewellery", "url": "/pages/jewellery" }
      ]
    },
    {
      "title": "DISCOVER",
      "links": [
        { "label": "All Boutiques", "url": "/boutiques" },
        { "label": "How It Works", "url": "/how-it-works" },
        { "label": "New This Week", "url": "/search?new=true" },
        { "label": "70% Off & More", "url": "/search?sale=70" }
      ]
    },
    {
      "title": "FOR BOUTIQUES",
      "links": [
        { "label": "List Your Sales", "url": "/list-sales" },
        { "label": "Our Story", "url": "/about" },
        { "label": "Press", "url": "/press" }
      ]
    },
    {
      "title": "HELP",
      "links": [
        { "label": "Contact", "url": "/contact" },
        { "label": "FAQ", "url": "/faq" },
        { "label": "Privacy", "url": "/privacy" },
        { "label": "Terms", "url": "/terms" }
      ]
    }
  ]'::jsonb
)
WHERE id = 1;
