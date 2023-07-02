import { Router } from "express";
import axios from "axios";

const router = Router();

// Search by 2 date ranges
router.get("/searchByDateRange", async (req, res) => {
  const { startDate, endDate } = req.query;

  // Replace this URL with your actual ElasticSearch endpoint.
  const url = `http://localhost:9200/your_index/_search?q=date:>=${startDate} AND date:<=${endDate}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search by observatory and 2 date ranges
router.get("/searchByObservatoryAndDate", async (req, res) => {
  const { observatory, startDate, endDate } = req.query;

  const url = `http://localhost:9200/your_index/_search?q=observatory:${observatory} AND date:>=${startDate} AND date:<=${endDate}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search by ID and 2 date ranges
router.get("/searchByIdAndDate", async (req, res) => {
  const { id, startDate, endDate } = req.query;

  const url = `http://localhost:9200/your_index/_search?q=id:${id} AND date:>=${startDate} AND date:<=${endDate}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function initializeSocketIO (io) {
  router.post("/alerts", async (req, res) => {
    const alert = req.body;

    // Emit the 'new-alert' event to all connected clients
    io.emit("new-alert", alert);

    res.status(201).json(alert);
  });
}

// Get observatory events data for graph
router.get("/observatoryEventsData", async (req, res) => {
  // Depending on your data schema, you may need to adjust the below ElasticSearch aggregations query accordingly.
  const data = {
    size: 0,
    aggs: {
      observatories: {
        terms: { field: "observatory" },
        aggs: {
          NumberOfEvents: { value_count: { field: "event" } },
          NumberOfDangerousEvents: {
            value_count: { field: "dangerous_event" }
          }
        }
      }
    }
  };

  const url = "http://localhost:9200/your_index/_search";

  try {
    const response = await axios.post(url, data);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get 4 stat numbers
router.get("/stats", async (req, res) => {
  // The ElasticSearch query will highly depend on what those 4 stats are supposed to represent.
  // Replace `stat1`, `stat2`, `stat3`, `stat4` with actual field names from your index.
  const data = {
    size: 0,
    aggs: {
      stat1: { value_count: { field: "stat1" } },
      stat2: { value_count: { field: "stat2" } },
      stat3: { value_count: { field: "stat3" } },
      stat4: { value_count: { field: "stat4" } }
    }
  };

  const url = "http://localhost:9200/your_index/_search";

  try {
    const response = await axios.post(url, data);
    /* send me a json looks like this { number1 : 50 , number2 : 90 , number3 : 20 , number4 : 70 } */
    /* first number needs to be ovarall events */
    /* second number needs to be dangerous events */
    /* third number needs to be number of observatories */
    /* fourth number needs to be number of something you decide, maybe events for a certien observatory idk */
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/observatories", async (req, res) => {
  try {
    const result = await client.search({
      index: "observatories",
      body: {
        // define your query here
        // you might use aggregations to get the count of events and dangerous events per observatory
      }
    });

    // process the result to form an array of observatory data
    const observatories = result.body.aggregations.observatories.buckets.map(
      (bucket) => ({
        ObservatoryName: bucket.key,
        NumberOfEvents: bucket.events.doc_count,
        NumberOfDangerousEvents: bucket.dangerousEvents.doc_count
      })
    );

    res.json(observatories);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while querying the database");
  }
});

export { router, initializeSocketIO };
