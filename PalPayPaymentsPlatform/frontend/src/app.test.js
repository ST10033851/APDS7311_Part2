import { render, screen } from '@testing-library/react';
import App from './App';

//Simple test to check if the app renders a link element
test('renders test link', () => {
  render(<App />);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
