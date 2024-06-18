import React, { useState, useRef, useEffect } from "react";
import "./UnifiedSelectComponent.css";
import { OptionsList } from "./OptionsList/OptionsList";
import { states } from "./StateDropdown/states";

export function UnifiedSelectComponent({
  isMulti,
  isClearable,
  isDisabled: propIsDisabled,
  isMenuOpen = false,
  onChange,
  placeholder = "Select your option here",
  customStyles = {
    control: { backgroundColor: "#f0f0f0" },
    option: (isSelected) => ({
      backgroundColor: isSelected ? "#d0d0d0" : "#fff",
      color: isSelected ? "#000" : "#000",
    }),
  },
}) {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(isMenuOpen);
  const [selectedValues, setSelectedValues] = useState(() => {
    if (isMulti) {
      return states.reduce(
        (obj, state, index) => ({ ...obj, [state.abbreviation]: index < 2 }),
        {}
      );
    } else {
      return null;
    }
  });

  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownDisplayed(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    // Ensure dropdown display reflects prop changes for single select
    if (!isMulti) {
      setIsDropdownDisplayed(isMenuOpen && !propIsDisabled);
    }
  }, [isMenuOpen, isMulti, propIsDisabled]);

  useEffect(() => {
    // Update dropdown disabled state for multi-select
    if (isMulti) {
      const selectedCount =
        Object.values(selectedValues).filter(Boolean).length;
      setIsDropdownDisabled(selectedCount >= 3);
    }
  }, [selectedValues, isMulti]);

  const handleOptionClick = (option) => {
    if (isMulti && isDropdownDisabled && !selectedValues[option.abbreviation]) {
      return; // Prevent adding more options if disabled
    }

    if (isMulti) {
      const newSelectedValues = {
        ...selectedValues,
        [option.abbreviation]: !selectedValues[option.abbreviation],
      };
      setSelectedValues(newSelectedValues);
      const selectedCount =
        Object.values(newSelectedValues).filter(Boolean).length;
      setIsDropdownDisabled(selectedCount >= 3);
      onChange(
        Object.entries(newSelectedValues)
          .filter(([abbreviation, isSelected]) => isSelected)
          .map(([abbreviation]) =>
            states.find((state) => state.abbreviation === abbreviation)
          )
      );
    } else {
      setSelectedValues(option);
      onChange(option);
      setIsDropdownDisplayed(false); // Close dropdown after single select
    }
  };

  const handleRemoveOption = (e, abbreviation) => {
    e.stopPropagation();
    const newSelectedValues = {
      ...selectedValues,
      [abbreviation]: false,
    };
    setSelectedValues(newSelectedValues);
    const selectedCount =
      Object.values(newSelectedValues).filter(Boolean).length;
    setIsDropdownDisabled(selectedCount >= 3);
    onChange(
      Object.entries(newSelectedValues)
        .filter(([abbr, isSelected]) => isSelected)
        .map(([abbr]) => states.find((state) => state.abbreviation === abbr))
    );
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    setSelectedValues(isMulti ? {} : null);
    setIsDropdownDisabled(false);
    onChange(isMulti ? [] : null);
  };

  const toggleDropdown = (e) => {
    if (!propIsDisabled && (!isMulti || !isDropdownDisabled)) {
      e.stopPropagation();
      setIsDropdownDisplayed((prev) => !prev);
    }
  };

  const numberOfStatesSelected = isMulti
    ? Object.values(selectedValues).filter(Boolean).length
    : 0;

  const selectedStateNames = isMulti
    ? Object.entries(selectedValues)
        .filter(([abbreviation, isSelected]) => isSelected)
        .map(
          ([abbreviation]) =>
            states.find((state) => state.abbreviation === abbreviation).name
        )
    : [];

  const options = isMulti ? states : OptionsList;

  return (
    <div
      className={`unified-select-container ${
        (isMulti && isDropdownDisabled) || propIsDisabled ? "disabled" : ""
      }`}
      style={{
        borderColor: isMulti
          ? isDropdownDisabled
            ? "#d3d3d3"
            : customStyles.control.backgroundColor
          : propIsDisabled
          ? "#d3d3d3"
          : customStyles.control.backgroundColor,
      }}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <div className="selected-options-container">
        {isMulti
          ? numberOfStatesSelected > 0
            ? selectedStateNames.map((stateName) => (
                <span key={stateName} className="selected-option">
                  {stateName}
                  <svg
                    className="remove-icon"
                    onClick={(e) =>
                      handleRemoveOption(
                        e,
                        states.find((state) => state.name === stateName)
                          .abbreviation
                      )
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    style={{ cursor: "pointer", marginLeft: "4px" }}
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                  </svg>
                </span>
              ))
            : placeholder
          : selectedValues
          ? selectedValues.label
          : placeholder}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isClearable &&
          (isMulti ? numberOfStatesSelected > 0 : selectedValues) && (
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
          )}
        <>
          {" | "}
          <svg
            className={`unified-select-icon ${
              isDropdownDisplayed ? "rotated" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </>
      </div>
      {isDropdownDisplayed && (
        <div
          className="unified-select-dropdown"
          style={{
            backgroundColor: "white",
            borderColor: customStyles.control.backgroundColor,
            width: "100%",
          }}
        >
          {options.map((option) => (
            <div
              key={option.value || option.abbreviation}
              className={`unified-select-option ${
                (isMulti && selectedValues[option.abbreviation]) ||
                (!isMulti &&
                  selectedValues &&
                  selectedValues.value === option.value)
                  ? "selected"
                  : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(option);
              }}
            >
              {isMulti && (
                <input
                  type="checkbox"
                  checked={selectedValues[option.abbreviation]}
                  onChange={(e) => e.stopPropagation()}
                  style={{ marginRight: "8px" }}
                />
              )}
              {option.label || option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UnifiedSelectComponent;
