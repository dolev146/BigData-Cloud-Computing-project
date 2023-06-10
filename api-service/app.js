// imports
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as esRouter } from "./routers/elastic-router.js";
dotenv.config();

const port = process.env.PORT || 9080;

const app = express();

// mw

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/elastic-api", esRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`up and running on ${port}`));
