import React, { useEffect, useState } from "react";
import { DatePicker, message, Spin, Card } from "antd";
import moment from "moment";
import AsteroidTable from "./AsteroidTable";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const DateSearch = () => {
  const [dates, setDates] = useState([moment(), moment()]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchKey = "SEARCH_" + dates[0].toISOString().split("T")[0] + dates[1].toISOString().split("T")[0];

  useEffect(() => {
    const fetchDate = async () => {
      setLoading(true);

      let storedData = localStorage.getItem(searchKey);
      if (storedData) {
        setDataToDisplay(JSON.parse(storedData));
        setLoading(false);
        return;
      }

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

      let merged_data = [];
      for (const dataForDate of Object.values(data.near_earth_objects)) {
        merged_data.push(...dataForDate);
      }

      merged_data = merged_data.sort(
        (a, b) =>
          new Date(a.close_approach_data[0].close_approach_date) -
          new Date(b.close_approach_data[0].close_approach_date)
      );

      setDataToDisplay(merged_data);

      // Trim the local storage if it has more than 10 search items.
      const searchKeys = Object.keys(localStorage).filter(key => key.startsWith("SEARCH_"));
      while (searchKeys.length > 10) {
        localStorage.removeItem(searchKeys.shift());
      }

      // Save the new search results to local storage.
      localStorage.setItem(searchKey, JSON.stringify(merged_data));

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
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <div style={{ cursor: "pointer" }}>
      <FlexContainer>
        <>
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
        </>
      </FlexContainer>
      <div>
        <AsteroidTable asteroids={dataToDisplay} />
      </div>
    </div>
  );
};

export default DateSearch;
