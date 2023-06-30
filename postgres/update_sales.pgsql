CREATE OR REPLACE PROCEDURE update_sales_proc(_id INTEGER, _quantity INTEGER)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE sales
    SET quantity = _quantity
    WHERE id = _id;
END;
$$;