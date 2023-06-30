CREATE OR REPLACE FUNCTION get_sales_by_date_range(start_date DATE, end_date DATE)
RETURNS TABLE (id INTEGER, item VARCHAR(255), price NUMERIC(10, 2), quantity INTEGER, date DATE)
AS $$
BEGIN
  RETURN QUERY
    SELECT sales.id, sales.item, sales.price, sales.quantity, sales.date
    FROM sales
    WHERE sales.date BETWEEN start_date AND end_date;
END;
$$ LANGUAGE plpgsql;