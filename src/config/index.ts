export const NAV_ITEMS = [
    {
        id: 1,
        label: "New Arrivals",
        value: "new-arrivals" as const,
        children: {
            links: {
                "categories": [
                    {
                        id: 2,
                        label: "Shop All",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        id: 3,
                        label: "Shirts & Tops",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        id: 4,
                        label: "Tees",
                        value: "tees" as const,
                        href: "#"
                    },
                    {
                        id: 5,
                        label: "Pants",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        id: 6,
                        label: "Jackets and Out wears",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        id: 7,
                        label: "Pull overs",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        id: 8,
                        label: "Jump suits",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        id: 9,
                        label: "Shorts",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
                "trending": [
                    {
                        id: 10,
                        label: "Jackets",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        id: 11,
                        label: "Fall Collection",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        id: 12,
                        label: "Summer Collection",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
            },
            featured: [
                {
                    id: 13,
                    label: "Fall Collection",
                    href: "#",
                    imageSrc: "/images/stock1.jpg"
                },
                {
                    id: 14,
                    label: "Jackets",
                    href: "#",
                    imageSrc: "/images/stock2.jpg"
                },
                {
                    id: 15,
                    label: "Summer Collection",
                    href: "#",
                    imageSrc: "/images/stock3.jpg"
                },
            ]
        }
    },
    {
        id: 16,
        label: "Collections",
        value: "collections" as const,
        children: {
            links: {
                "featured": [
                    {
                        id: 17,
                        label: "Shop All",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        id: 18,
                        label: "Shirts & Tops",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
                "more": [
                    {
                        id: 19,
                        label: "Shop All",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        id: 20,
                        label: "Shirts & Tops",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
            },
            featured: [
                {
                    id: 21,
                    label: "Shirts",
                    href: "#",
                    imageSrc: "/images/stock4.jpg"
                },
                {
                    id: 22,
                    label: "Jackets",
                    href: "#",
                    imageSrc: "/images/stock5.jpg"
                },
            ]
        }
    },
    {
        id: 23,
        label: "Trending",
        value: "trending" as const,
        href: "#"
    },
    {
        id: 24,
        label: "Lookbook",
        value: "bands" as const,
        href: "#"
    },
    {
        id: 25,
        label: "About",
        value: "about" as const,
        href: "#"
    },
]