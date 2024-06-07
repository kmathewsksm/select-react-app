import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SingleSelectComponent } from './SingleSelectComponent';
import { OptionsList } from './OptionsList';

it('renders SingleSelectComponent', () => {
  render(<SingleSelectComponent options={OptionsList} />);
  const selectElement = screen.getByPlaceholderText(
    /Select your option here for first select component/i
  );
  expect(selectElement).toBeInTheDocument();
});

it('selects an option', () => {
  render(<SingleSelectComponent options={OptionsList} />);
  const selectElement = screen.getByPlaceholderText(
    /Select your option here for first select component/i
  );
  fireEvent.change(selectElement, { target: { value: 'Chocolate' } });
  expect(selectElement.value).toBe('Chocolate');
});
