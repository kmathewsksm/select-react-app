import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThirdSelectComponent } from './ThirdSelectComponent';
import { OptionsList } from './OptionsList';

it('renders ThirdSelectComponent', () => {
  render(<ThirdSelectComponent options={OptionsList} />);
  const selectElement = screen.getByPlaceholderText(
    /Select your option here for third select component/i
  );
  expect(selectElement).toBeInTheDocument();
});

it('selects an option in ThirdSelectComponent', () => {
  render(<ThirdSelectComponent options={OptionsList} />);
  const selectElement = screen.getByPlaceholderText(
    /Select your option here for third select component/i
  );
  fireEvent.change(selectElement, { target: { value: 'Chocolate' } });
  expect(selectElement.value).toBe('Chocolate');
});
