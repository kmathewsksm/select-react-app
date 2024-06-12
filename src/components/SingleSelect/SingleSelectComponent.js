import React, { useState } from "react";
import { OptionsList } from "../OptionsList/OptionsList";
import { FaTrash } from "react-icons/fa";

export const SingleSelectComponent = ({
  isClearable,
  isDisabled,
  onChange,
  placeholder = "Select your option here for first select component",
  customStyles,
}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleClearSelection = () => {
    setSelectedValue(null);
    onChange(null);
  };

  const handleChange = (e) => {
    const selectedOption = OptionsList.find(
      (option) => option.value === e.target.value
    );
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };

  return (
    <div style={{ width: "500px" }}>
      <select
        style={{ width: "80%", ...customStyles.control }}
        id="single-select"
        value={selectedValue ? selectedValue.value : ""}
        disabled={isDisabled}
        aria-label="single select component"
        name="color"
        onChange={handleChange}
      >
        <option value="" disabled={!isClearable}>
          {placeholder}
        </option>

        {OptionsList.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={customStyles.option(option.value === (selectedValue && selectedValue.value))}
          >
            {option.label}
          </option>
        ))}
      </select>{" "}
      {isClearable && selectedValue && (
        <button onClick={handleClearSelection}>
          <FaTrash />
        </button>
      )}
    </div>
  );
};
