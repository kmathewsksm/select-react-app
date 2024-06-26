import React, { useState } from "react";
import { OptionsList } from "./components/OptionsList/OptionsList";
import { states } from "./components/StateDropdown/states";
import { UnifiedSelectComponent } from "./components/UnifiedSelectComponent/UnifiedSelectComponent";

export const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} style={{ color: "blue" }} />
    {children}
  </label>
);

export const getCustomStyles = (themeColor) => ({
  control: {
    backgroundColor: themeColor || "white",
  },
  option: (isSelected) => ({
    color: isSelected ? "black" : "black",
  }),
});

function App() {
  const [isClearable, setIsClearable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeColor, setThemeColor] = useState("#98F0FB");
  const [selectedOptionSingle, setSelectedOptionSingle] = useState(null);
  const [selectedOptionsMulti, setSelectedOptionsMulti] = useState([]);

  const customStyles = getCustomStyles(themeColor);

  const handleSelectChangeSingle = (selectedOption) => {
    console.log("Selected option (single):", selectedOption);
    setSelectedOptionSingle(selectedOption);
  };

  const handleSelectChangeMulti = (selectedOptions) => {
    console.log("Selected options (multi):", selectedOptions);
    setSelectedOptionsMulti(selectedOptions);
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginLeft: "200px",
        marginRight: "200px",
        marginBottom: "300px",
      }}
    >
      <br />
      <h1 style={{ textAlign: "center", color: "#092e42" }}>
        Demo on Select Component features
      </h1>
      <br />
      <div style={{ width: "100%" }}>
        <h3 style={{ textAlign: "left" }}>
          Single Select Component with some added properties
        </h3>
      </div>
      <div>
        <label>
          Select Theme Color:
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <br />
      <div
        style={{
          color: "hsl(0, 0%, 40%)",
          display: "inline-block",
          fontSize: 12,
          fontStyle: "italic",
          marginTop: "1em",
        }}
      >
        <Checkbox
          checked={isClearable}
          onChange={() => setIsClearable((state) => !state)}
        >
          Clearable
        </Checkbox>

        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>

        <Checkbox
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen((state) => !state)}
        >
          Keep it Open
        </Checkbox>
      </div>
      <br />
      <UnifiedSelectComponent
        isMulti={false}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMenuOpen={isMenuOpen}
        onChange={handleSelectChangeSingle}
        customStyles={customStyles}
        placeholder="Select your option here"
        options={OptionsList}
      />
      <br />
      <div>
        {selectedOptionSingle ? (
          <div>Information: {selectedOptionSingle.description}</div>
        ) : (
          "Please select an option"
        )}
      </div>
      <br />
      <br />
      <div>
        The above demo is that of{" "}
        <span style={{ fontWeight: "bold" }}>single select</span> component, we
        have{" "}
        <span style={{ fontWeight: "bold" }}>
          isClearable, isDisabled, placeholder, name, options, onChange{" "}
        </span>
        props that are passed as boolean values to the checkboxes and towards
        the select component. onChange prop, options prop are passed as list of
        ice creams that are rendered in the drop-down menu. Placeholder text
        within the background of the select component.
      </div>

      <br />
      <div style={{ width: "100%" }}>
        <h3 style={{ textAlign: "left" }}>
          Multi Select Component with some added properties
        </h3>
      </div>
      <br />
      <UnifiedSelectComponent
        isMulti={true}
        isClearable={isClearable}
        isDisabled={false}
        onChange={handleSelectChangeMulti}
        customStyles={customStyles}
        placeholder="Select your options here"
        options={states}
      />
      <br />
      <div>
        {selectedOptionsMulti.length > 0 ? (
          <div>Selected States: {selectedOptionsMulti.map((option) => option.name).join(', ')}</div>
        ) : (
          "Please select options"
        )}
      </div>
      <br />
      <div>
        The above demo of the multi-select component lets us choose multiple
        options from the drop-down menu, along with{" "}
        <span style={{ fontWeight: "bold" }}>isMulti</span>,{" "}
        <span style={{ fontWeight: "bold" }}>closeMenuOnSelect (false)</span>{" "}
        , <span style={{ fontWeight: "bold" }}>maxSelections</span> ,{" "}
        <span style={{ fontWeight: "bold" }}>isOptionDisabled</span>,{" "}
        <span style={{ fontWeight: "bold" }}>defaultValue (2)</span>prop. We are
        also using the defaultValue prop that has selected the first two options
        from the drop-down menu. We have also added a custom function to disable
        the drop-down menu if three options were selected.
      </div>
    </div>
  );
}

export default App;



