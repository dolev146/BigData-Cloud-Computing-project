import { useCallback, useEffect, useState } from "react";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import PieChartDetailed from "./PieChartDetailed";
const items = [
  {
    label: <p>Group By Event Type</p>,
    key: "0",
    onClick: () => {
      console.log("1st menu item clicked");
      // here you need to run fetch and set State
    },
  },
  {
    label: <p>Group By Urgency</p>,
    key: "1",
    onClick: () => {
      console.log("2nd menu item clicked");
      // here you need to run fetch and set State
    },
  },
];

const PieChartComponent = (props) => {
  const [data, setData] = useState(() => {
    return [
      { name: "Group A", value: 400 },
      { name: "Group B", value: 300 },
      { name: "Group C", value: 300 },
      { name: "Group D", value: 200 },
    ];
  });

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
