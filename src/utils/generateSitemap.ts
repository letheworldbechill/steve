// =============================================================================
// SITEMAP GENERATOR
// Automatische XML-Sitemap aus Seitenstruktur
// =============================================================================

import { Page } from "../types/project";

export const generateSitemap = (pages: Page[], baseUrl: string = ""): string => {
  const urls = pages
    .filter((page) => !page.seo?.noindex)
    .map((page) => {
      const loc = page.slug === "index" 
        ? baseUrl || "/" 
        : `${baseUrl}/pages/${page.slug}.html`;
      
      return `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.isHome ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};
