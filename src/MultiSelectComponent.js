import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { OptionsList } from "./OptionsList";
import { getCustomStyles } from "./App";


export const MultiSelectComponent = ({
  selectedOptionMulti,
  handleMultiChange,
  themeColor,
  customStyles,
}) => (
  <div style={{ width: "500px" }}>
    <Select
      className="basic-multi-select"
      classNamePrefix="select"
      defaultValue={[OptionsList[0], OptionsList[1]]}
      isMulti
      aria-label="multi select component"
      name="colors"
      options={OptionsList}
      components={makeAnimated()}
      closeMenuOnSelect={false}
      value={selectedOptionMulti}
      onChange={handleMultiChange}
      isOptionDisabled={() => selectedOptionMulti.length >= 3}
      styles={{ ...getCustomStyles(themeColor), ...customStyles }}
    />
  </div>
);