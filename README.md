## Component Description

The Enhanced Select Component is a customizable and feature-rich dropdown component designed for easy integration into any React.js codebase. It offers advanced customization options and enhanced functionality to suit various use cases.

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
