const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "postgres",
  port: 5432,
});

const getAllSales = async (callback) => {
  try {
    pool.query("SELECT * FROM sales;", (error, results) => {
      console.log(results.rows);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllSales,
};


getAllSales(()=>{});