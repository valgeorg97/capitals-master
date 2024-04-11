import express from "express";
import { PORT } from "./config.js";
import cors from "cors";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());

async function getQuizQuestion() {
    try {
        const queryResult = await db.query("SELECT country, capital FROM capitals ORDER BY RANDOM() LIMIT 1");
        return queryResult.rows[0];
    } catch (err) {
        console.error("Error fetching quiz question:", err);
        throw err;
    }
}

db.connect()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(err => {
        console.error("Error connecting to the database:", err);
    });

app.get("/", async (req, res) => {
    try {
        const question = await getQuizQuestion();
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
