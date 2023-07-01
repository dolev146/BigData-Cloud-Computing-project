import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Input, Button } from 'antd';

const SearchById = () => {
  const [asteroidId, setAsteroidId] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!asteroidId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9080/nasa-api/asteroids/${asteroidId}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [asteroidId]);

  const handleSearchClick = () => {
    const value = document.getElementById("asteroidId").value;
    setAsteroidId(value);
  }

  if (!data) {
    return (
      <div>
        <Input id="asteroidId" placeholder="Enter asteroid id" />
        <Button onClick={handleSearchClick}>Search</Button>
      </div>
    );
  }

  return (
    <div>
      <Input id="asteroidId" placeholder="Enter asteroid id" />
      <Button onClick={handleSearchClick}>Search</Button>

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
