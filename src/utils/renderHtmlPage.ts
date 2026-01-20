// =============================================================================
// HTML PAGE RENDERER
// Rendert einzelne Seiten als vollständiges HTML
// =============================================================================

import { Page, ProjectData, Section } from "../types/project";
import { buildNavigation } from "./navigation";

// =============================================================================
// SECTION RENDERERS
// =============================================================================

const renderHeroSection = (section: Section): string => {
  const { headline, subheadline, buttonText, buttonLink } = section.content;
  
  return `
  <section class="section-hero" id="${section.id}">
    <div class="section-hero-inner">
      <h1>${escapeHtml(headline || "")}</h1>
      <p>${escapeHtml(subheadline || "")}</p>
      ${buttonText ? `<a href="${escapeHtml(buttonLink || "#")}" class="btn btn-primary">${escapeHtml(buttonText)}</a>` : ""}
    </div>
  </section>`;
};

const renderServicesSection = (section: Section): string => {
  const { title, service1Title, service1Desc, service2Title, service2Desc, service3Title, service3Desc } = section.content;
  
  const services = [
    { title: service1Title, desc: service1Desc },
    { title: service2Title, desc: service2Desc },
    { title: service3Title, desc: service3Desc },
  ].filter(s => s.title);
  
  return `
  <section class="section-services" id="${section.id}">
    <div class="section-services-inner">
      <h2>${escapeHtml(title || "Unsere Leistungen")}</h2>
      <div class="services-grid">
        ${services.map(s => `
        <div class="service-card">
          <h3>${escapeHtml(s.title || "")}</h3>
          <p>${escapeHtml(s.desc || "")}</p>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
};

const renderAboutSection = (section: Section): string => {
  const { title, text } = section.content;
  
  return `
  <section class="section-about" id="${section.id}">
    <div class="section-about-inner">
      <h2>${escapeHtml(title || "Über uns")}</h2>
      <p>${escapeHtml(text || "")}</p>
    </div>
  </section>`;
};

const renderContactSection = (section: Section): string => {
  const { title, phone, email, address } = section.content;
  
  return `
  <section class="section-contact" id="kontakt">
    <div class="section-contact-inner">
      <h2>${escapeHtml(title || "Kontakt")}</h2>
      <div class="contact-info">
        ${phone ? `<p>Telefon: <a href="tel:${escapeHtml(phone.replace(/\s/g, ""))}">${escapeHtml(phone)}</a></p>` : ""}
        ${email ? `<p>E-Mail: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` : ""}
        ${address ? `<p>${escapeHtml(address)}</p>` : ""}
      </div>
    </div>
  </section>`;
};

const renderTestimonialsSection = (section: Section): string => {
  const { title, quote1, author1, quote2, author2 } = section.content;
  
  const testimonials = [
    { quote: quote1, author: author1 },
    { quote: quote2, author: author2 },
  ].filter(t => t.quote);
  
  return `
  <section class="section-testimonials" id="${section.id}">
    <div class="section-testimonials-inner">
      <h2>${escapeHtml(title || "Das sagen unsere Kunden")}</h2>
      <div class="testimonials-grid">
        ${testimonials.map(t => `
        <div class="testimonial-card">
          <blockquote>"${escapeHtml(t.quote || "")}"</blockquote>
          <cite>– ${escapeHtml(t.author || "")}</cite>
        </div>`).join("")}
      </div>
    </div>
  </section>`;
};

const renderFaqSection = (section: Section): string => {
  const { title, question1, answer1, question2, answer2 } = section.content;
  
  const faqs = [
    { q: question1, a: answer1 },
    { q: question2, a: answer2 },
  ].filter(f => f.q);
  
  return `
  <section class="section-faq" id="${section.id}">
    <div class="section-faq-inner">
      <h2>${escapeHtml(title || "Häufige Fragen")}</h2>
      ${faqs.map(f => `
      <div class="faq-item">
        <h3>${escapeHtml(f.q || "")}</h3>
        <p>${escapeHtml(f.a || "")}</p>
      </div>`).join("")}
    </div>
  </section>`;
};

const renderCtaSection = (section: Section): string => {
  const { headline, text, buttonText, buttonLink } = section.content;
  
  return `
  <section class="section-cta" id="${section.id}">
    <div class="section-cta-inner">
      <h2>${escapeHtml(headline || "")}</h2>
      <p>${escapeHtml(text || "")}</p>
      ${buttonText ? `<a href="${escapeHtml(buttonLink || "#")}" class="btn btn-white">${escapeHtml(buttonText)}</a>` : ""}
    </div>
  </section>`;
};

const renderGallerySection = (section: Section): string => {
  const { title, description } = section.content;
  
  return `
  <section class="section-about" id="${section.id}">
    <div class="section-about-inner">
      <h2>${escapeHtml(title || "Galerie")}</h2>
      <p>${escapeHtml(description || "")}</p>
    </div>
  </section>`;
};

// =============================================================================
// MAIN RENDERER
// =============================================================================

const renderSection = (section: Section): string => {
  switch (section.type) {
    case "hero":
      return renderHeroSection(section);
    case "services":
      return renderServicesSection(section);
    case "about":
      return renderAboutSection(section);
    case "contact":
      return renderContactSection(section);
    case "testimonials":
      return renderTestimonialsSection(section);
    case "faq":
      return renderFaqSection(section);
    case "cta":
      return renderCtaSection(section);
    case "gallery":
      return renderGallerySection(section);
    default:
      return "";
  }
};

const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const renderHtmlPage = (page: Page, project: ProjectData): string => {
  const navigation = buildNavigation(project.pages);
  const header = project.globalSections.header;
  const footer = project.globalSections.footer;
  
  // SEO values with fallbacks
  const seoTitle = page.seo?.title || page.title;
  const fullTitle = project.globalSeo.titleSuffix 
    ? `${seoTitle} ${project.globalSeo.titleSuffix}` 
    : seoTitle;
  const seoDescription = page.seo?.description || project.globalSeo.defaultDescription || "";
  const noindex = page.seo?.noindex;
  
  // Determine CSS path based on page location
  const cssPath = page.slug === "index" ? "styles.css" : "../styles.css";
  
  // Build navigation links
  const navLinks = navigation.map(item => {
    const href = page.slug === "index" 
      ? item.href 
      : (item.href === "index.html" ? "../index.html" : `../${item.href}`);
    return `<a href="${href}">${escapeHtml(item.label)}</a>`;
  }).join("");
  
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(fullTitle)}</title>
  ${seoDescription ? `<meta name="description" content="${escapeHtml(seoDescription)}">` : ""}
  ${noindex ? '<meta name="robots" content="noindex, nofollow">' : ""}
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(seoTitle)}">
  <meta property="og:description" content="${escapeHtml(seoDescription)}">
  <meta property="og:type" content="website">
  
  <link rel="stylesheet" href="${cssPath}">
</head>
<body>
  <header class="site-header">
    <div class="site-header-inner">
      <div class="site-logo">${escapeHtml(header.content.logoText || "")}</div>
      <nav class="site-nav">
        ${navLinks}
      </nav>
      ${header.content.phone ? `<div class="header-phone">${escapeHtml(header.content.phone)}</div>` : ""}
    </div>
  </header>

  <main>
    ${page.sections.map(renderSection).join("\n")}
  </main>

  <footer class="site-footer">
    <div class="site-footer-inner">
      <p>${escapeHtml(footer.content.copyright || "")}</p>
      ${footer.content.address ? `<p>${escapeHtml(footer.content.address)}</p>` : ""}
    </div>
  </footer>
</body>
</html>`;
};
