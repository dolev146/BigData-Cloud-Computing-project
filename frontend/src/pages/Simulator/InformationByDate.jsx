import { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, message, Spin } from "antd"; // import Spin from antd
import moment from "moment";
const { RangePicker } = DatePicker;

const InformationByDate = () => {
  const [dates, setDates] = useState([moment(), moment()]);
  const [data, setData] = useState(null);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const fetchDateRangeData = async () => {
      // Replace this with your actual server endpoint and date range parameters
      const url = `http://localhost:9080/elastic-api/searchByDateRange?startDate=${
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
  }, []); // Empty dependency array to run only once on mount

  // Replace this with the actual rendering of your data
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
          <h1>Information By Date</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
      </Spin>
    </div>
  );
};

export default InformationByDate;
