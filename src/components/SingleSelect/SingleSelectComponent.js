import React, { useState } from "react";
import Select from "react-select";
import { OptionsList } from "../OptionsList/OptionsList";

export const SingleSelectComponent = ({
  isClearable,
  isSearchable,
  isDisabled,
  isLoading,
  isRtl,
  onChange,
  themeColor,
  customStyles,
}) => (
  <div style={{ width: "500px" }}>
    <Select
      className="basic-single"
      classNamePrefix="select"
      placeholder="Select your option here for first select component"
      isClearable={isClearable}
      isDisabled={isDisabled}
      isLoading={isLoading}
      isSearchable={isSearchable}
      isRtl={isRtl}
      aria-label="single select component"
      name="color"
      options={OptionsList}
      onChange={onChange}
      styles={customStyles}
    />
  </div>
);