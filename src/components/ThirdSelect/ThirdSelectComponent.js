import React, { useState } from "react";
import Select from "react-select";
import { OptionsList } from "../OptionsList/OptionsList";

export const ThirdSelectComponent = ({
  isSearchable,
  isRtl,
  isMenuOpen,
  onChange,
  themeColor,
  customStyles,
}) => (
  <div style={{ width: "500px" }}>
    <Select
      className="basic-single"
      classNamePrefix="select"
      placeholder="Select your option here for third select component"
      isSearchable={isSearchable}
      isRtl={isRtl}
      aria-label="third select component with only keeping the menu open"
      name="color"
      options={OptionsList}
      menuIsOpen={isMenuOpen}
      onChange={onChange}
      styles={customStyles}
    />
  </div>
);
