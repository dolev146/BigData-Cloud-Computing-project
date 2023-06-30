//imports
import express from "express";
import cors from "cors";
import apiScraper from './routes/apiScraper.js';
import dotenv from 'dotenv';
dotenv.config();


// listiner
const port = process.env.PORT || 5001;

const app = express();

// mw
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/scraper", apiScraper);

app.listen(port, () => console.log(`up and running on ${port}`));
