import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the demo header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Demo on Select Component features/i);
  expect(headerElement).toBeInTheDocument();
});

test('changes theme color', () => {
  render(<App />);
  const colorInput = screen.getByLabelText(/Select Theme Color/i);
  fireEvent.change(colorInput, { target: { value: '#ff0000' } });
  expect(colorInput.value).toBe('#ff0000');
});

test('displays single select information', () => {
  render(<App />);
  const singleSelectComponent = screen.getByPlaceholderText(
    /Select your option here for first select component/i
  );
  fireEvent.change(singleSelectComponent, { target: { value: 'Chocolate' } });
  const infoElement = screen.getByText(/Information:/i);
  expect(infoElement).toBeInTheDocument();
});