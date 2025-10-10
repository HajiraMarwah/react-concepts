import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../components/Login';

test('updates username on input change', () => {
  render(<Login />);

  const input = screen.getByPlaceholderText('Enter username');
  fireEvent.change(input, { target: { value: 'Priyanka' } });

  expect(screen.getByTestId('display')).toHaveTextContent('Current: Priyanka');
});