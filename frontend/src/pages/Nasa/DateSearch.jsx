import React, { useEffect, useState } from "react";
import { DatePicker, message, Spin } from "antd"; // import Spin from antd
import moment from "moment";
import AsteroidTable from "./AsteroidTable";

const { RangePicker } = DatePicker;

const DateSearch = () => {
  const [dates, setDates] = useState([moment(), moment()]);
  const [dataToDisplay, setDataToDisplay] = useState([]); // add this line
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventsPerDate, setEventsPerDate] = useState({});

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

      
      let merged_data = []
      let eventsPerDate = {}
      
      for (const [date, dataForDate] of Object.entries(data.near_earth_objects)) {
        merged_data.push(...dataForDate)
        eventsPerDate[date] = dataForDate.length
      }

      eventsPerDate = Object.keys(eventsPerDate).sort((a,b)=> new Date(a)>new Date(b)).reduce(
        (obj, key) => { 
          obj[key] = eventsPerDate[key]; 
          return obj;
        }, 
        {}
      );
      merged_data = merged_data.sort((a, b) => {new Date(a.close_approach_data[0].close_approach_date) > new Date(b.close_approach_data[0].close_approach_date) ? 1 : -1})
      console.log(merged_data, "MERGED DATA") 
      setDataToDisplay(merged_data)
      setEventsPerDate(eventsPerDate)

      setLoading(false);
    };

    if (
      dates.length === 2 &&
      Math.abs(dates[0] - dates[1]) <= 7 * 24 * 60 * 60 * 1000
    ) {
      setError(null);
      fetchDate();
    } else {
      setError("The selected date range should not exceed 7 days.");
    }
  }, [dates]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin tip="Loading..." size="large" /> {/* return the Spin component */}
      </div>
    );
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
                const diffInDays = moment(dates[1]).diff(
                  moment(dates[0]),
                  "days"
                );
                if (diffInDays <= 7) {
                  setDates(dates);
                  setError(null);
                } else {
                  message.error(
                    "The selected date range should not exceed 7 days."
                  );
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
      {eventsPerDate &&
        Object.entries(eventsPerDate).map(([date, numberOfEvents]) => (
          <div key={date}>
            {`Date: ${date}, Number of Events: ${numberOfEvents}`}
          </div>
        ))}
    </div>
      <div>
        <AsteroidTable asteroids={dataToDisplay} />
      </div>
    </div>
  );
};

export default DateSearch;
