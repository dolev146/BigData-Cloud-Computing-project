import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button, Spin, Empty } from "antd";
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
  max-width: 26vw;
  height: 24dvh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Scraper = () => {
  const [graphData, setGraphData] = useState([]);
  const [activeImage, setActiveImage] = useState("sunspot-regions.jpg");
  const [loading, setLoading] = useState(true);
  const [oldImages, setOldImages] = useState([{}]);
  const [images, setImages] = useState({
    "spaceweathersun.jpg": {
      src: "",
      loading: true,
      error: false,
      fallback: false,
    },
    "solarflares.jpg": {
      src: "",
      loading: true,
      error: false,
      fallback: false,
    },
    "sunspot-regions.jpg": {
      src: "",
      loading: true,
      error: false,
      fallback: false,
    },
    "theskylivesun.jpg": {
      src: "",
      loading: true,
      error: false,
      fallback: false,
    },
    "coronal-mass.jpg": {
      src: "",
      loading: true,
      error: false,
      fallback: false,
    },
    "far-side.jpg": { src: "", loading: true, error: false, fallback: false },
  });

  useEffect(() => {
    fetch("http://localhost:5001/api/scraper/all-images-and-aria-labels")
      .then((res) => res.json())
      .then((data) => {
        setImages((prevState) => ({
          ...prevState,
          "spaceweathersun.jpg": {
            src: data.result.images["spaceweathersun.jpg"],
            loading: false,
            error: false,
            fallback: false,
          },
          "solarflares.jpg": {
            src: data.result.images["solarflares.jpg"],
            loading: false,
            error: false,
            fallback: false,
          },
          "sunspot-regions.jpg": {
            src: data.result.images["sunspot-regions.jpg"],
            loading: false,
            error: false,
            fallback: false,
          },
          "theskylivesun.jpg": {
            src: data.result.images["theskylivesun.jpg"],
            loading: false,
            error: false,
            fallback: false,
          },
          "coronal-mass.jpg": {
            src: data.result.images["coronal-mass.jpg"],
            loading: false,
            error: false,
            fallback: false,
          },
          "far-side.jpg": {
            src: data.result.images["far-side.jpg"],
            loading: false,
            error: false,
            fallback: false,
          },
        }));
        setGraphData(data.result.graphData);
        setOldImages(data.oldResult.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setImages((prevState) => ({
          ...prevState,
          "spaceweathersun.jpg": {
            src: "",
            loading: false,
            error: true,
            fallback: false,
          },
          "solarflares.jpg": {
            src: "",
            loading: false,
            error: true,
            fallback: false,
          },
          "sunspot-regions.jpg": {
            src: "",
            loading: false,
            error: true,
            fallback: false,
          },
          "theskylivesun.jpg": {
            src: "",
            loading: false,
            error: true,
            fallback: false,
          },
          "coronal-mass.jpg": {
            src: "",
            loading: false,
            error: true,
            fallback: false,
          },
          "far-side.jpg": {
            src: "",
            loading: false,
            error: true,
            fallback: false,
          },
        }));
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
          {images["spaceweathersun.jpg"].loading ? (
            <Spin spinning={images["spaceweathersun.jpg"].loading} />
          ) : images["spaceweathersun.jpg"].error ? (
            <Button
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  "spaceweathersun.jpg": {
                    src: prevState["spaceweathersun.jpg"].src,
                    loading: false,
                    error: false,
                    fallback: true,
                  },
                }))
              }
            >
              Try old image
            </Button>
          ) : images["spaceweathersun.jpg"].fallback &&
            oldImages["spaceweathersun.jpg"] ? (
            <Image
              alt="spaceweathersun"
              src={`data:image/jpeg;base64,${oldImages["spaceweathersun.jpg"]}`}
            />
          ) : oldImages["spaceweathersun.jpg"] ? (
            <Image
              alt="spaceweathersun"
              src={`data:image/jpeg;base64,${images["spaceweathersun.jpg"].src}`}
            />
          ) : (
            <Empty description="Could not load image." />
          )}
        </CenteredCard>

        <CenteredCard title="Solar Flares">
          {images["solarflares.jpg"].loading ? (
            <Spin spinning={images["solarflares.jpg"].loading} />
          ) : images["solarflares.jpg"].error ? (
            <Button
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  "solarflares.jpg": {
                    src: prevState["solarflares.jpg"].src,
                    loading: false,
                    error: false,
                    fallback: true,
                  },
                }))
              }
            >
              Try old image
            </Button>
          ) : images["solarflares.jpg"].fallback &&
            oldImages["solarflares.jpg"] ? (
            <Image
              alt="solarflares"
              src={`data:image/jpeg;base64,${oldImages["solarflares.jpg"]}`}
            />
          ) : oldImages["solarflares.jpg"] ? (
            <Image
              alt="solarflares"
              src={`data:image/jpeg;base64,${images["solarflares.jpg"].src}`}
            />
          ) : (
            <Empty description="Could not load image." />
          )}
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
          {images[activeImage].loading ? (
            <Spin spinning={images[activeImage].loading} />
          ) : images[activeImage].error ? (
            <Button
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  [activeImage]: {
                    src: prevState[activeImage].src,
                    loading: false,
                    error: false,
                    fallback: true,
                  },
                }))
              }
            >
              Try old image
            </Button>
          ) : images[activeImage].fallback && oldImages[activeImage] ? (
            <Image
              alt="sunspot/skylive"
              src={`data:image/jpeg;base64,${oldImages[activeImage]}`}
            />
          ) : oldImages[activeImage] ? (
            <Image
              alt="sunspot/skylive"
              src={`data:image/jpeg;base64,${images[activeImage].src}`}
            />
          ) : (
            <Empty description="Could not load image." />
          )}
        </TwoImageCard>

        <CenteredCard title="Coronal Mass">
          {images["coronal-mass.jpg"].loading ? (
            <Spin spinning={images["coronal-mass.jpg"].loading} />
          ) : images["coronal-mass.jpg"].error ? (
            <Button
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  "coronal-mass.jpg": {
                    src: prevState["coronal-mass.jpg"].src,
                    loading: false,
                    error: false,
                    fallback: true,
                  },
                }))
              }
            >
              Try old image
            </Button>
          ) : images["coronal-mass.jpg"].fallback &&
            oldImages["coronal-mass.jpg"] ? (
            <Image
              alt="coronal-mass"
              src={`data:image/jpeg;base64,${oldImages["coronal-mass.jpg"]}`}
            />
          ) : oldImages["coronal-mass.jpg"] ? (
            <Image
              alt="coronal-mass"
              src={`data:image/jpeg;base64,${images["coronal-mass.jpg"].src}`}
            />
          ) : (
            <Empty description="Could not load image." />
          )}
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
              <XAxis dataKey="hour" padding={{ right: 30 }} />
              <YAxis dataKey="MeV" domain={[0.0000012, 0.000004]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="MeV"
                stroke="#ec7967"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </Spin>
        </LineChartWrapper>

        <TopAlignedCard title="Far Side">
          {images["far-side.jpg"].loading ? (
            <Spin spinning={images["far-side.jpg"].loading} />
          ) : images["far-side.jpg"].error ? (
            <Button
              onClick={() =>
                setImages((prevState) => ({
                  ...prevState,
                  "far-side.jpg": {
                    src: prevState["far-side.jpg"].src,
                    loading: false,
                    error: false,
                    fallback: true,
                  },
                }))
              }
            >
              Try old image
            </Button>
          ) : images["far-side.jpg"].fallback && oldImages["far-side.jpg"] ? (
            <CenteredCardImage
              alt="far-side"
              src={`data:image/jpeg;base64,${oldImages["far-side.jpg"]}`}
            />
          ) : oldImages["far-side.jpg"] ? (
            <CenteredCardImage
              alt="far-side"
              src={`data:image/jpeg;base64,${images["far-side.jpg"].src}`}
            />
          ) : (
            <Empty description="Could not load image." />
          )}
        </TopAlignedCard>
      </GridWrapper>
    </>
  );
};

export default Scraper;
