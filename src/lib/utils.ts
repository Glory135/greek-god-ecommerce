import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT"| "NGN",
  } = {}
) {
  const numericValue = price.replace(/[^0-9.]/g, "")
  const parts = numericValue.split(".");
  const formattedValue = parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if(!formattedValue) return ""

  const numberVaalue = parseFloat(formattedValue);

  if(isNaN(numberVaalue)) return "";

  const { currency = "NGN", } = options;
  const formattedPrice = new Intl.NumberFormat(
    "en-US", {
    style: "currency",
    currency,
    currencyDisplay :'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numberVaalue);

  return formattedPrice;
}