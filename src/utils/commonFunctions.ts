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

export const generateProductLink = (slug: string) => {
  return `${PAGES_LINKS.products.link}/${slug}`
}