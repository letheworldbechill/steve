// =============================================================================
// ZIP EXPORT
// Vollständiger Website-Export als ZIP-Datei
// =============================================================================

import JSZip from "jszip";
import { ProjectData } from "../types/project";
import { renderHtmlPage } from "./renderHtmlPage";
import { generateCss } from "./generateCss";
import { generateSitemap } from "./generateSitemap";
import { generateRobots } from "./generateRobots";

export const exportZip = async (project: ProjectData): Promise<void> => {
  const zip = new JSZip();
  
  // Get base URL for sitemap/robots
  const baseUrl = project.hosting?.customDomain 
    ? `https://${project.hosting.customDomain}` 
    : "";

  // ==========================================================================
  // CSS
  // ==========================================================================
  zip.file("styles.css", generateCss(project.theme.preset));

  // ==========================================================================
  // HTML PAGES
  // ==========================================================================
  const pagesFolder = zip.folder("pages");
  
  project.pages.forEach((page) => {
    const html = renderHtmlPage(page, project);
    
    if (page.slug === "index") {
      zip.file("index.html", html);
    } else {
      pagesFolder?.file(`${page.slug}.html`, html);
    }
  });

  // ==========================================================================
  // SEO FILES
  // ==========================================================================
  zip.file("sitemap.xml", generateSitemap(project.pages, baseUrl));
  zip.file("robots.txt", generateRobots(project.pages, baseUrl));

  // ==========================================================================
  // README
  // ==========================================================================
  const readme = `# Ihre Website

Diese Website wurde mit Smooth Builder Pro erstellt.

## Dateien

- index.html - Ihre Startseite
- pages/ - Weitere Seiten
- styles.css - Das Design Ihrer Website
- sitemap.xml - Für Suchmaschinen
- robots.txt - Für Suchmaschinen

## Veröffentlichen

1. Laden Sie alle Dateien auf Ihren Webserver hoch
2. Oder nutzen Sie einen Hosting-Dienst wie Netlify, Cloudflare Pages oder GitHub Pages

Bei Fragen wenden Sie sich an Ihren Webentwickler.
`;
  
  zip.file("README.md", readme);

  // ==========================================================================
  // GENERATE & DOWNLOAD
  // ==========================================================================
  const blob = await zip.generateAsync({ 
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 }
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "website.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
