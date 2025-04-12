import { OrderStatus } from "~/constants/order";
import { CartItem } from "~/models/CartItem";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";

export const products: Product[] = [
  {
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductOne",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductTitle",
  },
  {
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Product",
  },
  {
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "ProductTest",
  },
  {
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Product2",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductName",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cart: CartItem[] = [
  {
    product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    count: 2,
  },
  {
    product_id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    count: 5,
  },
];

export const orders: Order[] = [
  {
    id: "1",
    delivery: {
      address: "some address",
      firstName: "Name",
      lastName: "Surname",
      comment: "",
    },
    items: [
      { product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 2 },
      { product_id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1", count: 5 },
    ],
    status: OrderStatus.Open,
    payment: {
      type: "credit_card",
      amount: 100.5,
      details: {
        cvv: "***",
        expiry: "12/24",
        cardNumber: "************1234",
      },
      currency: "USD",
    },
    total: 1,
    user_id: "aeed29c6-eb4b-408f-af50-7557904356e9",
  },
  {
    id: "2",
    delivery: {
      address: "another address",
      firstName: "John",
      lastName: "Doe",
      comment: "Ship fast!",
    },
    items: [{ product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 3 }],
    status: OrderStatus.Sent,
    payment: {
      type: "credit_card",
      amount: 100.5,
      details: {
        cvv: "***",
        expiry: "12/24",
        cardNumber: "************1234",
      },
      currency: "USD",
    },
    user_id: "aeed29c6-eb4b-408f-af50-7557904356e9",
    total: 1,
  },
];
