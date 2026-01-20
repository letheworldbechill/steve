// =============================================================================
// NAVIGATION UTILITY
// Automatisch generierte Navigation aus Seitenstruktur
// =============================================================================

import { Page, NavigationItem } from "../types/project";

export const buildNavigation = (pages: Page[]): NavigationItem[] => {
  return [...pages]
    .sort((a, b) => a.order - b.order)
    .map((page) => ({
      label: page.title,
      href: page.slug === "index" ? "index.html" : `pages/${page.slug}.html`,
      pageId: page.id,
    }));
};
