import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button } from "antd";
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

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const Image = styled.img`
  max-width: 20vw;
`;

const TwoImageCard = styled(Card)`
  .switch-button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const Scraper = () => {
  const [images, setImages] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [activeImage, setActiveImage] = useState('sunspot-regions.jpg');

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
      });
  }, []);

  const switchImage = () => {
    setActiveImage(activeImage === 'sunspot-regions.jpg' ? 'theskylivesun.jpg' : 'sunspot-regions.jpg');
  };

  return (
    <GridWrapper>
      <Card title="Space Weather Sun">
        <Image alt="spaceweathersun" src={`data:image/jpeg;base64,${images['spaceweathersun.jpg']}`} />
      </Card>
      <Card title="Solar Flares">
        <Image alt="solarflares" src={`data:image/jpeg;base64,${images['solarflares.jpg']}`} />
      </Card>
      <TwoImageCard title={activeImage === 'sunspot-regions.jpg' ? 'Sunspot Regions' : 'The Sky Live Sun'}>
        <Button className="switch-button" onClick={switchImage}>Switch Image</Button>
        <Image alt="sunspot/skylive" src={`data:image/jpeg;base64,${images[activeImage]}`} />
      </TwoImageCard>
      <Card title="Coronal Mass">
        <Image alt="coronal-mass" src={`data:image/jpeg;base64,${images['coronal-mass.jpg']}`} />
      </Card>
      <div>
        <LineChart
          width={600}
          height={400}
          data={graphData}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" padding={{ right: 30 }} />
          <YAxis dataKey="value" domain={[0.000001, "dataMax"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ec7967" strokeWidth={2} activeDot={{ r: 6 }} />
        </LineChart>
      </div>
      <Card title="Far Side">
        <Image alt="far-side" src={`data:image/jpeg;base64,${images['far-side.jpg']}`} />
      </Card>
    </GridWrapper>
  );
};

export default Scraper;





