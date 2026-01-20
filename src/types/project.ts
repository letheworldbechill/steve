// =============================================================================
// SMOOTH BUILDER PRO – TYPE DEFINITIONS
// Zentrales Datenmodell nach Steve Krug Prinzipien
// =============================================================================

export type SectionType =
  | "header"
  | "footer"
  | "hero"
  | "services"
  | "about"
  | "contact"
  | "testimonials"
  | "gallery"
  | "faq"
  | "cta";

export interface Section {
  id: string;
  type: SectionType;
  content: Record<string, string>;
}

export interface PageSeo {
  title?: string;
  description?: string;
  noindex?: boolean;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  order: number;
  isHome?: boolean;
  sections: Section[];
  seo?: PageSeo;
}

export interface GlobalSeo {
  titleSuffix?: string;
  defaultDescription?: string;
}

export type ThemePreset = "classic" | "modern" | "warm" | "elegant";

export interface ThemeConfig {
  preset: ThemePreset;
}

export interface HostingConfig {
  customDomain?: string;
}

export interface ProjectData {
  globalSections: {
    header: Section;
    footer: Section;
  };
  globalSeo: GlobalSeo;
  theme: ThemeConfig;
  hosting?: HostingConfig;
  pages: Page[];
}

export interface PublishedVersion {
  id: string;
  data: ProjectData;
  publishedAt: number;
}

export type PreviewMode = "draft" | "published";

export type FlowStep =
  | "start"
  | "inhalte"
  | "design"
  | "kontakt"
  | "veroeffentlichen";

// Navigation Item für automatisch generierte Navigation
export interface NavigationItem {
  label: string;
  href: string;
  pageId: string;
}
