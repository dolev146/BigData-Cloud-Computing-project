import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Spin, Button, Input, Space } from "antd"; // import Spin from antd
import moment from "moment";
const { RangePicker } = DatePicker;

const InfromationByIDandDate = () => {
  const [dates, setDates] = useState([moment(), moment()]);
  const [ID, setID] = useState("");
  const [data, setData] = useState(null);
  const [spinning, setSpinning] = useState(true);

  const handleSubmit = async () => {
    // Replace this with your actual server endpoint and date range parameters
    const url = `http://localhost:9080/elastic-api/searchByIdAndDate?id=${ID}&startDate=${
      dates[0].toISOString().split("T")[0]
    }&endDate=${dates[1].toISOString().split("T")[0]}`;

    try {
      const res = await axios.get(url);
      setData(res.data);
      setSpinning(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // also send a request for today's data on mount and observatoryName change
  useEffect(() => {
    const fetchDateRangeData = async () => {
      // Replace this with your actual server endpoint and date range parameters
      const url = `http://localhost:9080/elastic-api/searchByIdAndDate?id=${ID}&startDate=${
        dates[0].toISOString().split("T")[0]
      }&endDate=${dates[1].toISOString().split("T")[0]}`;

      try {
        const res = await axios.get(url);
        setData(res.data);
        setSpinning(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchDateRangeData();
  }, [ID]); // Empty dependency array to run only once on mount

  return (
    <div>
      <h1>InfromationByIDandDate</h1>
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
        <Space.Compact style={{ width: "30%" }}>
          <Input defaultValue="" placeholder="ID Name" value={ID} />
          <Button
            onClick={() => handleSubmit()}
            style={{ backgroundColor: "#9815bc", color: "white" }}
          >
            Submit
          </Button>
        </Space.Compact>
      </div>
      {data && (
        <Spin spinning={spinning}>
          <h1>Information By ID and by Date</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Spin>
      )}
    </div>
  );
};

export default InfromationByIDandDate;
