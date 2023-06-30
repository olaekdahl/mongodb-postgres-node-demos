-- CALL get_sales_by_date_range_proc('2023-05-01', '2023-05-31');

CREATE OR REPLACE PROCEDURE get_sales_by_date_range_proc(start_date DATE, end_date DATE)
LANGUAGE plpgsql
AS $$
BEGIN
  SELECT sales.id, sales.item, sales.price, sales.quantity, sales.date
  FROM sales
  WHERE sales.date BETWEEN start_date AND end_date;
END;
$$;