import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("renders restaurant link", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const restaurant = screen.getByText(/restaurant/i);
  expect(restaurant).toBeInTheDocument();
});
