import { Router } from "express";
// import axios from "axios";
import { Client } from "@elastic/elasticsearch";
const client = new Client({ node: "http://localhost:9200" });

const router = Router();

// Search by 2 date ranges
router.get("/searchByDateRange", async (req, res) => {
  const { startDate, endDate } = req.query;

  // Replace this URL with your actual ElasticSearch endpoint.
  // const url = `http://localhost:9200/your_index/_search?q=date:>=${startDate} AND date:<=${endDate}`;

  try {
    // const response = await axios.get(url);
    // res.json(response.data);
    res.json({
      dummyData: "dummyData",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search by observatory and 2 date ranges
router.get("/searchByObservatoryAndDate", async (req, res) => {
  const { observatoryName, startDate, endDate } = req.query;

  // const url = `http://localhost:9200/your_index/_search?q=observatory:${observatoryName} AND date:>=${startDate} AND date:<=${endDate}`;
  try {
    // const response = await axios.get(url);
    // res.json(response.data);
    res.json({
      dummyData: "dummyData",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search by ID and 2 date ranges
router.get("/searchByIdAndDate", async (req, res) => {
  const { id, startDate, endDate } = req.query;

  // Convert date to timestamp
  const startDateTimestamp = new Date(startDate).getTime();
  const endDateTimestamp = new Date(endDate).getTime();

  try {
    const response = await client.search({
      index: "stars",
      body: {
        query: {
          bool: {
            filter: [
              { term: { _id: id } },
              {
                range: {
                  "_source.eventTS": {
                    gte: startDateTimestamp,
                    lte: endDateTimestamp
                  }
                }
              }
            ]
          }
        }
      }
    });
    res.json(response.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

function initializeSocketIO(io) {
  router.post("/alerts", async (req, res) => {
    const alert = req.body;

    // Emit the 'new-alert' event to all connected clients
    io.emit("new-alert", alert);

    res.status(201).json(alert);
  });
}

// Get 4 stat numbers
router.get("/stats", async (req, res) => {
  // The ElasticSearch query will highly depend on what those 4 stats are supposed to represent.
  // Replace `stat1`, `stat2`, `stat3`, `stat4` with actual field names from your index.
  /*  const data = {
    size: 0,
    aggs: {
      stat1: { value_count: { field: "stat1" } },
      stat2: { value_count: { field: "stat2" } },
      stat3: { value_count: { field: "stat3" } },
      stat4: { value_count: { field: "stat4" } }
    }
  }; */

  // const url = "http://localhost:9200/your_index/_search";

  try {
    // const response = await axios.post(url, data);
    /* send me a json looks like this { number1 : 50 , number2 : 90 , number3 : 20 , number4 : 70 } */
    /* TODO: first number Total Number of Events */
    /* TODO: second number Total Number of Dangerous Events */
    /* TODO: third number needs to be Number of Events in the Last 24 Hours */
    /* TODO: fourth number needs to be Number of Events in the Last 7 Days */
    // res.json(response.data);
    res.json({ number1: 50, number2: 90, number3: 20, number4: 70 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/observatories", async (req, res) => {
  try {
    // const result = await client.search({
    //   index: "observatories",
    //   body: {
    //     // define your query here
    //     // you might use aggregations to get the count of events and dangerous events per observatory
    //   }
    // });

    // process the result to form an array of observatory data
    // const observatories = result.body.aggregations.observatories.buckets.map(
    //   (bucket) => ({
    //     ObservatoryName: bucket.key,
    //     NumberOfEvents: bucket.events.doc_count,
    //     NumberOfDangerousEvents: bucket.dangerousEvents.doc_count
    //   })
    // );

    // res.json(observatories);
    res.json([
      {
        ObservatoryName: "observatory1",
        NumberOfEvents: 50,
        NumberOfDangerousEvents: 20,
      },
      {
        ObservatoryName: "observatory2",
        NumberOfEvents: 30,
        NumberOfDangerousEvents: 10,
      },
      {
        ObservatoryName: "observatory3",
        NumberOfEvents: 20,
        NumberOfDangerousEvents: 5,
      },
    ]);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while querying the database");
  }
});

export { router, initializeSocketIO };
