import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Row, Col } from 'antd';

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

  const columns = [
    {
      title: 'Close Approach Date',
      dataIndex: 'close_approach_date',
      key: 'close_approach_date',
    },
    {
      title: 'Orbiting Body',
      dataIndex: 'orbiting_body',
      key: 'orbiting_body',
    },
    {
      title: 'Relative Velocity (km/h)',
      dataIndex: 'relative_velocity',
      key: 'relative_velocity',
      render: text => text.kilometers_per_hour
    },
    {
      title: 'Miss Distance (km)',
      dataIndex: 'miss_distance',
      key: 'miss_distance',
      render: text => text.kilometers
    },
  ];

  if (!data) {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Row>
          <Col span={8}>
            <Input id="asteroidId" placeholder="Enter asteroid id" />
            <Button onClick={handleSearchClick} style={{width: '100%'}}>Search</Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Row>
          <Col span={8}>
            <Input id="asteroidId" placeholder="Enter asteroid id" />
            <Button onClick={handleSearchClick} style={{width: '100%'}}>Search</Button>
          </Col>
        </Row>
      </div>

      <h1>{data.name}</h1>
      <p>ID: {data.id}</p>
      <p>
        NASA JPL URL: <a href={data.nasa_jpl_url}>{data.nasa_jpl_url}</a>
      </p>
      <p>
        Potentially Hazardous:{" "}
        {data.is_potentially_hazardous_asteroid ? "Yes" : "No"}
      </p>

      <Table columns={columns} dataSource={data.close_approach_data} rowKey={record => record.epoch_date_close_approach} />
    </div>
  );
};

export default SearchById;
