import { Router } from "express";
import axios from "axios";

export const router = Router();

router.get("/", (req, res) => {
  res.send("here");
});

const NASA_API_KEY = 'mGPjOsE8TbPZKuHjDPrIqM5rHFK9Wch06bP7TXM3'; 

router.get('/asteroids', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date: '2024-05-07',
        end_date: '2024-05-13',
        api_key: NASA_API_KEY,
      },
    });

    const asteroidData = response.data;
    res.json(asteroidData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch asteroid data' });
  }
});
