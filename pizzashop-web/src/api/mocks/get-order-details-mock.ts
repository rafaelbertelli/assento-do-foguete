import { http, HttpResponse } from "msw";
import { GetOrderDetailsRequest, GetOrderDetailsResponse } from "../get-order-details";

export const getOrderDetailsMock = http.get<GetOrderDetailsRequest, never, GetOrderDetailsResponse>(
  "/orders/:orderId",
  ({ params }) => {
    return HttpResponse.json({
      id: params.orderId,
      status: "pending",
      createdAt: new Date().toISOString(),
      totalInCents: 30000,
      customer: {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "321765721",
      },
      orderItems: [
        {
          id: "order-item-1",
          priceInCents: 10000,
          quantity: 1,
          product: {
            name: "Product 1",
          },
        },
        {
          id: "order-item-2",
          priceInCents: 20000,
          quantity: 2,
          product: {
            name: "Product 2",
          },
        },
      ],
    });
  },
);
