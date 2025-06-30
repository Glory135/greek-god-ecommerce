import { useQueryStates, parseAsString, parseAsArrayOf, parseAsStringLiteral } from "nuqs"

const sortValues = ["newest", "oldest", "featured", "pricel", "priceh", "bestseller"] as const

const params = {
  sort: parseAsStringLiteral(sortValues)
    .withDefault("featured"),
  category: parseAsString
    .withOptions({
      clearOnDefault: true
    }).withDefault(""),
  subcategory: parseAsString
    .withOptions({
      clearOnDefault: true
    }).withDefault(""),
  minPrice: parseAsString
    .withOptions({
      clearOnDefault: true
    }).withDefault(""),
  maxPrice: parseAsString
    .withOptions({
      clearOnDefault: true
    }).withDefault(""),
  colors: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true
  }).withDefault([]),
  sizes: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true
  }).withDefault([])
}

export const useProductFilters = () => {
  return useQueryStates(params)
}