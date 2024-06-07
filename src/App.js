import React, { useState } from "react";
import Select from "react-select";
import { OptionsList } from "./OptionsList";
import { SingleSelectComponent } from "./SingleSelectComponent";
import { MultiSelectComponent } from "./MultiSelectComponent";
import { ThirdSelectComponent } from "./ThirdSelectComponent";

export const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

export const getCustomStyles = (themeColor) => ({
  control: (styles) => ({
    ...styles,
    backgroundColor: themeColor ? themeColor : "white",
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? themeColor : null,
    color:isSelected?"black":styles.color,
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: themeColor,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "white",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "black",
  }),
});

function App() {
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [themeColor, setThemeColor] = useState("#98fb98");
  const [selectedOptionSingle, setSelectedOptionSingle] = useState(null);
  const [selectedOptionMulti, setSelectedOptionMulti] = useState([
    OptionsList[0],
    OptionsList[1],
  ]);

  const handleMultiChange = (selectedOptions) => {
    if (selectedOptions.length <= 3) {
      setSelectedOptionMulti(selectedOptions);
    }
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
      <h1 style={{ textAlign: "center",color:"#092e42" }}>Demo on Select Component features</h1>
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
          checked={isSearchable}
          onChange={() => setIsSearchable((state) => !state)}
        >
          Searchable
        </Checkbox>
        <Checkbox
          checked={isDisabled}
          onChange={() => setIsDisabled((state) => !state)}
        >
          Disabled
        </Checkbox>
        <Checkbox
          checked={isLoading}
          onChange={() => setIsLoading((state) => !state)}
        >
          Loading
        </Checkbox>
        <Checkbox checked={isRtl} onChange={() => setIsRtl((state) => !state)}>
          RTL
        </Checkbox>
      </div>
      <br />
      <SingleSelectComponent
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isRtl={isRtl}
        themeColor={themeColor}
        customStyles={getCustomStyles(themeColor)}
        onChange={(option) => {
          setSelectedOptionSingle(option ? option.description : null);
          if (option) {
            console.log("Selected value:", option.value);
          }
        }}
      />
      <br />
      <div>
        {selectedOptionSingle ? (
          <div>Information: {selectedOptionSingle}</div>
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
          isClearable, isDisabled, isLoading, isSearchable, isRtl, placeholder,
          name, options, onChange{" "}
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
      <MultiSelectComponent
        selectedOptionMulti={selectedOptionMulti}
        handleMultiChange={handleMultiChange}
        themeColor={themeColor}
        customStyles={getCustomStyles(themeColor)}
      />
      <br />
      <div>
        The above demo of the multi-select component lets us choose multiple
        options from the drop-down menu, along with{" "}
        <span style={{ fontWeight: "bold" }}>makeAnimated function</span>,{" "}
        <span style={{ fontWeight: "bold" }}>closeMenuOnSelect</span> prop. We
        are also using the defaultValue prop that has selected the first two
        options from the drop-down menu. We have also added a custom function to
        disable the drop-down menu if three options were selected.
      </div>
      <br />
      <div style={{ width: "100%" }}>
        <h3 style={{ textAlign: "left" }}>
          Single Select Component with keeping menu open.
        </h3>
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
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen((state) => !state)}
        >
          Keep it Open
        </Checkbox>
      </div>
      <br />
      <ThirdSelectComponent
        isSearchable={isSearchable}
        isRtl={isRtl}
        isMenuOpen={isMenuOpen}
        themeColor={themeColor}
        customStyles={getCustomStyles(themeColor)}
        onChange={(option) => {
          setSelectedOptionSingle(option ? option.description : null);
          if (option) {
            console.log("Selected value:", option.value);
          }
        }}
      />
    </div>
  );
}

export default App;
