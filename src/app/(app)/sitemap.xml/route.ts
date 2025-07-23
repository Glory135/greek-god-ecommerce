import { getQueryClient, trpc } from "@/trpc/server";
import { ProductType } from "@/modules/products/types";
import { ProductCollection } from "@/payload-types";

const BASE_URL = "https://www.greekgod.clothing";
const SITEMAP_LIMIT = 50;

export async function GET() {
  const queryClient = getQueryClient();
  const now = new Date().toISOString();

  // Fetch products and collections in parallel
  const [products, collections] = await Promise.all([
    queryClient.fetchQuery(
      trpc.products.getMany.queryOptions({ limit: SITEMAP_LIMIT, cursor: 1 })
    ),
    queryClient.fetchQuery(
      trpc.collections.getMany.queryOptions({ limit: SITEMAP_LIMIT, cursor: 1 })
    )
  ]);

  // Static routes
  const staticRoutes = [
    "",
    "about",
    "contact",
    "collections",
    "lookbook",
    "products"
  ];

  const urls = [
    // Static pages
    ...staticRoutes.map(path => {
      const url = path === "" ? `${BASE_URL}/` : `${BASE_URL}/${path}`;
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${now}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${path === "" ? "1.0" : "0.8"}</priority>
        </url>
      `.trim();
    }),

    // Product pages
    ...products.docs.map((product: ProductType) => `
      <url>
        <loc>${BASE_URL}/products/${product.id}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `.trim()),

    // Collection pages
    ...collections.docs.map((collection: ProductCollection) => `
      <url>
        <loc>${BASE_URL}/collections/${collection.slug}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `.trim()),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") +
    `\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
