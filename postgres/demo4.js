// CREATE OR REPLACE PROCEDURE update_sales_proc(_id INTEGER, _quantity INTEGER)
// LANGUAGE plpgsql
// AS $$
// BEGIN
//     UPDATE sales
//     SET quantity = _quantity
//     WHERE id = _id;
// END;
// $$;

const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'test',
    password: 'postgres',
    port: 5432,
});

async function callUpdateSales(id, quantity) {
    try {
      await client.connect();
  
      const query = 'CALL update_sales_proc($1, $2)';
      const values = [id, quantity];
  
      const result = await client.query(query, values);
      console.log(result);
  
      await client.end();
    } catch (error) {
      console.error('Error:', error);
      process.exit();
    }
  }
  
  callUpdateSales(1, 100).catch(console.error);
