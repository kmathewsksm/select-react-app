import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UnifiedSelectComponent from "./UnifiedSelectComponent";
import { states } from "../StateDropdown/states";
import { OptionsList } from "../OptionsList/OptionsList";

describe("UnifiedSelectComponent", () => {
  const defaultProps = {
    isMulti: false,
    isClearable: false,
    isDisabled: false,
    isMenuOpen: false,
    onChange: jest.fn(),
    placeholder: "Select your option here",
    customStyles: {
      control: { backgroundColor: "#f0f0f0" },
      option: (isSelected) => ({
        backgroundColor: isSelected ? "#d0d0d0" : "#fff",
        color: isSelected ? "#000" : "#000",
      }),
    },
    keepOpenChecked: false,
  };

  const renderComponent = (props = {}) =>
    render(<UnifiedSelectComponent {...defaultProps} {...props} />);

  it("should render without crashing", () => {
    renderComponent();
    expect(screen.getByText("Select your option here")).toBeInTheDocument();
  });

  it("should open dropdown on click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Select your option here"));
    expect(screen.getByText(OptionsList[0].label)).toBeInTheDocument();
  });

  it("should select an option in single select mode", () => {
    const onChange = jest.fn();
    renderComponent({ onChange });
    fireEvent.click(screen.getByText("Select your option here"));
    fireEvent.click(screen.getByText(OptionsList[0].label));
    expect(onChange).toHaveBeenCalledWith(OptionsList[0]);
  });

  it("should select multiple options in multi select mode", () => {
    const onChange = jest.fn();
    renderComponent({ isMulti: true, onChange });
    fireEvent.click(screen.getByText("Select your option here"));
    fireEvent.click(screen.getByText(states[0].name));
    fireEvent.click(screen.getByText(states[1].name));
    expect(onChange).toHaveBeenCalledWith([states[0], states[1]]);
  });

  it("should clear selections when clearable", () => {
    const onChange = jest.fn();
    renderComponent({ isMulti: true, isClearable: true, onChange });
    fireEvent.click(screen.getByText("Select your option here"));
    fireEvent.click(screen.getByText(states[0].name));
    fireEvent.click(screen.getByText(states[1].name));
    fireEvent.click(screen.getByText(" | ")); // Clicking the clear icon
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("should disable dropdown when max selections reached in multi select mode", () => {
    const onChange = jest.fn();
    renderComponent({ isMulti: true, onChange });
    fireEvent.click(screen.getByText("Select your option here"));
    fireEvent.click(screen.getByText(states[0].name));
    fireEvent.click(screen.getByText(states[1].name));
    fireEvent.click(screen.getByText(states[2].name));
    expect(
      screen.getByText(states[3].name).closest(".unified-select-option")
    ).toHaveClass("disabled");
  });

  it("should close dropdown on outside click", () => {
    renderComponent({ isMenuOpen: true });
    fireEvent.click(document);
    expect(screen.queryByText(OptionsList[0].label)).not.toBeInTheDocument();
  });

  it("should toggle dropdown on click when keepOpenChecked is true", () => {
    renderComponent({ keepOpenChecked: true });
    fireEvent.click(screen.getByText("Select your option here"));
    fireEvent.click(screen.getByText("Select your option here"));
    expect(screen.getByText(OptionsList[0].label)).toBeInTheDocument();
  });

  it("should call onChange with correct value on option remove", () => {
    const onChange = jest.fn();
    renderComponent({ isMulti: true, onChange });
    fireEvent.click(screen.getByText("Select your option here"));
    fireEvent.click(screen.getByText(states[0].name));
    fireEvent.click(screen.getByText(states[1].name));
    fireEvent.click(screen.getByText(states[0].name)); // Remove first option
    expect(onChange).toHaveBeenCalledWith([states[1]]);
  });
});
