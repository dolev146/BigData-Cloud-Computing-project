import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AsteroidTable from "./AsteroidTable";

const DateSearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [jsonResponse, setjsonResponse] = useState("");
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
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        }),
      };

      const response = await fetch(
        "http://localhost:9080/nasa-api/asteroids",
        requestOptions
      );
      const data = await response.json();

      const firstDate = Object.keys(data.near_earth_objects)[0];
      setVisible({ [firstDate]: true });

      setjsonResponse(data);
      setLoading(false);
    };

    if (Math.abs(endDate - startDate) <= 7 * 24 * 60 * 60 * 1000) {
      setError(null);
      fetchDate();
    } else {
      setError("The selected date range should not exceed 7 days.");
    }
  }, [startDate, endDate]);

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
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        {error && <div style={{ color: "red" }}>{error}</div>}
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
