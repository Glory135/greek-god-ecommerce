"use client"

import { CategoriesGetManyOutput, SubCategoriesGetManyOutput } from "@/modules/categories/types";
import { paramBuilder } from "@/utils/commonFunctions";
import { PAGES_LINKS } from "@/utils/linksData";

export const handleSubCategoryLink = (category: SubCategoriesGetManyOutput[0], parentCat?: CategoriesGetManyOutput[0]) => {
  if (category.slug == "all") {
    return (`${PAGES_LINKS.products.link}`)
  }
  if(!parentCat){
    return paramBuilder(`${PAGES_LINKS.products.link}`, {category: category.slug})
  }

  const paramsBody = {
    category: parentCat?.slug,
    subcategory: category?.slug
  }

  return paramBuilder(`${PAGES_LINKS.products.link}`, paramsBody)
}