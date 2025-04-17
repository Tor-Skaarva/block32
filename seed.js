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
    DROP TABLE IF EXISTS flavors;
    CREATE TABLE flavors(
    id SERIAL PRIMARY KEY,
    flavor VARCHAR(40),
    is_favorite BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now());
    INSERT INTO flavors (flavor) VALUES ('Vanilla');
     INSERT INTO flavors (flavor) VALUES ('Chocolate');
      INSERT INTO flavors (flavor) VALUES ('Strawberry');
    `;
    await client.query(SQL);
    await client.end();
    console.log("Database seeded");
  } catch (error) {
    console.error(error);
  }
};
//seed
init();
