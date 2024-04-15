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


app.post("/", async (req, res) => {
    const { country, userAnswer } = req.body;

    userAnswer.trim();
    try {
        const queryResult = await db.query("SELECT capital FROM capitals WHERE country = $1", [country]);
        const correctAnswer = queryResult.rows[0].capital;

        if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            const question = await getQuizQuestion();
            res.json({ isCorrect: true, question });
        } else {
            const question = await getQuizQuestion();
            res.json({ isCorrect: false, question });
        }
    } catch (err) {
        console.error("Error handling user answer:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
