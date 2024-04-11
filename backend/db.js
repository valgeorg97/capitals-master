import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "capitals_quiz",
    password: "banano2",
    port: 5432
  });

  export default db;