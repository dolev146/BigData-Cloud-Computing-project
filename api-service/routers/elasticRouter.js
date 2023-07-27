import { Router } from "express";
import { Client } from "@elastic/elasticsearch";

const router = Router();
const ELASTIC_SEARCH_URL = process.env.ELASTICSEARCH_URL || "http://localhost:9200";
const client = new Client({ node: ELASTIC_SEARCH_URL });

// Search by 2 date ranges
router.get("/searchByDateRange", async (req, res) => {
	const { startDate, endDate } = req.query;
	
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

const getESData = async (index, query) => {
	const aggregationTerm = {
		eventSource: {
			terms: { field: "eventSource.keyword" },
		},
	};
};

router.get("/observatories", async (req, res) => {
	try {
		const mapping = {};
		const responseAggregate = await client.search({
			index: "stars", // Replace 'Stars' with your actual index name
			size: 0, // Set to 0 to only retrieve aggregation results without actual documents
			body: {
				aggs: {
					eventSource: {
						terms: { field: "eventSource.keyword" },
					},
				},
			},
		});

		const responseDangerous = await client.search({
			index: "stars", // Replace 'Stars' with your actual index name
			size: 0, // Set to 0 to only retrieve aggregation results without actual documents
			body: {
				query: {
					range: {
						urgency: { gte: 3 }, // Filter events with urgency greater than 3
					},
				},
				aggs: {
					eventSourceUrgent: {
						terms: { field: "eventSource.keyword" },
					},
				},
			},
		});

		const {
			body: {
				aggregations: { eventSource },
			},
		} = responseAggregate;

		for (const bucketObj of eventSource.buckets) {
			if (bucketObj?.key) {
				mapping[bucketObj?.key] = {
					ObservatoryName: bucketObj?.key?.slice(0, 5),
					NumberOfEvents: bucketObj?.doc_count,
					NumberOfDangerousEvents: 0,
				};
			}
		}

		const {
			body: {
				aggregations: { eventSourceUrgent },
			},
		} = responseDangerous;

		for (const bucketObj of eventSourceUrgent.buckets) {
			if (bucketObj?.key && mapping[bucketObj?.key]) {
				mapping[bucketObj?.key].NumberOfDangerousEvents = bucketObj?.doc_count;
			}
		}

		res.json(Object.values(mapping));
	} catch (error) {
		console.error(error);
		res.status(500).send([]);
	}
});

export { router };
