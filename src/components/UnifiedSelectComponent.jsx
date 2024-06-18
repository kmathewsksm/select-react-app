import React, { useState, useRef, useEffect } from "react";
import "./UnifiedSelectComponent.css";
import { OptionsList } from "./OptionsList/OptionsList";
import { states } from "./StateDropdown/states";

export function UnifiedSelectComponent({
  isMulti,
  isClearable,
  isDisabled,
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
    if (!isMulti) {
      setIsDropdownDisplayed(isMenuOpen);
    }
  }, [isMenuOpen, isMulti]);

  const handleOptionClick = (option) => {
    if (isMulti) {
      setSelectedValues((prevState) => ({
        ...prevState,
        [option.abbreviation]: !prevState[option.abbreviation],
      }));
      onChange(
        Object.entries(selectedValues)
          .filter(([abbreviation, isSelected]) => isSelected)
          .map(([abbreviation]) =>
            states.find((state) => state.abbreviation === abbreviation)
          )
      );
    } else {
      setSelectedValues(option);
      onChange(option);
      setIsDropdownDisplayed(false);
    }
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    setSelectedValues(isMulti ? {} : null);
    onChange(isMulti ? [] : null);
  };

  const handleIndividualClearClick = (e, option) => {
    e.stopPropagation();
    if (isMulti) {
      setSelectedValues((prevState) => {
        const newState = { ...prevState, [option.abbreviation]: false };
        onChange(
          Object.entries(newState)
            .filter(([abbreviation, isSelected]) => isSelected)
            .map(([abbreviation]) =>
              states.find((state) => state.abbreviation === abbreviation)
            )
        );
        return newState;
      });
    }
  };

  const toggleDropdown = (e) => {
    if (!isDisabled) {
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
      className={`unified-select-container ${isDisabled ? "disabled" : ""}`}
      style={{
        borderColor: isDisabled
          ? "#d3d3d3"
          : customStyles.control.backgroundColor,
      }}
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span>
        {isMulti
          ? numberOfStatesSelected > 0
            ? selectedStateNames.map((stateName) => (
                <span key={stateName} className="selected-option">
                  {stateName}
                  <svg
                    className="close-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      const abbreviationToRemove = states.find(
                        (state) => state.name === stateName
                      ).abbreviation;
                      handleIndividualClearClick(e, {
                        abbreviation: abbreviationToRemove,
                      });
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
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
      </span>
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
              {option.label || option.name}
              {isMulti && selectedValues[option.abbreviation] && (
                <svg
                  className="individual-close-icon"
                  onClick={(e) => handleIndividualClearClick(e, option)}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UnifiedSelectComponent;
