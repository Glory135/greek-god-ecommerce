export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return {
    rules: {
      userAgent: '*',
      allow: ['/', "/products", "/collections", "/lookbook", "/about", "/contact"],
      disallow: ["/account", "/admin"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}