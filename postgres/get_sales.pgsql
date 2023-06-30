CREATE OR REPLACE FUNCTION get_sales()
  RETURNS TABLE (
    id INTEGER,
    item VARCHAR(255),
    price NUMERIC(10, 2),
    quantity INTEGER,
    date DATE
  )
AS $$
BEGIN
  RETURN QUERY
    SELECT sales.id, sales.item, sales.price, sales.quantity, sales.date
    FROM sales;
END;
$$ LANGUAGE plpgsql;