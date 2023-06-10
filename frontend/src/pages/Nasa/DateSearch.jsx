import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const DateSearch = () => {
  const [jsonResponse, setjsonResponse] = useState("");
  const [near_earth_objects, setNearEarthObjects] = useState({});

  useEffect(() => {
    const fetchDate = async () => {
      console.log("DateSearch");
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_date: "2031-04-01",
          end_date: "2031-04-02",
        }),
      };

      const response = await fetch(
        "http://localhost:9080/nasa-api/asteroids",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      setjsonResponse(data);
      setNearEarthObjects(data.near_earth_objects);
    };
    fetchDate();
  }, []);

  return (
    <div>
      <div>
        {jsonResponse.element_count > 0 ? jsonResponse.element_count : ""}
      </div>
      <div>
        {jsonResponse?.near_earth_objects
          ? Object.entries(jsonResponse.near_earth_objects).map(
              ([date, asteroids]) => {
                return (
                  <React.Fragment key={date}>
                    <br />
                    <div key={date}>
                      {date}: {asteroids.length} objects
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Asteroid ID</th>
                            <th>Absolute Magnitude</th>
                            <th>Estimated Diameter (m)</th>
                            <th>Is Potentially hazardous asteroid?</th>
                            <th>Close Approach Date</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {asteroids.map((asteroid) => (
                            <tr key={asteroid.id}>
                              <td>{asteroid.id}</td>
                              <td>{asteroid.absolute_magnitude_h}</td>
                              <td>
                                {
                                  asteroid.estimated_diameter.meters
                                    .estimated_diameter_min
                                }
                              </td>
                              <td>
                                {asteroid.is_potentially_hazardous_asteroid
                                  ? "True"
                                  : "False"}
                              </td>
                              <td>
                                {
                                  asteroid.close_approach_data[0]
                                    .close_approach_date
                                }
                              </td>
                              <td>{asteroid.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
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
