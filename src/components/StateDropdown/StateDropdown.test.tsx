import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StateDropdown } from "./StateDropdown";
import { states } from "./states";

describe("StateDropdown", () => {
  it("renders without crashing", () => {
    render(<StateDropdown />);
    expect(screen.getByText("--select your options--")).toBeInTheDocument();
  });

  it("opens and closes the dropdown", () => {
    render(<StateDropdown />);
    const button = screen.getByText("--select your options--");
    
    fireEvent.click(button);
    expect(screen.getByText(states[0].name)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText(states[0].name)).not.toBeInTheDocument();
  });

  it("selects and deselects options", () => {
    render(<StateDropdown />);
    const button = screen.getByText("--select your options--");

    fireEvent.click(button);

    const firstOption = screen.getByLabelText(states[0].name);
    fireEvent.click(firstOption);
    expect(firstOption).toBeChecked();
    expect(screen.getByText("1 options selected")).toBeInTheDocument();

    fireEvent.click(firstOption);
    expect(firstOption).not.toBeChecked();
    expect(screen.getByText("--select your options--")).toBeInTheDocument();
  });

  it("limits selection to three options", () => {
    render(<StateDropdown />);
    const button = screen.getByText("--select your options--");

    fireEvent.click(button);

    const option1 = screen.getByLabelText(states[0].name);
    const option2 = screen.getByLabelText(states[1].name);
    const option3 = screen.getByLabelText(states[2].name);
    fireEvent.click(option1);
    fireEvent.click(option2);
    fireEvent.click(option3);

    expect(option1).toBeChecked();
    expect(option2).toBeChecked();
    expect(option3).toBeChecked();
    expect(screen.getByText("3 options selected")).toBeInTheDocument();

    const option4 = screen.getByLabelText(states[3].name);
    expect(option4).toBeDisabled();

    fireEvent.click(option1);
    expect(option4).not.toBeDisabled();
  });
});
