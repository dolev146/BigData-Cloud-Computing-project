import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const SearchById = ({ asteroidId }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9080/nasa-api/asteroids/3542519`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [asteroidId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>ID: {data.id}</p>
      <p>
        NASA JPL URL: <a href={data.nasa_jpl_url}>{data.nasa_jpl_url}</a>
      </p>
      <p>
        Potentially Hazardous:{" "}
        {data.is_potentially_hazardous_asteroid ? "Yes" : "No"}
      </p>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Close Approach Date</th>
            <th>Orbiting Body</th>
            <th>Relative Velocity (km/h)</th>
            <th>Miss Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {data.close_approach_data.map((approach, index) => (
            <tr key={index}>
              <td>{approach.close_approach_date}</td>
              <td>{approach.orbiting_body}</td>
              <td>{approach.relative_velocity.kilometers_per_hour}</td>
              <td>{approach.miss_distance.kilometers}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchById;
