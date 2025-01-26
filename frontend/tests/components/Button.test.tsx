import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@components/Button";

test("it renders the button and handles click event", () => {
  const mockOnClick = jest.fn();

  render(<Button label="Click Me" onClick={mockOnClick} />);

  const button = screen.getByText(/Click Me/i);
  fireEvent.click(button);

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
