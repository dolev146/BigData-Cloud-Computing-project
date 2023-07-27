import { Router } from "express";
import { Client } from "@elastic/elasticsearch";

const router = Router();
const client = new Client({ node: "http://elasticsearch:9200" });

// Search by 2 date ranges
router.get("/searchByDateRange", async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log(startDate, endDate);
  try {
    const response = await client.search({
      index: "stars",
      body: {
        query: {
          range: {
            eventTS: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    });
    console.log(response.body);
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/searchByObservatoryAndDate", async (req, res) => {
  const startDate = parseInt(req.query.startDate.trim(), 10);
  const endDate = parseInt(req.query.endDate.trim(), 10);
  const observatoryName = req.query.observatoryName.trim();

  console.log(
    "start Date,",
    startDate,
    "end date ",
    endDate,
    "observatory name",
    observatoryName
  );

  try {
    const response = await client.search({
      index: "stars",
      body: {
        query: {
          bool: {
            must: [
              {
                match: {
                  eventSource: observatoryName,
                },
              },
              {
                range: {
                  eventTS: {
                    gte: startDate,
                    lte: endDate,
                  },
                },
              },
            ],
          },
        },
      },
    });
    console.log(response.body);
    res.json(response.body);
  } catch (error) {
    console.error(error);
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
                    lte: endDateTimestamp,
                  },
                },
              },
            ],
          },
        },
      },
    });
    res.json(response.body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get 4 stat numbers
router.get("/stats", async (req, res) => {
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

export { router };
