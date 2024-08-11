import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "social",
  password: "root123",
  port: 5432,
});

export default db;
