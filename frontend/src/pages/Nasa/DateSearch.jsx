import React, { useEffect, useState } from "react";

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
                      <div>
                        {asteroids.map((asteroid) => (
                          <div key={asteroid.id}>
                            <div>Asteroid ID: {asteroid.id}</div>
                            <div>
                              Absolute Magnitude :
                              {asteroid.absolute_magnitude_h}
                            </div>
                            <div>
                              Estimated Diameter (m):
                              {
                                asteroid.estimated_diameter.meters
                                  .estimated_diameter_min
                              }
                            </div>
                            <div>
                              Is Potentially hazardous asteroid?:
                              {asteroid.is_potentially_hazardous_asteroid
                                ? "True"
                                : "False"}
                            </div>
                            <div>
                              Close Approach Date:
                              {
                                asteroid.close_approach_data[0]
                                  .close_approach_date
                              }
                            </div>
                            <div>Name : {asteroid.name}</div>
                          </div>
                        ))}
                      </div>
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
