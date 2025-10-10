import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with label and handles click', () => {
  const handleClick = jest.fn();

  render(<Button label="Click Me" onClick={handleClick} />);

  // Verify button is in the document
  const buttonElement = screen.getByText(/click me/i);
  expect(buttonElement).toBeInTheDocument();

  // Simulate user click
  fireEvent.click(buttonElement);

  // Assert click handler called once
  expect(handleClick).toHaveBeenCalledTimes(1);
});
