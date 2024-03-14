const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const generateRandomCustomer = () => {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
  return {
    name: `Name ${getRandomInt(1000)}`,
    email: `email${getRandomInt(1000)}@example.com`,
    phone: `${getRandomInt(1000000000)}`,
    positionx: getRandomInt(100),
    positiony: getRandomInt(100),
  };
};

const seedCustomers = async () => {
  const customers = new Array(30).fill(null).map(generateRandomCustomer);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    for (const customer of customers) {
      await client.query(
        `INSERT INTO customer (name, email, phone, positionx, positiony)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          customer.name,
          customer.email,
          customer.phone,
          customer.positionx,
          customer.positiony,
        ]
      );
    }
    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

seedCustomers()
  .then(() => {
    console.log("Seed complete.");
    pool.end();
  })
  .catch((e) => {
    console.error("Seeding error:", e);
    pool.end();
  });
