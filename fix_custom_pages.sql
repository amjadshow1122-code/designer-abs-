ALTER TABLE custom_pages 
  DROP COLUMN curated_product_ids,
  DROP COLUMN curated_sale_ids;

ALTER TABLE custom_pages 
  ADD COLUMN curated_product_ids BIGINT[] DEFAULT '{}',
  ADD COLUMN curated_sale_ids BIGINT[] DEFAULT '{}';
