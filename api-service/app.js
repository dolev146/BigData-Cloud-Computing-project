// imports
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router as esRouter } from "./routers/elasticRouter.js";
import { router as NASARouter } from "./routers/nasaRouter.js";
import { router as scrapeRouter } from "./routers/scrapeRouter.js";
dotenv.config();

const port = process.env.PORT || 9080;

const app = express();

// mw

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/elastic-api", esRouter);
app.use("/nasa-api", NASARouter);
app.use("/scrape-api", scrapeRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => console.log(`up and running on ${port}`));
