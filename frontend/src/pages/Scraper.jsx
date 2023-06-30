import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button, Spin } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { format, parse } from "date-fns";

const LineChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Image = styled.img`
  max-width: 20vw;
`;

const TwoImageCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .switch-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem;
  font-size: 2.5rem;
  color: #001529;
  background: #f0f2f5;
  margin-bottom: 2rem;
`;

const TopAlignedCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; // aligns content to the top

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; // aligns content within the card body to the top
  }
`;

const CenteredCardImage = styled.img`
  max-width: 20vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Scraper = () => {
  const [images, setImages] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [activeImage, setActiveImage] = useState("sunspot-regions.jpg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/scraper/all-images-and-aria-labels")
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images);

        const transformedGraphData = data.graphData.map((entry) => {
          const lastCommaIndex = entry.lastIndexOf(",");
          const timestampStr = entry.substring(0, lastCommaIndex).trim();
          const date = parse(timestampStr, "EEEE, dd MMM., HH:mm", new Date());
          const timestamp = format(date, "HH:mm");
          return {
            timestamp,
            value: parseFloat(entry.substring(lastCommaIndex + 1)),
          };
        });

        setGraphData(transformedGraphData);
        setLoading(false);
      });
  }, []);

  const switchImage = () => {
    setActiveImage(
      activeImage === "sunspot-regions.jpg"
        ? "theskylivesun.jpg"
        : "sunspot-regions.jpg"
    );
  };

  return (
    <>
      <StyledHeader>Space Weather Dashboard</StyledHeader>
      <GridWrapper>
        <CenteredCard title="Space Weather Sun">
          <Spin spinning={loading}>
            <Image
              alt="spaceweathersun"
              src={`data:image/jpeg;base64,${images["spaceweathersun.jpg"]}`}
            />
          </Spin>
        </CenteredCard>
        <CenteredCard title="Solar Flares">
          <Spin spinning={loading}>
            <Image
              alt="solarflares"
              src={`data:image/jpeg;base64,${images["solarflares.jpg"]}`}
            />
          </Spin>
        </CenteredCard>
        <TwoImageCard
          title={
            activeImage === "sunspot-regions.jpg"
              ? "Sunspot Regions"
              : "The Sky Live Sun"
          }
        >
          <Button className="switch-button" onClick={switchImage}>
            Switch Image
          </Button>
          <Spin spinning={loading}>
            <Image
              alt="sunspot/skylive"
              src={`data:image/jpeg;base64,${images[activeImage]}`}
            />
          </Spin>
        </TwoImageCard>
        <CenteredCard title="Coronal Mass">
          <Spin spinning={loading}>
            <Image
              alt="coronal-mass"
              src={`data:image/jpeg;base64,${images["coronal-mass.jpg"]}`}
            />
          </Spin>
        </CenteredCard>
        <LineChartWrapper>
          <Spin spinning={loading}>
            <LineChart
              width={600}
              height={400}
              data={graphData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" padding={{ right: 30 }} />
              <YAxis dataKey="value" domain={[0.000001, "dataMax"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#ec7967"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </Spin>
        </LineChartWrapper>
        <TopAlignedCard title="Far Side">
          <Spin spinning={loading}></Spin>
          <CenteredCardImage
            alt="far-side"
            src={`data:image/jpeg;base64,${images["far-side.jpg"]}`}
          />
        </TopAlignedCard>
      </GridWrapper>
    </>
  );
};

export default Scraper;
