import { useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PieChartDetailed from "./PieChartDetailed";


const PieChartComponent = (props) => {

  const getDataFromServer = async (fieldName) => {
    const response = await fetch('http://localhost:9080/elastic-api/groupByField?' + new URLSearchParams({
      fieldName
    }))
    const data = await response.json();
    setData(data)
    
  }

  const items = [
    {
      label: <p>Group By star title</p>,
      key: "title",
      onClick: () => {
        setFieldName("title")
      },
    },
    {
      label: <p>Group By Urgency</p>,
      key: "urgency",
      onClick: () => {
        setFieldName("urgency")
      },
    },
  ];

  const [fieldName, setFieldName] = useState("urgency");
  const [data, setData] = useState(() => {
    getDataFromServer(fieldName).catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  });

  useEffect(() => {
    getDataFromServer(fieldName).catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
  },[fieldName])

  return (
    <div>
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            border: "solid 2px #1677ff",
            borderRadius: "0.5rem",
            padding: "1rem",
            transform: "translateX(+8%)",
          }}
        >
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChartDetailed data={data} />
      </div>
    </div>
  );
};

export default PieChartComponent;
