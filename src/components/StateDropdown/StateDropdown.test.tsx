import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { StateDropdown } from "./StateDropdown";
import { states } from "./states";

jest.mock("./states", () => ({
  states: [
    { name: "Alabama", abbreviation: "AL" },
    { name: "Alaska", abbreviation: "AK" },
    { name: "Arizona", abbreviation: "AZ" },
    { name: "Arkansas", abbreviation: "AR" },
  ],
}));

describe("StateDropdown", () => {
  it("renders with default placeholder", () => {
    render(<StateDropdown />);
    expect(screen.getByText("--select your options--")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<StateDropdown />);
    fireEvent.click(screen.getByText("--select your options--"));
    expect(screen.getByText("Alabama")).toBeVisible();
    expect(screen.getByText("Alaska")).toBeVisible();
    expect(screen.getByText("Arizona")).toBeVisible();
    expect(screen.getByText("Arkansas")).toBeVisible();
  });

  it("selects and deselects options", () => {
    render(<StateDropdown />);
    fireEvent.click(screen.getByText("--select your options--"));

    fireEvent.click(screen.getByLabelText("Alabama"));
    expect(screen.getByText("Alabama")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Alaska"));
    expect(screen.getByText("Alaska")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Alabama"));
    expect(screen.queryByText("Alabama")).not.toBeInTheDocument();
  });

  it("limits the number of selections to 3", () => {
    render(<StateDropdown />);
    fireEvent.click(screen.getByText("--select your options--"));

    fireEvent.click(screen.getByLabelText("Alabama"));
    fireEvent.click(screen.getByLabelText("Alaska"));
    fireEvent.click(screen.getByLabelText("Arizona"));

    expect(screen.getByLabelText("Alabama")).toBeChecked();
    expect(screen.getByLabelText("Alaska")).toBeChecked();
    expect(screen.getByLabelText("Arizona")).toBeChecked();

    expect(screen.getByLabelText("Arkansas")).toBeDisabled();
  });

  it("closes dropdown when clicking outside", () => {
    render(<StateDropdown />);
    fireEvent.click(screen.getByText("--select your options--"));

    expect(screen.getByText("Alabama")).toBeVisible();

    fireEvent.click(document);
    expect(screen.queryByText("Alabama")).not.toBeVisible();
  });
});
