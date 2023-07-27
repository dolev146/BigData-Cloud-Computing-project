import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Card, Spin, Table, Select } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

const InformationByDate = () => {
  const [dates, setDates] = useState([moment(), moment()]);
  const [data, setData] = useState(null);
  const [spinning, setSpinning] = useState(true);
  const [pageSize, setPageSize] = useState(4); // set default page size

  useEffect(() => {
    const fetchDateRangeData = async () => {
      const url = `http://localhost:9080/elastic-api/searchByDateRange?startDate=${dates[0]
        .startOf("day")
        .valueOf()}&endDate=${dates[1].endOf("day").valueOf()}`;

      try {
        const res = await axios.get(url);
        setData(
          res.data.hits.hits.map((hit, index) => ({
            ...hit._source,
            _id: index, // Here we use the array index as a unique id. Use only if you're sure your data order won't change.
          }))
        );
        setSpinning(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchDateRangeData();
  }, [dates]); // Include dates in dependency array

  // New EventSource component
  const EventSource = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: isExpanded || text.length <= 5 ? "clip" : "ellipsis",
          cursor: "pointer",
          maxWidth: isExpanded ? "auto" : "100px",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {text}
      </div>
    );
  };

  const EventType = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: isExpanded || text.length <= 5 ? "clip" : "ellipsis",
          cursor: "pointer",
          maxWidth: isExpanded ? "auto" : "100px",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {text}
      </div>
    );
  };

  // Define columns for Table
  const columns = [
    {
      title: "Event Type",
      dataIndex: "eventType",
      render: (text) => <EventType text={text} />,
    },
    {
      title: "Event Source",
      dataIndex: "eventSource",
      render: (text) => <EventSource text={text} />,
    },
    {
      title: "Urgency",
      dataIndex: "urgency",
      sorter: (a, b) => a.urgency - b.urgency, // for sorting
      sortDirections: ["descend", "ascend"], // allows both ascending and descending sort
      render: (urgency) => (
        <div
          style={{
            backgroundColor:
              urgency >= 5
                ? "#FF4D4F"
                : urgency >= 3
                ? "#FFFBE6"
                : "transparent",
          }}
        >
          {urgency}
        </div>
      ),
    },
    {
      title: "Event TS",
      dataIndex: "eventTS",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "RA Value",
      dataIndex: "ra",
      render: (ra) => `${ra.ra_val} (${ra.ra_pm})`,
    },
    {
      title: "DEC Value",
      dataIndex: "dec",
      render: (dec) => `${dec.dec_val} (${dec.dec_pm})`,
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <RangePicker
          format="YYYY-MM-DD"
          onChange={(dates, dateStrings) => {
            if (dates) {
              setDates(dates);
            } else {
              setDates([]);
            }
          }}
        />
      </div>

      <Spin spinning={spinning} size="large">
        {data && (
          <>
            <Card title="Information By Date">
              <Table
                dataSource={data}
                columns={columns}
                rowKey={(row) => row._id}
                pagination={{ pageSize }}
              />
            </Card>
          </>
        )}
      </Spin>
    </div>
  );
};

export default InformationByDate;
