import { useEffect, useState, useRef } from "react";
import "./StateDropdown.css";
import { states } from "./states";

export function StateDropdown() {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [selectedStates, setSelectedStates] = useState(
    states.reduce((obj, state) => ({ ...obj, [state.abbreviation]: false }), {})
  );
  console.log(selectedStates);
  const numberOfStatesSelected =
    Object.values(selectedStates).filter(Boolean).length;
  console.log(numberOfStatesSelected);

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

  return (
    <fieldset className="state-dropdown">
      <div className="selected-states">
        {selectedStateNames.length > 0 ? (
          <div>
            Selected Options:
            <ol>
              {selectedStateNames.map((stateName) => (
                <li key={stateName}>{stateName}</li>
              ))}
            </ol>
          </div>
        ) : (
          <div>No options selected</div>
        )}
      </div>
      <br />
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownDisplayed((state) => !state);
        }}
      >
        <span className="button-text">
          {numberOfStatesSelected > 0
            ? `${numberOfStatesSelected} options selected`
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
      </button>

      {isDropdownDisplayed && (
        <div ref={dropdownRef} className="panel">
          {states.map((state) => (
            <fieldset
              key={state.abbreviation}
              className={selectedStates[state.abbreviation] ? `selected` : ""}
            >
              <input
                onChange={(e) =>
                  setSelectedStates({
                    ...selectedStates,
                    [state.abbreviation]: e.target.checked,
                  })
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
            </fieldset>
          ))}
        </div>
      )}
    </fieldset>
  );
}
