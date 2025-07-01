// import Decimal from "decimal.js";

import { PAGES_LINKS } from "./linksData";


export const shortenText = (text: string, by: number) => {
  if (text?.length > by) {
    return `${text.slice(0, by)}...`;
  }
  return text;
}

export const paramBuilder = (path: string, params: Record<string, string>): string => {
  // Ensure this only runs in the browser
  if (typeof window === "undefined") return path;
  const baseUrl = window.location.origin;
  const urlObj = new URL(path, baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      urlObj.searchParams.append(key, value);
    }
  });

  return urlObj.pathname + urlObj.search;
};

export const generateCategoryLink = (slug: string) => {
  return `${PAGES_LINKS.products.link}?category=${slug}`
}
export const generateCollectionLink = (slug: string) => {
  return `${PAGES_LINKS.collections.link}/${slug}`
}



// export const parseMoney = (
//   {
//     money,
//     onlyPositive = false
//   }:
//     {
//       money: string | number | null | undefined,
//       onlyPositive?: boolean
//     }
// ): Decimal => {
//   // Return Decimal(0) for null, undefined, or empty string immediately
//   if (money === null || money === undefined || money === '') {
//     return new Decimal(0);
//   }

//   const moneyStr = money.toString();

//   // 1. Check for a negative sign *anywhere* in the original string.
//   //    (We assume any hyphen implies the number might be negative)
//   const isPotentiallyNegative = moneyStr.includes('-');

//   // 2. Remove everything except digits and the decimal point.
//   //    This extracts the core numeric parts, ignoring symbols, letters, commas, and hyphens.
//   let numericPart = moneyStr.replace(/[^0-9.]/g, '');

//   // 3. Validate the extracted numeric part.
//   //    - Check for multiple decimal points.
//   //    - Ensure it's not empty or just a single dot after cleaning.
//   const decimalParts = numericPart.split('.');
//   if (decimalParts.length > 2 || numericPart === '' || numericPart === '.') {
//     // If the structure is invalid (e.g., "1.2.3" -> "123", "abc" -> "", "N.-" -> ".")
//     // or cleaning resulted in nothing usable, return 0.
//     if (numericPart !== '') { // Avoid logging for completely non-numeric input
//       console.warn(`Could not parse money value after cleaning: Original='${money}', Invalid Numeric Part='${numericPart}'`);
//     }
//     return new Decimal(0);
//   }

//   // if there is more than ond decima point take the first and ignore the rest
//   if (decimalParts.length > 1) {
//     numericPart = `${decimalParts[0]}.${decimalParts[1]}`;
//   } else {
//     numericPart = decimalParts[0]; // Only the whole number part
//   }

//   // 4. Construct the final string, adding the negative sign if detected earlier.
//   const finalNumericString = isPotentiallyNegative ? '-' + numericPart : numericPart;

//   // 5. Final validation: Ensure the reconstructed string is a valid number format.
//   //    This catches edge cases like if numericPart was empty and isNegative was true, resulting in "-".
//   const isValidFormat = /^-?\d+(\.\d+)?$/.test(finalNumericString);
//   if (!isValidFormat) {
//     console.warn(`Could not parse money value after reconstruction: Original='${money}', Reconstructed='${finalNumericString}' (Invalid Format)`);
//     return new Decimal(0);
//   }

//   // 6. Parse the validated, reconstructed string.
//   try {
//     const amount = new Decimal(finalNumericString);

//     // Check for NaN (less likely now, but good practice)
//     if (amount.isNaN()) {
//       console.warn(`Parsed NaN from reconstructed value: Original='${money}', Reconstructed='${finalNumericString}'`);
//       return new Decimal(0);
//     }

//     // Apply absolute value if onlyPositive is true
//     return onlyPositive ? amount.abs() : amount;

//   } catch (error) {
//     console.error("Error parsing reconstructed money value with Decimal.js:", `Original='${money}', Reconstructed='${finalNumericString}'`, error);
//     return new Decimal(0);
//   }
// };


// export const formatPrice = ({ num, currency = "NGN", withSymbol = true, locale = "en-US", currencyDisplay = 'narrowSymbol' }: { num: string | number | Decimal | null | undefined, currency?: string, withSymbol?: boolean, locale?: string, currencyDisplay?: 'narrowSymbol' | 'symbol' | 'code' | 'name' }): string | null => {
//   let numDecimal: Decimal;

//   if (num instanceof Decimal) {
//     numDecimal = num;
//   } else if (num === null || num === undefined || num === '') {
//     return null;
//   } else {
//     // parsing non-Decimal inputs using parseMoney for consistency
//     numDecimal = parseMoney({ money: num });
//   }

//   if (numDecimal.isNaN()) {
//     console.error("Invalid number resulting in NaN for formatCurrency:", num);
//     return null;
//   }

//   try {
//     const numAsNumber = numDecimal.toNumber();

//     // Check for potential precision loss or range issues after toNumber()
//     if (!isFinite(numAsNumber)) {
//       console.error("Number exceeds limits for formatting:", numDecimal.toString());
//       return "Error: Number too large";
//     }

//     const formatter = new Intl.NumberFormat(locale, {
//       style: 'currency',
//       currency,
//       currencyDisplay,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//     const res = formatter.format(numAsNumber);

//     if (!withSymbol) {
//       const parts = formatter.formatToParts(numAsNumber);
//       const value = parts.filter(part => part.type !== 'currency' && part.type !== 'literal').map(p => p.value).join('');
//       return value.trim();
//     }

//     return res;
//   } catch (error) {
//     console.error("Error formatting currency:", numDecimal.toString(), error);
//     return "Formatting Error";
//   }
// };