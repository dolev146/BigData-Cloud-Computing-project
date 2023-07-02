import { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";

const InformationByDate = () => {
  const [data, setData] = useState(null);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const fetchDateRangeData = async () => {
      // Replace this with your actual server endpoint and date range parameters
      const url = `http://localhost:3000/searchByDateRange?startDate=20230101&endDate=20231231`;

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
