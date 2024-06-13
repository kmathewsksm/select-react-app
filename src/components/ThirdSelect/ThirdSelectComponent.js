import React from "react";
import { OptionsList } from "../OptionsList/OptionsList";

export const ThirdSelectComponent = ({
  isMenuOpen,
  onChange,
  placeholder = "Select your option here for third select component",
}) => (
  <div style={{ width: "500px" }}>
    <select
      style={{ width: "100%" }}
      className="basic-single"
      classNamePrefix="select"
      placeholder={placeholder}
      aria-label="third select component with only keeping the menu open"
      name="color"
      onChange={(e) => {
        const selectedOption = OptionsList.find(
          (option) => option.value === e.target.value
        );
        onChange(selectedOption);
      }}
      size={isMenuOpen ? OptionsList.length : 1}
    >
      {OptionsList.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
