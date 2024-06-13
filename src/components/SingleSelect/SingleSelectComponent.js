import React, { useState, useRef, useEffect } from "react";
import "./SingleSelectComponent.css";
import { OptionsList } from "../OptionsList/OptionsList";

export const SingleSelectComponent = ({
  isClearable,
  isDisabled,
  isMenuOpen = false,
   onChange,
  placeholder = "Select your option here for first select component",
  customStyles = {
    control: { backgroundColor: "#f0f0f0" },
    option: (isSelected) => ({
      backgroundColor: isSelected ? "#d0d0d0" : "#fff",
      color: isSelected ? "#000" : "#000",
    }),
  },
}) => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(isMenuOpen);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

   useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) && !isMenuOpen) {
        setIsDropdownDisplayed(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsDropdownDisplayed(isMenuOpen);
  }, [isMenuOpen]);

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    onChange(option);
    if (!isMenuOpen) {
      setIsDropdownDisplayed(false); 
    }
  };


  const handleClearClick = (e) => {
    e.stopPropagation();
    setSelectedValue(null);
    onChange(null);
    setIsDropdownDisplayed(false);
  };

  const toggleDropdown = (e) => {
    if (!isDisabled && !isMenuOpen) {
      e.stopPropagation();
      setIsDropdownDisplayed((prev) => !prev);
    }
  };

  return (
    <div
      className={`single-select-container ${isDisabled ? "disabled" : ""}`}
      style={{ backgroundColor: isDisabled ? "#d3d3d3" : customStyles.control.backgroundColor }}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span>{selectedValue ? selectedValue.label : placeholder}</span>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isClearable && selectedValue && (
          <>
            <svg
              className="close-icon"
              onClick={handleClearClick}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              style={{ cursor: "pointer", marginRight: "8px" }}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            </svg>
            {" | "}
          </>
        )}
        <svg
          className={`single-select-icon ${isDropdownDisplayed ? "rotated" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
      {isDropdownDisplayed && (
        <div
          className="single-select-dropdown"
          style={{ backgroundColor: customStyles.control.backgroundColor }}
        >
          {OptionsList.map((option) => (
            <div
              key={option.value}
              className={`single-select-option ${selectedValue && selectedValue.value === option.value ? "selected" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};