import { useState } from "react";
import InformationByDate from "./InformationByDate";
import InformationByObservatoryandByDate from "./InformationByObservatoryandByDate";
import styled, { keyframes } from "styled-components";
import { Radio } from "antd";
import InfromationByIDandDate from "./InfromationByIDandDate";

const StyledInformationComponent = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
`;

const StyledRadioGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const HeaderColorAnimation = keyframes`
  0% { background-color: #4a90e2; }
  50% { background-color: #8e44ad; }
  100% { background-color: #4a90e2; }
`;

const StyledHeader = styled.h1`
  text-align: center;
  color: #000000;
  padding: 20px;
  margin-bottom: 40px;
`;

const InformationComponent = () => {
  const [activeComponent, setActiveComponent] = useState("InformationByDate");

  const optionsWithDisabled = [
    { label: "Search by Date", value: "InformationByDate" },
    {
      label: "Search by Observatory and Date",
      value: "InformationByObservatoryandByDate",
    },
    { label: "Search by ID and Date", value: "InformationByIDandDate" },
  ];

  const onChange = (e) => {
    setActiveComponent(e.target.value);
  };

  return (
    <StyledInformationComponent>
      <StyledHeader>Query the Data Base </StyledHeader>

      <StyledRadioGroup>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange}
          value={activeComponent}
          optionType="button"
          buttonStyle="solid"
        />
      </StyledRadioGroup>
      {activeComponent === "InformationByIDandDate" && (
        <InfromationByIDandDate />
      )}
      {activeComponent === "InformationByObservatoryandByDate" && (
        <InformationByObservatoryandByDate />
      )}
      {activeComponent === "InformationByDate" && <InformationByDate />}
    </StyledInformationComponent>
  );
};

export default InformationComponent;
