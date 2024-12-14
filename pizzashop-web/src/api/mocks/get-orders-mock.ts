import { http, HttpResponse } from "msw";
import { GetOrdersResponse } from "../get-orders";

type Orders = GetOrdersResponse["orders"];

type OrderStatus = GetOrdersResponse["orders"][number]["status"];

const statuses: OrderStatus[] = ["pending", "canceled", "processing", "delivering", "delivered"];

const orders: Orders = Array.from({ length: 60 }, (_, index) => ({
  orderId: `order-${index + 1}`,
  customerName: `Customer ${index + 1}`,
  status: statuses[index % 5],
  createdAt: new Date().toISOString(),
  total: Math.floor(Math.random() * 10000),
}));

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  "/orders",
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const pageIndex = Number(searchParams.get("pageIndex")) ?? 0;
    const customerName = searchParams.get("customerName");
    const orderId = searchParams.get("orderId");
    const status = searchParams.get("status");

    let filteredOrders = orders;

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.toLowerCase().includes(customerName.toLowerCase()),
      );
    }

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) => order.orderId === orderId);
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }

    const paginatedOrders = filteredOrders.slice(pageIndex * 10, (pageIndex + 1) * 10);

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    });
  },
);
