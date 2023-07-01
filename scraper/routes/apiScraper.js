import express from "express";
import fetchAll from "./fetchAll.js";
const router = express.Router();

router.get("/all-images-and-aria-labels", async (req, res) => {
  const result = await fetchAll();
  res.status(200).json(result);
});

export default router;
