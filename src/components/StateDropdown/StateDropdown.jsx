import { useEffect, useState, useRef } from "react";
import "./StateDropdown.css";
import { states } from "./states";

export function StateDropdown() {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [selectedStates, setSelectedStates] = useState(() => {
    const initialState = states.reduce(
      (obj, state, index) => ({ ...obj, [state.abbreviation]: index < 2 }),
      {}
    );
    return initialState;
  });

  console.log(selectedStates);

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

  const selectedStateNames = Object.entries(selectedStates)
    .filter(([abbreviation, isSelected]) => isSelected)
    .map(
      ([abbreviation]) =>
        states.find((state) => state.abbreviation === abbreviation).name
    );

  function AddSelectedStates(state, isSelected) {
    setSelectedStates((prevState) => ({
      ...prevState,
      [state]: isSelected,
    }));
  }

  const numberOfStatesSelected =
    Object.values(selectedStates).filter(Boolean).length;

  return (
    <fieldset className="state-dropdown">
      <br />
      <div
        className="select-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownDisplayed((state) => !state);
        }}
      >
        <span className="selected-options">
          {numberOfStatesSelected > 0
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
                      AddSelectedStates(abbreviationToRemove, false);
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
            : "--select your options--"}
        </span>
        <svg
          className={`dropdown-icon ${isDropdownDisplayed ? "open" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>

      {isDropdownDisplayed && (
        <div ref={dropdownRef} className="panel">
          {states.map((state) => (
            <div
              key={state.abbreviation}
              className={selectedStates[state.abbreviation] ? `selected` : ""}
            >
              <input
                onChange={(e) =>
                  AddSelectedStates(state.abbreviation, e.target.checked)
                }
                checked={selectedStates[state.abbreviation]}
                id={`input-${state.abbreviation}`}
                type="checkbox"
                disabled={
                  numberOfStatesSelected >= 3 &&
                  !selectedStates[state.abbreviation]
                }
              />
              <label htmlFor={`input-${state.abbreviation}`}>
                {state.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}
