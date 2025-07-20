import { INavItem } from "@/components/Nav/types";
import { Category, LayoutMedia, ProductCollection } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { generateCategoryLink, generateCollectionLink } from "@/utils/commonFunctions";
import { PAGES_LINKS } from "@/utils/linksData";
import { z } from "zod";

export const layoutRouter = createTRPCRouter({

  getNavigationData: baseProcedure.query(async ({ ctx }) => {
    // Get categories with subcategories
    const categoriesData = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: {
        parent: {
          exists: false,
        }
      },
      sort: "name"
    });

    // Get collections
    const collectionsData = await ctx.payload.find({
      collection: "productCollections",
      pagination: false,
    });

    const formattedCollectionData = collectionsData.docs.map(i => ({
      ...i,
      hero: i.hero as LayoutMedia | null
    }))



    const trendingCollections = formattedCollectionData.slice(0, 6); // First 3 collections
    const featuredCollections = formattedCollectionData.slice(0, 5); // First 3 collections
    const moreCollections = formattedCollectionData.slice(5, 12); // Rest of collections


    // Transform categories into navigation format
    const categoriesForNav = {
      id: 1,
      label: "Products",
      value: "new-arrivals",
      children: {
        links: {
          "categories": [
            {
              id: 121221,
              label: "All Products",
              value: "allproducts",
              href: PAGES_LINKS.products.link
            },
            ...(categoriesData?.docs.slice(0, 9) ?? []).map((cat, index) => ({
              id: (index + 1) * 10,
              label: (cat as Category).name,
              value: (cat as Category).slug,
              href: cat.slug === "all" ? "/products" : generateCategoryLink(cat.slug)
            }))],
          "trending": (trendingCollections ?? []).map((col, index) => ({
            id: (index + 1) * 100,
            label: (col as ProductCollection).title,
            value: (col as ProductCollection).slug,
            href: generateCollectionLink(col.slug)
          }))
        },
        featured: [
          {
            id: 8,
            label: featuredCollections[0]?.title,
            href: generateCollectionLink(featuredCollections[0]?.slug || ""),
            imageSrc: featuredCollections[0]?.hero?.url || "/images/stock1.jpg"
          },
          {
            id: 9,
            label: featuredCollections[1]?.title,
            href: generateCollectionLink(featuredCollections[1]?.slug || ""),
            imageSrc: featuredCollections[1]?.hero?.url || "/images/stock2.jpg"
          },
          {
            id: 10,
            label: featuredCollections[2]?.title,
            href: generateCollectionLink(featuredCollections[2]?.slug || ""),
            imageSrc: featuredCollections[2]?.hero?.url || "/images/stock3.jpg"
          },
        ]
      }
    }

    // Transform collections into navigation format
    const collectionsForNav = {
      id: 2,
      label: "Collections",
      value: "collections",
      children: {
        links: {
          "featured": [
            {
              id: 7676876,
              label: "All Collections",
              value: "allcollections",
              href: PAGES_LINKS.collections.link
            },
            ...(featuredCollections ?? []).map((col, index) => ({
              id: (index + 1) * 1000,
              label: (col as ProductCollection).title as string,
              value: (col as ProductCollection).slug as string,
              href: generateCollectionLink(col.slug)
            }))],
          "more": (moreCollections ?? []).map((col, index) => ({
            id: (index + 1) * 10000,
            label: (col as ProductCollection).title as string,
            value: (col as ProductCollection).slug as string,
            href: generateCollectionLink(col.slug)
          })),
        },
        featured: [
          {
            id: 3,
            label: featuredCollections[3]?.title,
            href: generateCollectionLink(featuredCollections[3]?.slug || ""),
            imageSrc: featuredCollections[3]?.hero?.url || "/images/stock4.jpg"
          },
          {
            id: 4,
            label: featuredCollections[4]?.title,
            href: generateCollectionLink(featuredCollections[4]?.slug || ""),
            imageSrc: featuredCollections[4]?.hero?.url || "/images/stock5.jpg"
          },
        ]
      }
    };

    // Static navigation items (same as original)
    const staticNavItems = [
      {
        id: 5,
        label: "Look Book",
        value: "lookbook",
        href: `${PAGES_LINKS.lookbook.link}`
      },
      {
        id: 7,
        label: "About",
        value: "about",
        href: `${PAGES_LINKS.about.link}`
      },
      {
        id: 6,
        label: "Contact Us",
        value: "contact",
        href: `${PAGES_LINKS.contact.link}`
      },
    ];

    return [categoriesForNav, collectionsForNav, ...staticNavItems] as INavItem[];
  }),

  getHero: baseProcedure
    .input(
      z.object({
        slug: z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "heros",
        depth: 2,
        where: {
          slug: {
            equals: input.slug
          }
        }
      })
      const docs = data.docs.map((doc) => ({
        ...doc,
        hero: doc.hero as LayoutMedia | null,
      }))
      const resDoc = docs.length > 0 ? docs[0] : null


      return {
        ...data,
        docs: resDoc
      }
    })
})