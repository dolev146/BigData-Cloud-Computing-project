import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Alert } from "antd";
import styled from "styled-components";
import { Card } from "antd";

const StyledAlert = styled(Alert)`
  margin: 10px 0;
`;

const StyledCard = styled(Card)`
  height: 30vh;
  overflow-y: auto;
`;

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:9080");

    socket.on("new-alert", (alert) => {
      setAlerts((prevAlerts) => [...prevAlerts, alert]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <StyledCard title="Alerts" >
      {alerts.map((alert, index) => (
        <StyledAlert
          key={index}
          message={alert.title}
          description={alert.description}
          type="info"
          showIcon
        />
      ))}
    </StyledCard>
  );
};

export default AlertComponent;
