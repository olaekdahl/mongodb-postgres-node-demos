// CREATE OR REPLACE FUNCTION get_sales_by_date_range(start_date DATE, end_date DATE)
// RETURNS TABLE (id INTEGER, item VARCHAR(255), price NUMERIC(10, 2), quantity INTEGER, date DATE)
// AS $$
// BEGIN
//   RETURN QUERY
//     SELECT sales.id, sales.item, sales.price, sales.quantity, sales.date
//     FROM sales
//     WHERE sales.date BETWEEN start_date AND end_date;
// END;
// $$ LANGUAGE plpgsql;

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'test',
    password: 'postgres',
    port: 5432,
});

async function main() {
  try {
    await client.connect();

    const result = await client.query("SELECT id, item, price, quantity, date FROM get_sales_by_date_range('2023-05-01', '2023-05-31')");
    console.log('Data retrieved:');
    console.log(result.rows);

    await client.end();
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit();
  }
}

main().catch(console.error);
