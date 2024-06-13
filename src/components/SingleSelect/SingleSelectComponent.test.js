import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SingleSelectComponent } from './SingleSelectComponent';
import { OptionsList } from '../OptionsList/OptionsList';

jest.mock("../OptionsList/OptionsList", () => ({
  OptionsList: [
    { label: "Chocolate", value: "chocolate" },
    { label: "Strawberry", value: "strawberry" },
    { label: "Vanilla", value: "vanilla" },
  ],
}));
describe("SingleSelectComponent", () => {
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with placeholder", () => {
    render(<SingleSelectComponent onChange={onChangeMock} />);
    expect(screen.getByText("Select your option here for first select component")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<SingleSelectComponent onChange={onChangeMock} />);
    fireEvent.click(screen.getByText("Select your option here for first select component"));
    expect(screen.getByText("Chocolate")).toBeVisible();
    expect(screen.getByText("Strawberry")).toBeVisible();
    expect(screen.getByText("Option 3")).toBeVisible();
  });

  it("selects an option", () => {
    render(<SingleSelectComponent onChange={onChangeMock} />);
    fireEvent.click(screen.getByText("Select your option here for first select component"));
    fireEvent.click(screen.getByText("Strawberry"));
    expect(screen.getByText("Strawberry")).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledWith({ label: "Strawberry", value: "strawberry" });
  });

  it("clears selected option", () => {
    render(<SingleSelectComponent onChange={onChangeMock} isClearable />);
    fireEvent.click(screen.getByText("Select your option here for first select component"));
    fireEvent.click(screen.getByText("Strawberry"));
    expect(screen.getByText("Strawberry")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Strawberry").nextSibling);
    expect(screen.getByText("Select your option here for first select component")).toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledWith(null);
  });

  it("handles isMenuOpen prop correctly", () => {
    const { rerender } = render(<SingleSelectComponent onChange={onChangeMock} isMenuOpen />);
    expect(screen.getByText("Chocolate")).toBeVisible();
    expect(screen.getByText("Strawberry")).toBeVisible();
    expect(screen.getByText("Vanilla")).toBeVisible();

    rerender(<SingleSelectComponent onChange={onChangeMock} isMenuOpen={false} />);
    expect(screen.queryByText("Chocolate")).not.toBeVisible();
    expect(screen.queryByText("Strawberry")).not.toBeVisible();
    expect(screen.queryByText("Vanilla")).not.toBeVisible();
  });

  it("handles isDisabled prop correctly", () => {
    render(<SingleSelectComponent onChange={onChangeMock} isDisabled />);
    fireEvent.click(screen.getByText("Select your option here for first select component"));
    expect(screen.queryByText("Chocolate")).not.toBeInTheDocument();
    expect(screen.queryByText("Strawberry")).not.toBeInTheDocument();
    expect(screen.queryByText("Vanilla")).not.toBeInTheDocument();
  });
});