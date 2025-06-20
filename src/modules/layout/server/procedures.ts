import { Category, Collection } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

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
      collection: "collections",
      pagination: false,
    });



    const trendingCollections = collectionsData.docs.slice(0, 6); // First 3 collections
    const featuredCollections = collectionsData.docs.slice(0, 8); // First 3 collections
    const moreCollections = collectionsData.docs.slice(8, 16); // Rest of collections


    // Transform categories into navigation format
    const categoriesForNav = {
      id: 1,
      label: "New Arrivals",
      value: "new-arrivals",
      children: {
        links: {
          "categories": (categoriesData?.docs.slice(0, 9) ?? []).map((cat, index) => ({
            id: (index + 1) * 10,
            label: (cat as Category).name,
            value: (cat as Category).slug,
            href: cat.slug === "all" ? "/products" : `/products?category=${cat.slug}`
          })),
          "trending": (trendingCollections ?? []).map((col, index) => ({
            id: (index + 1) * 100,
            label: (col as Collection).title,
            value: (col as Collection).slug,
            href: `/${col.slug}`
          }))
        },
        featured: [
          {
            id: 8,
            label: "Fall Collection",
            href: "#",
            imageSrc: "/images/stock1.jpg"
          },
          {
            id: 9,
            label: "Jackets",
            href: "#",
            imageSrc: "/images/stock2.jpg"
          },
          {
            id: 10,
            label: "Summer Collection",
            href: "#",
            imageSrc: "/images/stock3.jpg"
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
          "featured": (featuredCollections ?? []).map((col, index) => ({
            id: (index + 1) * 1000,
            label: (col as Collection).title,
            value: (col as Collection).slug,
            href: `/${col.slug}`
          })),
          "more": (moreCollections ?? []).map((col, index) => ({
            id: (index + 1) * 10000,
            label: (col as Collection).title,
            value: (col as Collection).slug,
            href: `/${col.slug}`
          })),
        },
        featured: [
          {
            id: 3,
            label: "Shirts",
            href: "#",
            imageSrc: "/images/stock4.jpg"
          },
          {
            id: 4,
            label: "Jackets",
            href: "#",
            imageSrc: "/images/stock5.jpg"
          },
        ]
      }
    };

    // Static navigation items (same as original)
    const staticNavItems = [
      {
        id: 5,
        label: "Trending",
        value: "trending",
        href: "/products?trending=true"
      },
      {
        id: 6,
        label: "Lookbook",
        value: "lookbook",
        href: "/lookbook"
      },
      {
        id: 7,
        label: "About",
        value: "about",
        href: "/about"
      }
    ];

    return [categoriesForNav, collectionsForNav, ...staticNavItems];
  })
})