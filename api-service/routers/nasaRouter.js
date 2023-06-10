import { Router } from "express";
import axios from "axios";

export const router = Router();

router.get("/", (req, res) => {
  res.send("here");
});

const NASA_API_KEY = 'mGPjOsE8TbPZKuHjDPrIqM5rHFK9Wch06bP7TXM3'; 

router.post('/asteroids', async (req, res) => {
  try {
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;

    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate,
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

// Lookup a specific asteroid based on its NASA JPL small body id
router.get('/asteroids/:asteroidId', async (req, res) => {
  try {
    const asteroidId = req.params.asteroidId;

    const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}`, {
      params: {
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

// Browse the overall asteroid dataset
router.get('/asteroids/browse', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse/', {
      params: {
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
