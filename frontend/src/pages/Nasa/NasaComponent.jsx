import React, { useState } from "react";
import Browse from "./Browse";
import DateSearch from "./DateSearch";
import RadioButtons from "./RadioButtons";
import SearchById from "./SearchById";
import styled from "styled-components";
import { Radio } from "antd";

const StyledHeader = styled.header`
  text-align: center;
  padding: 2rem;
  font-size: 2.5rem;
  color: #001529;
  background: #f0f2f5;
  margin-bottom: 2rem;
`;

const NasaComponent = () => {
  const [radioButtons, setRadioButtons] = useState({
    searchById: false,
    browse: false,
    dateSearch: true,
  });

  return (
    <div>
      <StyledHeader>Near Earth Objects Dashboard</StyledHeader>
      <Radio.Group
        buttonStyle="solid"
        style={{
          marginBottom: "1rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(e) =>
          setRadioButtons({
            searchById: e.target.value === "searchById",
            browse: e.target.value === "browse",
            dateSearch: e.target.value === "dateSearch",
          })
        }
        value={
          radioButtons.searchById
            ? "searchById"
            : radioButtons.browse
            ? "browse"
            : "dateSearch"
        }
      >
        <Radio.Button value="dateSearch">Date Search</Radio.Button>
        <Radio.Button value="searchById">Search By ID</Radio.Button>
        <Radio.Button value="browse">Browse</Radio.Button>
      </Radio.Group>

      {radioButtons.dateSearch ? <DateSearch /> : null}
      {radioButtons.searchById ? <SearchById /> : null}
      {radioButtons.browse ? <Browse /> : null}
    </div>
  );
};

export default NasaComponent;
