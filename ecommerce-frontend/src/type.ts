export type OrderItemType = {
  name: string;
  price: number;
  photo: string;
  quantity: number;
  _id: string;
};

export type OrderItem = {
  name: string;
  price: number;
  address: string;
  quantity: number;
  status: "Processing" | "Delivered" | "Shipped";
  subTotal: number;
  discount: number;
  shippingCharge: number;
  tax: number;
  OrderItems: OrderItemType[];
  _id: string;
};
