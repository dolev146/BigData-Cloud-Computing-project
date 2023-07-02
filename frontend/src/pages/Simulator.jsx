import { useEffect, useState } from "react";
import { Statistic } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import CountUp from "react-countup";
import InformationComponent from "./Simulator/InformationComponent";
import styled from "styled-components";
import AlertComponent from "./Simulator/AlertComponent";

const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem;
  font-size: 2.5rem;
  color: #001529;
  background: #f0f2f5;
  margin-bottom: 2rem;
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

const ChartAlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const ChartContainer = styled.div`
  background-color: #feae01;
  padding: 50px 0 30px;
  margin-bottom: 2rem; // add this line for space
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
        const stats = [
          data.number1,
          data.number2,
          data.number3,
          data.number4
        ];
        setNumbers(stats);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
/* 
    setObservatories([
      {
        ObservatoryName: "Observatory 1",
        NumberOfEvents: 10,
        NumberOfDangerousEvents: 5,
      },
      {
        ObservatoryName: "Observatory 2",
        NumberOfEvents: 12,
        NumberOfDangerousEvents: 6,
      },
      {
        ObservatoryName: "Observatory 3",
        NumberOfEvents: 15,
        NumberOfDangerousEvents: 2,
      },
      {
        ObservatoryName: "Observatory 4",
        NumberOfEvents: 20,
        NumberOfDangerousEvents: 9,
      },
    ]); */


    fetch('http://localhost:9080/elastic-api/observatories')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setObservatories(data); // assuming the response data is an array of observatory data
    })
    .catch((error) => {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      );
    });

  }, []);

  return (
    <div>
      <StyledHeader>Simulator Elastic Search Dashboard</StyledHeader>

      <Container>
        <StatisticRow>
          <StyledStatistic
            title="Active Users"
            value={numbers[0]}
            formatter={formatter}
          />
          <StyledStatistic
            title="Account Balance (CNY)"
            value={numbers[1]}
            precision={2}
            formatter={formatter}
          />
          <StyledStatistic
            title="Account Balance (CNY)"
            value={numbers[2]}
            precision={2}
            formatter={formatter}
          />
          <StyledStatistic
            title="Account Balance (CNY)"
            value={numbers[3]}
            precision={2}
            formatter={formatter}
          />
        </StatisticRow>

        <ContentRow>
          <InformationComponent />

          <ChartAlertContainer>
            <ChartContainer>
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
                <Bar dataKey="NumberOfEvents" fill="#CB2A7B" />
                <Bar dataKey="NumberOfDangerousEvents" fill="#844191" />
              </BarChart>
            </ChartContainer>

            <AlertComponent />
          </ChartAlertContainer>
        </ContentRow>
      </Container>
    </div>
  );
};

export default Simulator;
