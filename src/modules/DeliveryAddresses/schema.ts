// Shared validation schema for address fields

import { z } from "zod";


export const addressFieldsSchema = z.object({
  firstname: z.string({
    required_error: "First name is required",
    invalid_type_error: "First name must be a string"
  }).min(2, "First name must be at least 2 characters long")
    .max(50, "First name cannot exceed 50 characters")
    .trim()
    .regex(/^[a-zA-Z\s\-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  lastname: z.string({
    required_error: "Last name is required",
    invalid_type_error: "Last name must be a string"
  }).min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name cannot exceed 50 characters")
    .trim()
    .regex(/^[a-zA-Z\s\-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  address: z.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string"
  }).min(5, "Address must be at least 5 characters long")
    .max(200, "Address cannot exceed 200 characters")
    .trim(),
  appartment: z.string({
    invalid_type_error: "Apartment/Unit must be a string"
  }).max(50, "Apartment/Unit number cannot exceed 50 characters")
    .trim(),
  city: z.string({
    required_error: "City is required",
    invalid_type_error: "City must be a string"
  }).min(2, "City must be at least 2 characters long")
    .max(100, "City name cannot exceed 100 characters")
    .trim()
    .regex(/^[a-zA-Z\s\-']+$/, "City name can only contain letters, spaces, hyphens, and apostrophes"),
  phone: z.string({
    required_error: "Phone number is required",
    invalid_type_error: "Phone number must be a string"
  }).min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Phone number can only contain digits, spaces, hyphens, parentheses, and optionally a plus sign at the beginning")
    .transform((val) => val.replace(/[\s\-\(\)]/g, '')) // Remove formatting characters
});