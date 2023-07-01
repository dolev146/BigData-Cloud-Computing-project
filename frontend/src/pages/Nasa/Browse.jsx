import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Table, Tag } from "antd";

const Browse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:9080/nasa-api/asteroids/browse")
      .then((response) => {
        setData(response.data.near_earth_objects);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NASA JPL URL",
      dataIndex: "nasa_jpl_url",
      key: "nasa_jpl_url",
    },
    {
      title: "Is Potentially Hazardous Asteroid",
      dataIndex: "is_potentially_hazardous_asteroid",
      key: "is_potentially_hazardous_asteroid",
      render: (isPotentiallyHazardous) => (
        <Tag color={isPotentiallyHazardous ? "red" : "green"}>
          {isPotentiallyHazardous ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Absolute Magnitude H",
      dataIndex: "absolute_magnitude_h",
      key: "absolute_magnitude_h",
    },
    {
      title: "Estimated Diameter Min (km)",
      dataIndex: ["estimated_diameter", "kilometers", "estimated_diameter_min"],
      key: "estimated_diameter_min",
    },
    {
      title: "Estimated Diameter Max (km)",
      dataIndex: ["estimated_diameter", "kilometers", "estimated_diameter_max"],
      key: "estimated_diameter_max",
    },
    {
      title: "Orbit Id",
      dataIndex: ["orbital_data", "orbit_id"],
      key: "orbit_id",
    },
    // Add more columns as needed
  ];

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </Spin>
  );
};

export default Browse;
