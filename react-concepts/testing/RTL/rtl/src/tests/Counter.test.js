import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../components/Counter';

test('renders welcome message', () => {
  render(<Counter />);
  const heading = screen.getByText(/welcome to rtl example/i);
  expect(heading).toBeInTheDocument();
});

test('increments counter when button is clicked', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /count/i });

  // Initially count should be 0
  expect(button).toHaveTextContent('Count: 0');

  // Click once
  fireEvent.click(button);
  expect(button).toHaveTextContent('Count: 1');
});
