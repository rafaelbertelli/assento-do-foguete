import { render, screen } from "@testing-library/react";
import { OrderStatus } from "./order-status";

describe("OrderStatus", () => {
  it("should display the order status pending", () => {
    const c = render(<OrderStatus status="pending" />);
    expect(screen.getByText("Pendente")).toBeInTheDocument();
    expect(c.container.querySelector(".bg-slate-400")).toBeInTheDocument();
  });

  it("should display the order status canceled", () => {
    const c = render(<OrderStatus status="canceled" />);
    expect(screen.getByText("Cancelado")).toBeInTheDocument();
    expect(c.container.querySelector(".bg-rose-500")).toBeInTheDocument();
  });

  it("should display the order status processing", () => {
    const c = render(<OrderStatus status="processing" />);
    expect(screen.getByText("Em preparo")).toBeInTheDocument();
    expect(c.container.querySelector(".bg-amber-500")).toBeInTheDocument();
  });

  it("should display the order status delivering", () => {
    const c = render(<OrderStatus status="delivering" />);
    expect(screen.getByText("Em entrega")).toBeInTheDocument();
    expect(c.container.querySelector(".bg-amber-500")).toBeInTheDocument();
  });

  it("should display the order status delivered", () => {
    const c = render(<OrderStatus status="delivered" />);
    expect(c.container.querySelector(".bg-emerald-500")).toBeInTheDocument();
    expect(screen.getByText("Entregue")).toBeInTheDocument();
  });
});
