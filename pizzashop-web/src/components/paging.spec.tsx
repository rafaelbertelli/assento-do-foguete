import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Paging } from "./paging";

describe("Paging", () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the right amoun of pages and results", () => {
    render(<Paging pageIndex={0} totalCount={200} perPage={10} onPageChange={() => {}} />);
    expect(screen.getByText("Total de 200 registros")).toBeInTheDocument();
    expect(screen.getByText("Página 1 de 20")).toBeInTheDocument();
  });

  it("should be able to navigate to the next page", async () => {
    render(<Paging pageIndex={0} totalCount={200} perPage={10} onPageChange={onPageChange} />);
    const nxtBtn = screen.getByRole("button", { name: /próxima página/i });
    await userEvent.click(nxtBtn);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should be able to navigate to the previous page", async () => {
    render(<Paging pageIndex={1} totalCount={200} perPage={10} onPageChange={onPageChange} />);
    const prevBtn = screen.getByRole("button", { name: /página anterior/i });
    await userEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it("should be able to navigate to the last page", async () => {
    render(<Paging pageIndex={0} totalCount={200} perPage={10} onPageChange={onPageChange} />);
    const lastBtn = screen.getByRole("button", { name: /última página/i });
    await userEvent.click(lastBtn);
    expect(onPageChange).toHaveBeenCalledWith(19);
  });

  it("should be able to navigate to the first page", async () => {
    render(<Paging pageIndex={19} totalCount={200} perPage={10} onPageChange={onPageChange} />);
    const firstBtn = screen.getByRole("button", { name: /primeira página/i });
    await userEvent.click(firstBtn);
    expect(onPageChange).toHaveBeenCalledWith(0);
  });
});
