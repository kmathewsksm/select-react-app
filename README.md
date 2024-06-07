## Component Description

The Enhanced Select Component is a versatile and customizable select input component This component supports most modifications and enhanced functionality, making it versatile

## Props

### `options` (array)

An array of options for the select component. Each option should have the following properties:

- `value` (string): The value of the option.
- `label` (string): The label displayed for the option.
- `description` (string): The extended description of the option.

### `extended` (boolean)

If true, displays the option label along with its extended description for every option.

### `defaultValue` (string)

The default value for the select input.

### `onChange` (function)

A method to handle the change event when the selected value(s) change.

### `themeColor` (string)

The theme color passed from the parent component, which dynamically changes the design of the Select component.

### `isMultiple` (boolean)

If true, allows multiple options to be selected through checkboxes and displays them in the selected order in the dropdown input box. Each option has a 'x' icon to individually remove them.

### `isOpen` (boolean)

If true, keeps the dropdown always open.

### `isClearable` (boolean)

If true, adds an ‘x’ icon in the input box to clear the selected value when clicked.

### `maxSelections` (number)

Limits the maximum number of selections when `isMultiple` is true.

### `placeholder` (string)

Placeholder text to display in the input box when no option is selected.

### `disabled` (boolean)

If true, disables the select component, preventing user interaction.

### `customStyles` (object)

An object to provide custom styles for various parts of the component.

### Trial Component usage

```js
export const OptionsList = [
{
value: "chocolate",
label: "Chocolate",
description: "Chocolate originates from Ghana",
},
{
value: "strawberry",
label: "Strawberry",
description: "Strawberries comes from Turkey",
},



const App = () => {
const [selectedOption, setSelectedOption] = useState(null);

return (

<div>
<SingleSelectComponent
options={OptionsList}
extended={true}
defaultValue="chocolate"
onChange={(option) => setSelectedOption(option)}
themeColor="#98fb98"
isMultiple={true}
isOpen={false}
isClearable={true}
maxSelections={3}
placeholder="Select your favorite flavor"
disabled={false}
styles={{customStyles}}
/>
<div>
{selectedOption ? (
<div>Selected: {selectedOption.label}</div>
) : (
"Please select an option"
)}
</div>
</div>
);
};

export default App;
```

## Styling

You can dynamically style the component using the themeColor prop and provide additional custom styles through the customStyles prop. The themeColor prop will change the background color, selected option color, and other UI elements.

```js
<SelectStyles
  customStyles={{
    control: (styles) => ({ ...styles, border: "1px solid #ff5733" }),
    option: (styles, { isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? "#ff5733" : null,
      color: isSelected ? "white" : "black",
    }),
  }}
/>
```

## Unit Testing

Unit tests are written using Jest and React Testing Library check component behaves as expected.

## Test Files

-`App.test.js`: Tests the main application component -`SingleSelectComponent.test.js`: Tests the single select component -`MultiSelectComponent.test.js`: Tests the multi-select component -`ThirdSelectComponent.test.js`: Tests the third select component -`OptionsList.test.js`: Tests the options list

## Test Usage

```js
it("OptionsList has the correct number of options", () => {
  expect(OptionsList.length).toBe(6);
});

it("OptionsList contains correct options", () => {
  const values = OptionsList.map((option) => option.value);
  expect(values).toContain("chocolate");
  expect(values).toContain("strawberry");
  expect(values).toContain("vanilla");
  expect(values).toContain("mango");
  expect(values).toContain("pistachio");
  expect(values).toContain("butterscotch");
});
```

## Accessibility

The Select Component is designed with accessibility in mind. It includes keyboard navigation support and ARIA attributes to ensure all users can use it smoothly and reliably.
