import { z } from "zod";

// Input schema for creating an order
export const createOrderInputSchema = z.object({
  paymentReference: z.string(),
  transactionReference: z.string().optional(),
  paymentCompleted: z.boolean(),
  amount: z.string(),
  amountPaid: z.string(),
  paymentDate: z.string(),
  paymentDescription: z.string().optional(),
  customerId: z.string(),
  userEmail: z.string().email(),
  addressSnapshot: z.object({
    firstname: z.string(),
    lastname: z.string(),
    address: z.string(),
    appartment: z.string().optional(),
    city: z.string(),
    phone: z.string(),
  }).optional(),
  productsSnapshot: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
    deliveryFee: z.number().optional(),
  })),
  productsOrdered: z.array(z.string()),
  status: z.enum(["pending", "paid", "delivered", "cancelled"]).optional(),
});

// Output schema for order data
export const orderOutputSchema = z.object({
  id: z.string(),
  paymentReference: z.string(),
  transactionReference: z.string().optional(),
  paymentCompleted: z.boolean(),
  amount: z.string(),
  amountPaid: z.string(),
  paymentDate: z.string(),
  paymentDescription: z.string().optional(),
  customerId: z.string(),
  userEmail: z.string(),
  addressSnapshot: z.any().optional(), // Now JSON
  productsSnapshot: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string().optional(),
    size: z.string().optional(),
    color: z.string().optional(),
  })).optional(), // Now an array of product snapshots
  productsOrdered: z.array(z.string()),
  status: z.enum(["pending", "paid", "delivered", "cancelled"]),
  delivered: z.boolean().optional(),
  dateDelivered: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// TypeScript types
export type CreateOrderInput = z.infer<typeof createOrderInputSchema>;
export type OrderOutput = z.infer<typeof orderOutputSchema>;

// Product snapshot type for the input
export interface ProductSnapshot {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

// Address snapshot type for the input
export interface AddressSnapshot {
  firstname: string;
  lastname: string;
  address: string;
  appartment?: string;
  city: string;
  phone: string;
} 