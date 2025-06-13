export const NAV_ITEMS = [
    {
        label: "New Arrivals",
        value: "new-arrivals" as const,
        children: {
            links: {
                "categories": [
                    {
                        label: "Shop All",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        label: "Shirts & Tops",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        label: "Tees",
                        value: "tees" as const,
                        href: "#"
                    },
                    {
                        label: "Pants",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        label: "Jackets and Out wears",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        label: "Pull overs",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        label: "Jump suits",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        label: "Shorts",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
                "trending": [
                    {
                        label: "Jackets",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        label: "Fall Collection",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                    {
                        label: "Summer Collection",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
            },
            featured: [
                {
                    label: "Fall Collection",
                    href: "#",
                    imageSrc: "/images/stock1.jpg"
                },
                {
                    label: "Jackets",
                    href: "#",
                    imageSrc: "/images/stock2.jpg"
                },
                {
                    label: "Summer Collection",
                    href: "#",
                    imageSrc: "/images/stock3.jpg"
                },
            ]
        }
    },
    {
        label: "Collections",
        value: "collections" as const,
        children: {
            links: {
                "featured": [
                    {
                        label: "Shop All",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        label: "Shirts & Tops",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
                "more": [
                    {
                        label: "Shop All",
                        value: "shop-all" as const,
                        href: "#"
                    },
                    {
                        label: "Shirts & Tops",
                        value: "shirts-and-tops" as const,
                        href: "#"
                    },
                ],
            },
            featured: [
                {
                    label: "Shirts",
                    href: "#",
                    imageSrc: "/images/stock4.jpg"
                },
                {
                    label: "Jackets",
                    href: "#",
                    imageSrc: "/images/stock5.jpg"
                },
            ]
        }
    },
    {
        label: "Trending",
        value: "trending" as const,
        href: "#"
    },
    {
        label: "Lookbook",
        value: "bands" as const,
        href: "#"
    },
    {
        label: "Trending",
        value: "bands" as const,
        href: "#"
    },
]