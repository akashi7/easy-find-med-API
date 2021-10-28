import { createPool } from "mysql";
import { config } from "dotenv";

config();

const db = createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

export { db };