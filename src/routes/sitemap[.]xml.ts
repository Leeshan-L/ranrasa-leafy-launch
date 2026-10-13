import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/content/blog-posts";
import { SITE_URL } from "@/lib/seo";

// Served at /sitemap.xml and built on each request from the page list below
// plus src/content/blog-posts.ts, so new blog posts appear automatically.
// Add new top-level pages to `pages`.
const pages = ["/", "/about", "/blog", "/contact"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...pages.map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`),
          ...blogPosts.map((p) => `  <url><loc>${SITE_URL}/blog/${p.slug}</loc><lastmod>${p.date}</lastmod></url>`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
