// =============================================================================
// ROBOTS.TXT GENERATOR
// Automatische robots.txt basierend auf Seiteneinstellungen
// =============================================================================

import { Page } from "../types/project";

export const generateRobots = (pages: Page[], baseUrl: string = ""): string => {
  const noindexPages = pages.filter((page) => page.seo?.noindex);
  
  const disallowRules = noindexPages
    .map((page) => {
      const path = page.slug === "index" 
        ? "/" 
        : `/pages/${page.slug}.html`;
      return `Disallow: ${path}`;
    })
    .join("\n");

  return `# Smooth Builder Pro - Generated robots.txt

User-agent: *
Allow: /
${disallowRules}

Sitemap: ${baseUrl}/sitemap.xml
`;
};
