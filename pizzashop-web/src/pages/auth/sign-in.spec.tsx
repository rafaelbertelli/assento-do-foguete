import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { SignIn } from "./sign-in";

describe("NavLink", () => {
  it("should set default email input value if email is present on search params", () => {
    render(<SignIn />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/sign-in?email=johndoe@gmail.com"]}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </HelmetProvider>
        </MemoryRouter>
      ),
    });
    const emailInput: HTMLInputElement = screen.getByLabelText("E-mail");
    expect(emailInput.value).toBe("johndoe@gmail.com");
  });
});
