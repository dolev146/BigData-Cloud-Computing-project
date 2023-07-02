// imports
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  router as esRouter,
  initializeSocketIO,
} from "./routers/elasticRouter.js";
import { router as NASARouter } from "./routers/nasaRouter.js";
import { router as scrapeRouter } from "./routers/scrapeRouter.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();

const port = process.env.PORT || 9080;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// mw
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/elastic-api", esRouter);
app.use("/nasa-api", NASARouter);
app.use("/scrape-api", scrapeRouter);

// Initialize the Socket.IO routes
initializeSocketIO(io);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`up and running on ${port}`));
