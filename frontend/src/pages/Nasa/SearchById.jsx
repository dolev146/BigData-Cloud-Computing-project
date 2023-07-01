import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Row, Col, Spin } from "antd"; // Import Spin
const { Search } = Input;

const SearchById = () => {
  const [asteroidId, setAsteroidId] = useState(2385423);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // added loading state

  useEffect(() => {
    if (!asteroidId) return;

    const fetchData = async () => {
      setLoading(true); // start loading
      try {
        const response = await axios.get(
          `http://localhost:9080/nasa-api/asteroids/${asteroidId}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // end loading
      }
    };

    fetchData();
  }, [asteroidId]);

  const handleSearchClick = () => {
    const value = document.getElementById("asteroidId").value;
    setAsteroidId(value);
  };

  const columns = [
    {
      title: "Close Approach Date",
      dataIndex: "close_approach_date",
      key: "close_approach_date",
    },
    {
      title: "Orbiting Body",
      dataIndex: "orbiting_body",
      key: "orbiting_body",
    },
    {
      title: "Relative Velocity (km/h)",
      dataIndex: "relative_velocity",
      key: "relative_velocity",
      render: (text) => text.kilometers_per_hour,
    },
    {
      title: "Miss Distance (km)",
      dataIndex: "miss_distance",
      key: "miss_distance",
      render: (text) => text.kilometers,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row>
          <div style={{ display: "flex" }}>
            <div>
              <Input id="asteroidId" placeholder="Enter asteroid id" />
            </div>
            <div>
              <Button onClick={handleSearchClick}>Search</Button>
            </div>
          </div>
        </Row>
      </div>

      <Spin spinning={loading}>
        <h1>{data?.name}</h1>
        <p>ID: {data?.id}</p>
        <p>
          NASA JPL URL: <a href={data?.nasa_jpl_url}>{data?.nasa_jpl_url}</a>
        </p>
        <p>
          Potentially Hazardous:{" "}
          {data?.is_potentially_hazardous_asteroid ? "Yes" : "No"}
        </p>{" "}
        {/* Add Spin component */}
        <Table
          columns={columns}
          dataSource={data?.close_approach_data}
          rowKey={(record) => record?.epoch_date_close_approach}
        />
      </Spin>
    </div>
  );
};

export default SearchById;
