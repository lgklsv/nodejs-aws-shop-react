import * as Yup from "yup";
import { OrderStatus } from "~/constants/order";

export const AddressSchema = Yup.object({
  firstName: Yup.string().required().default(""),
  lastName: Yup.string().required().default(""),
  address: Yup.string().required().default(""),
  comment: Yup.string().default(""),
}).defined();

export type Address = Yup.InferType<typeof AddressSchema>;

export const PaymentSchema = Yup.object({
  amount: Yup.number().required(),
  currency: Yup.string().required().default("USD"),
  type: Yup.string().required().default("credit_card"),
  details: Yup.object().defined(),
}).defined();

export type Payment = Yup.InferType<typeof PaymentSchema>;

export const OrderItemSchema = Yup.object({
  product_id: Yup.string().required(),
  count: Yup.number().integer().positive().required(),
}).defined();

export type OrderItem = Yup.InferType<typeof OrderItemSchema>;

export const statusHistorySchema = Yup.object({
  status: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required(),
  timestamp: Yup.number().required(),
  comment: Yup.string().required(),
});

export type statusHistory = Yup.InferType<typeof statusHistorySchema>;

export const OrderSchema = Yup.object({
  id: Yup.string().required(),
  items: Yup.array().of(OrderItemSchema).defined(),
  delivery: AddressSchema.required(),
  status: Yup.mixed<OrderStatus>().oneOf(Object.values(OrderStatus)).required(),
  total: Yup.number().required(),
  user_id: Yup.string().required(),
  payment: PaymentSchema.required(),
}).defined();

export type Order = Yup.InferType<typeof OrderSchema>;
