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

        await deleteTable();
        await createTable();
        await insertData();
        await readData();
        await updateData();
        await deleteData();

        await client.end();
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit();
    }
}

async function deleteTable() {
    await client.query(`
      DROP TABLE IF EXISTS sales
    `);
    console.log('Table deleted successfully');
}

async function createTable() {
    await client.query(`
    CREATE TABLE sales (
      id SERIAL PRIMARY KEY,
      item VARCHAR(255) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      quantity INTEGER NOT NULL,
      date DATE NOT NULL
    )
  `);
    console.log('Table created successfully');
}

async function insertData() {
    await client.query(`
    INSERT INTO sales (item, price, quantity, date)
    VALUES ('Product A', 19.99, 10, '2023-05-01'),
           ('Product B', 9.99, 5, '2023-05-02'),
           ('Product C', 14.99, 3, '2023-05-03')
  `);
    console.log('Data inserted successfully');
}

async function readData() {
    const result = await client.query(`
    SELECT * FROM sales
  `);
    console.log('Data retrieved:');
    console.log(result.rows);
}

async function updateData() {
    await client.query(`
    UPDATE sales
    SET price = 24.99
    WHERE item = 'Product A'
  `);
    console.log('Data updated successfully');
}

async function deleteData() {
    await client.query(`
    DELETE FROM sales
    WHERE item = 'Product C'
  `);
    console.log('Data deleted successfully');
}

main().catch(console.error);
