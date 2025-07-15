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
    currencyDisplay :'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numberVaalue);

  return formattedPrice;
}

// Utility to send email using Resend API
export async function sendResendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || 'no-reply@greekgod.com';
  if (!RESEND_API_KEY) throw new Error('Missing RESEND_API_KEY');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to send email: ${error}`);
  }
  return res.json();
}