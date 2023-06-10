import React, { useState } from "react";
import Browse from "./Browse";
import DateSearch from "./DateSearch";
import RadioButtons from "./RadioButtons";
import SearchById from "./SearchById";

const NasaComponent = () => {
  const [radioButtons, setRadioButtons] = useState({
    searchById: false,
    browse: false,
    dateSearch: true,
  });

  return (
    <div>
      <RadioButtons
        radioButtons={radioButtons}
        setRadioButtons={setRadioButtons}
      />
      {radioButtons.searchById ? <SearchById /> : null}
      {radioButtons.browse ? <Browse /> : null}
      {radioButtons.dateSearch ? <DateSearch /> : null}
    </div>
  );
};

export default NasaComponent;
