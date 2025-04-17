//imports
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://Torsk:wordpass@localhost:5432/icecream"
);
//init seed function
const init = async () => {
  try {
    await client.connect();
    const SQL = `
    DROP TABLE IF EXISTS flavors
    CREATE TABLE  flavors(
    id PRIMARY KEY SERIAL,
    flavor VARCHAR(40),
    is_favorite BOOLEAN DEFAULT TRUE,
    created_at CREATE TIMESTAMP DEFAULT now(),
    updated_at CREATE TIMESTAMP DEFAULT now(),
    );
    `;
    await client.query(SQL);
    await client.end();
    console.log("Database seeded");
  } catch (error) {
    console.error(error);
  }
};
//seed that bitch
init();
