import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavLink } from "./nav-link";

describe("NavLink", () => {
  it("should highlight the nav link when is the current page link", () => {
    render(
      <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={["/home"]}>{children}</MemoryRouter>
        ),
      },
    );
    expect(screen.getByText("Home")).toHaveAttribute("data-current", "true");
    expect(screen.getByText("About")).toHaveAttribute("data-current", "false");
  });
});
