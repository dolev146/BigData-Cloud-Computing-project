import { useEffect, useState } from "react";
import { Card, Statistic } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Pie } from "recharts";
import CountUp from "react-countup";
import InformationComponent from "./Simulator/InformationComponent";
import styled from "styled-components";
import AlertComponent from "./Simulator/AlertComponent";
import PieChartComponent from "./Simulator/PieChartComponent";


const StyledHeader = styled.header`
  text-align: center;
  padding: 1rem;
  font-size: 2.5rem;
  color: #001529;
  background: #f0f2f5;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const StatisticRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const ContentRow = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: 1rem;
  margin-top: 3dvh; // add this line
`;

const AlertContainer = styled.div`
  /* margin-bottom: 1.5rem; // add this line for space */
  /* give a light bottom border that it will look seperated */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const ChartContainer = styled.div`
  background-color: #ffffff;
  padding: 50px 0 30px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

// Define a styled Statistic component
const StyledStatistic = styled(Statistic)`
  background: #f0f2f5;
  padding: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }
`;

const formatter = (value) => <CountUp end={value} separator="," />;

const Simulator = () => {
  const [numbers, setNumbers] = useState([0, 0, 0, 0]);
  const [Observatories, setObservatories] = useState([
    { ObservatoryName: "", NumberOfEvents: "" },
    { ObservatoryName: "", NumberOfEvents: "" },
    { ObservatoryName: "", NumberOfEvents: "" },
    { ObservatoryName: "", NumberOfEvents: "" },
  ]);

  const fetchObservatories = async () => {
    try {
      const response = await fetch(
        "http://localhost:9080/elastic-api/observatories"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setObservatories(data);
    } catch (error) {
      setObservatories([]);
    }
  };

  useEffect(() => {
    fetch("http://localhost:9080/elastic-api/stats")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Make sure to update this part to match the actual structure of your data
        const stats = [data.number1, data.number2, data.number3, data.number4];
        setNumbers(stats);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });

    fetchObservatories().catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    },[]);

    setInterval(() => {
      fetchObservatories().catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    }, 5000);
  }, []);

  return (
    <div>
      <StyledHeader>Cosmic Events Dashboard</StyledHeader>

      <Container>
        <StatisticRow>
          <StyledStatistic
            title="Total Number of Events"
            value={numbers[0]}
            formatter={formatter}
          />
          <StyledStatistic
            title="Total Number of Dangerous Events"
            value={numbers[1]}
            precision={2}
            formatter={formatter}
          />
          <StyledStatistic
            title="Number of Events in the Last 24 Hours"
            value={numbers[2]}
            precision={2}
            formatter={formatter}
          />
          <StyledStatistic
            title="Number of Events in the Last 7 Days"
            value={numbers[3]}
            precision={2}
            formatter={formatter}
          />
        </StatisticRow>

        <ContentRow>
          <InformationComponent />

          <AlertContainer>
            <AlertComponent />

            <ChartContainer>
              <Card title="Event Per Observatory">
                <BarChart
                  width={600}
                  height={300}
                  data={Observatories}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="ObservatoryName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="NumberOfEvents" fill="#1677ff" />
                  <Bar dataKey="NumberOfDangerousEvents" fill="#e30f79" />
                </BarChart>
              </Card>
            </ChartContainer>
          </AlertContainer>
        </ContentRow>
      </Container>
      <PieChartComponent
        cx={200}
        cy={200}
        midAngle={45}
        innerRadius={60}
        outerRadius={80}
        startAngle={0}
        endAngle={360}
        fill="#8884d8"
        payload={{ name: "Group A", value: 400 }}
        percent={0.25}
        value={100}
      />
    </div>
  );
};

export default Simulator;
