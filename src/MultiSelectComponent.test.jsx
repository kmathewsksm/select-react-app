import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiSelectComponent } from "./MultiSelectComponent";
import { OptionsList } from "./OptionsList";

it("renders MultiSelectComponent", () => {
  render(
    <MultiSelectComponent
      selectedOptionMulti={[]}
      handleMultiChange={() => {}}
      options={OptionsList}
    />
  );
  const selectElement = screen.getByLabelText(/multi select component/i);
  expect(selectElement).toBeInTheDocument();
});

it("selects multiple options", () => {
  const handleMultiChange = jest.fn();
  render(
    <MultiSelectComponent
      selectedOptionMulti={[]}
      handleMultiChange={handleMultiChange}
      options={OptionsList}
    />
  );
  const selectElement = screen.getByLabelText(/multi select component/i);
  fireEvent.change(selectElement, { target: { value: "Chocolate" } });
  fireEvent.change(selectElement, { target: { value: "Strawberry" } });
  expect(handleMultiChange).toHaveBeenCalledTimes(0);
});
