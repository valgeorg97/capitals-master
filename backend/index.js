import express from "express";
import {PORT} from "./config.js"
import cors from "cors";

const app = express();

app.use(cors());

app.listen(PORT, () =>{
    console.log('test')
})

app.use(express.json());