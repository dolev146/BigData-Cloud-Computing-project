import React, { useEffect, useState } from "react";
import { DatePicker, message, Spin, Card } from "antd"; // import Spin from antd
import moment from "moment";
import AsteroidTable from "./AsteroidTable";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled(Card)`
  margin-top: 16px;
  border: none;
  cursor: default;
  width: 270px; // fixed width
  margin: 8px; // give it a margin to separate each card
  // shadow and a little border
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-radius: 1rem;
`;

const FlexWrapContainer = styled.div`
  display: flex;
  flex-wrap: wrap; // allow for the elements to wrap
  align-items: center;
`;

const BoldText = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

const NormalText = styled.div`
  text-align: center;
  font-size: 16px;
`;

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

      let merged_data = [];
      let eventsPerDate = {};

      for (const [date, dataForDate] of Object.entries(
        data.near_earth_objects
      )) {
        merged_data.push(...dataForDate);
        eventsPerDate[date] = dataForDate.length;
      }

      eventsPerDate = Object.keys(eventsPerDate)
        .sort((a, b) => new Date(a) > new Date(b))
        .reduce((obj, key) => {
          obj[key] = eventsPerDate[key];
          return obj;
        }, {});
      merged_data = merged_data.sort(
        (a, b) =>
          new Date(a.close_approach_data[0].close_approach_date) -
          new Date(b.close_approach_data[0].close_approach_date)
      );

      console.log(merged_data, "MERGED DATA");
      setDataToDisplay(merged_data);
      setEventsPerDate(eventsPerDate);

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
      <FlexWrapContainer>
        {eventsPerDate &&
          Object.entries(eventsPerDate).map(([date, numberOfEvents]) => (
            <CardContainer key={date}>
              <BoldText>
                Date: <span style={{ color: "#1890ff" }}>{date}</span>
              </BoldText>
              <NormalText>
                Number of Events:{" "}
                <span style={{ color: "#ff4d4f" }}>{numberOfEvents}</span>
              </NormalText>
            </CardContainer>
          ))}
      </FlexWrapContainer>
      <div>
        <AsteroidTable asteroids={dataToDisplay} />
      </div>
    </div>
  );
};

export default DateSearch;
