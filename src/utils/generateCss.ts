// =============================================================================
// CSS GENERATOR
// Dynamische CSS-Generierung basierend auf Theme-Preset
// =============================================================================

import { ThemePreset } from "../types/project";
import { themePresets } from "./themePresets";

export const generateCss = (preset: ThemePreset): string => {
  const theme = themePresets[preset];

  return `/* Smooth Builder Pro - Generated CSS */
/* Theme: ${preset} */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: ${theme.fontFamily};
  color: ${theme.textColor};
  background-color: ${theme.backgroundColor};
  line-height: 1.6;
  font-size: 16px;
}

a {
  color: ${theme.accentColor};
  text-decoration: none;
  transition: opacity 0.2s ease;
}

a:hover {
  opacity: 0.8;
}

img {
  max-width: 100%;
  height: auto;
}

/* =============================================================================
   HEADER
   ============================================================================= */

.site-header {
  background: ${theme.backgroundColor};
  border-bottom: 1px solid ${theme.primaryColor}15;
  padding: 16px 24px;
  position: sticky;
  top: 0;
  z-index: 100;
}

.site-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.site-logo {
  font-size: 20px;
  font-weight: 700;
  color: ${theme.primaryColor};
}

.site-nav {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.site-nav a {
  color: ${theme.secondaryColor};
  font-weight: 500;
  font-size: 14px;
}

.site-nav a:hover {
  color: ${theme.primaryColor};
}

.header-phone {
  color: ${theme.primaryColor};
  font-weight: 600;
}

/* =============================================================================
   HERO SECTION
   ============================================================================= */

.section-hero {
  padding: 80px 24px;
  text-align: center;
  background: linear-gradient(180deg, ${theme.backgroundColor} 0%, ${theme.primaryColor}08 100%);
}

.section-hero-inner {
  max-width: 800px;
  margin: 0 auto;
}

.section-hero h1 {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  color: ${theme.primaryColor};
  margin-bottom: 16px;
  line-height: 1.2;
}

.section-hero p {
  font-size: 18px;
  color: ${theme.secondaryColor};
  margin-bottom: 32px;
}

/* =============================================================================
   SERVICES SECTION
   ============================================================================= */

.section-services {
  padding: 64px 24px;
  background: ${theme.backgroundColor};
}

.section-services-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.section-services h2 {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: ${theme.primaryColor};
  margin-bottom: 48px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

.service-card {
  padding: 32px;
  background: ${theme.backgroundColor};
  border: 1px solid ${theme.primaryColor}15;
  border-radius: ${theme.borderRadius};
  transition: box-shadow 0.2s ease;
}

.service-card:hover {
  box-shadow: 0 4px 12px ${theme.primaryColor}10;
}

.service-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: ${theme.primaryColor};
  margin-bottom: 12px;
}

.service-card p {
  color: ${theme.secondaryColor};
  font-size: 15px;
}

/* =============================================================================
   ABOUT SECTION
   ============================================================================= */

.section-about {
  padding: 64px 24px;
  background: ${theme.primaryColor}05;
}

.section-about-inner {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.section-about h2 {
  font-size: 32px;
  font-weight: 700;
  color: ${theme.primaryColor};
  margin-bottom: 24px;
}

.section-about p {
  font-size: 17px;
  color: ${theme.secondaryColor};
  line-height: 1.8;
}

/* =============================================================================
   CONTACT SECTION
   ============================================================================= */

.section-contact {
  padding: 64px 24px;
  background: ${theme.backgroundColor};
}

.section-contact-inner {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.section-contact h2 {
  font-size: 32px;
  font-weight: 700;
  color: ${theme.primaryColor};
  margin-bottom: 32px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-info p {
  font-size: 17px;
  color: ${theme.secondaryColor};
}

.contact-info a {
  color: ${theme.accentColor};
  font-weight: 500;
}

/* =============================================================================
   TESTIMONIALS SECTION
   ============================================================================= */

.section-testimonials {
  padding: 64px 24px;
  background: ${theme.primaryColor}05;
}

.section-testimonials-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.section-testimonials h2 {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: ${theme.primaryColor};
  margin-bottom: 48px;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.testimonial-card {
  padding: 32px;
  background: ${theme.backgroundColor};
  border-radius: ${theme.borderRadius};
  box-shadow: 0 2px 8px ${theme.primaryColor}08;
}

.testimonial-card blockquote {
  font-size: 16px;
  font-style: italic;
  color: ${theme.secondaryColor};
  margin-bottom: 16px;
  line-height: 1.7;
}

.testimonial-card cite {
  font-style: normal;
  font-weight: 600;
  color: ${theme.primaryColor};
}

/* =============================================================================
   FAQ SECTION
   ============================================================================= */

.section-faq {
  padding: 64px 24px;
  background: ${theme.backgroundColor};
}

.section-faq-inner {
  max-width: 800px;
  margin: 0 auto;
}

.section-faq h2 {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: ${theme.primaryColor};
  margin-bottom: 48px;
}

.faq-item {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.primaryColor}10;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-item h3 {
  font-size: 18px;
  font-weight: 600;
  color: ${theme.primaryColor};
  margin-bottom: 12px;
}

.faq-item p {
  color: ${theme.secondaryColor};
  line-height: 1.7;
}

/* =============================================================================
   CTA SECTION
   ============================================================================= */

.section-cta {
  padding: 64px 24px;
  background: ${theme.accentColor};
  text-align: center;
}

.section-cta-inner {
  max-width: 600px;
  margin: 0 auto;
}

.section-cta h2 {
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
}

.section-cta p {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
}

/* =============================================================================
   BUTTONS
   ============================================================================= */

.btn {
  display: inline-block;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: ${theme.accentColor};
  color: #ffffff;
}

.btn-primary:hover {
  background: ${theme.primaryColor};
  opacity: 1;
}

.btn-secondary {
  background: ${theme.backgroundColor};
  color: ${theme.primaryColor};
  border: 2px solid ${theme.primaryColor};
}

.btn-secondary:hover {
  background: ${theme.primaryColor};
  color: ${theme.backgroundColor};
}

.btn-white {
  background: #ffffff;
  color: ${theme.accentColor};
}

.btn-white:hover {
  background: ${theme.backgroundColor};
  opacity: 1;
}

/* =============================================================================
   FOOTER
   ============================================================================= */

.site-footer {
  padding: 48px 24px;
  background: ${theme.primaryColor};
  color: rgba(255, 255, 255, 0.8);
}

.site-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.site-footer p {
  margin-bottom: 8px;
}

.site-footer a {
  color: rgba(255, 255, 255, 0.9);
}

/* =============================================================================
   RESPONSIVE
   ============================================================================= */

@media (max-width: 768px) {
  .site-header-inner {
    flex-direction: column;
    text-align: center;
  }
  
  .site-nav {
    justify-content: center;
  }
  
  .section-hero {
    padding: 48px 16px;
  }
  
  .section-hero h1 {
    font-size: 28px;
  }
}
`;
};
