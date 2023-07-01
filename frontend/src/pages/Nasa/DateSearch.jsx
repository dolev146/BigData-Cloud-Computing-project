import React, { useEffect, useState } from "react";
import { DatePicker, message } from 'antd';
import moment from 'moment';
import AsteroidTable from "./AsteroidTable";

const { RangePicker } = DatePicker;

const DateSearch = () => {
  const [dates, setDates] = useState([]);
  const [jsonResponse, setJsonResponse] = useState("");
  const [visible, setVisible] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: dates[0].toISOString().split("T")[0],
          end_date: dates[1].toISOString().split("T")[0],
        }),
      };

      const response = await fetch(
        "http://localhost:9080/nasa-api/asteroids",
        requestOptions
      );
      const data = await response.json();

      const firstDate = Object.keys(data.near_earth_objects)[0];
      setVisible({ [firstDate]: true });

      setJsonResponse(data);
      setLoading(false);
    };

    if (dates.length === 2 && Math.abs(dates[0] - dates[1]) <= 7 * 24 * 60 * 60 * 1000) {
      setError(null);
      fetchDate();
    } else {
      setError("The selected date range should not exceed 7 days.");
    }
  }, [dates]);

  const toggleVisibility = (date) => {
    setVisible((prevVisible) => ({
      ...prevVisible,
      [date]: !prevVisible[date],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ cursor: "pointer" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <RangePicker
            format="YYYY-MM-DD"
            onChange={(dates, dateStrings) => {
              if (dates) {
                const diffInDays = moment(dates[1]).diff(moment(dates[0]), 'days');
                if (diffInDays <= 7) {
                  setDates(dates);
                  setError(null);
                } else {
                  message.error("The selected date range should not exceed 7 days.");
                  setError("The selected date range should not exceed 7 days.");
                }
              } else {
                setDates([]);
              }
            }}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
      <div>
        {jsonResponse && jsonResponse.element_count > 0
          ? `Total objects: ${jsonResponse.element_count}`
          : ""}
      </div>
      <div>
        {jsonResponse?.near_earth_objects
          ? Object.entries(jsonResponse.near_earth_objects).map(
              ([date, asteroids]) => {
                return (
                  <React.Fragment key={date}>
                    <h2 onClick={() => toggleVisibility(date)}>
                      {date}: {asteroids.length} objects{" "}
                      {visible[date] ? "▼" : "▶"}
                    </h2>
                    {visible[date] && <AsteroidTable asteroids={asteroids} />}
                  </React.Fragment>
                );
              }
            )
          : ""}
      </div>
    </div>
  );
};

export default DateSearch;
