const express = require("express");
const app = express();
const PORT = 3000;
const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://Torsk:wordpass@localhost:5432/icecream"
);
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));

app.listen(PORT, () => {
  console.log(`I am listening to port ${PORT}`);
});

app.get("/api/flavors", async (req, res, next) => {
  try {
    const SQL = `
        SELECT * FROM flavors
        `;
    const response = await client.query(SQL);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
  }
});
app.get("/api/flavors:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
    SELECT * FROM flavors:id;
    `;
    const response = await client.query(SQL);
    res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
  }
});
app.post("api/flavors", async (req, res, next) => {
  try {
    const { flavor } = req.body;
    const SQL = `
        INSERT INTO flavors(flavor) VALUES($1) RETURNING
        `;
    const response = await client.query(SQL);
  } catch (error) {
    console.error(error);
  }
});
app.delete("api/flavors:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `
    DELETE FROM flavors WHERE id = $1;
    `;
    await client.query(SQL, [id]);
  } catch (error) {}
});
app.put("api/flavors:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { flavor, is_favorite } = req.body;
    const SQL = `
    UPDATE flavors
    SET is_flavor = $1
    WHERE id = $2
    RETURNING *
    `;
    const response = await client.query(SQL, [is_favorite, id]);
  } catch (error) {
    console.error(error);
  }
});

const init = async () => {
  await client.connect();
};

init();
