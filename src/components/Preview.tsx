// =============================================================================
// PREVIEW COMPONENT
// Krug-konform: Zeigt echtes Ergebnis, Navigation klickbar
// =============================================================================

import React from "react";
import { useProjectStore } from "../store/projectStore";
import { buildNavigation } from "../utils/navigation";
import { themePresets } from "../utils/themePresets";
import { Section } from "../types/project";

// =============================================================================
// SECTION PREVIEW COMPONENTS
// =============================================================================

const HeroPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => (
  <section
    style={{
      padding: "60px 24px",
      textAlign: "center",
      background: `linear-gradient(180deg, ${theme.backgroundColor} 0%, ${theme.primaryColor}08 100%)`,
    }}
  >
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: theme.primaryColor,
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {section.content.headline || "Überschrift"}
      </h1>
      <p
        style={{
          fontSize: 17,
          color: theme.secondaryColor,
          marginBottom: 24,
        }}
      >
        {section.content.subheadline || "Beschreibung"}
      </p>
      {section.content.buttonText && (
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: theme.accentColor,
            color: "#fff",
            border: "none",
            borderRadius: theme.borderRadius,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {section.content.buttonText}
        </button>
      )}
    </div>
  </section>
);

const ServicesPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => {
  const services = [
    { title: section.content.service1Title, desc: section.content.service1Desc },
    { title: section.content.service2Title, desc: section.content.service2Desc },
    { title: section.content.service3Title, desc: section.content.service3Desc },
  ].filter((s) => s.title);

  return (
    <section style={{ padding: "48px 24px", backgroundColor: theme.backgroundColor }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: theme.primaryColor,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {section.content.title || "Unsere Leistungen"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              style={{
                padding: 20,
                backgroundColor: theme.backgroundColor,
                border: `1px solid ${theme.primaryColor}15`,
                borderRadius: theme.borderRadius,
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.primaryColor,
                  marginBottom: 8,
                }}
              >
                {service.title}
              </h3>
              <p style={{ fontSize: 14, color: theme.secondaryColor }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => (
  <section
    style={{
      padding: "48px 24px",
      backgroundColor: `${theme.primaryColor}05`,
    }}
  >
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: theme.primaryColor,
          marginBottom: 16,
        }}
      >
        {section.content.title || "Über uns"}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: theme.secondaryColor,
          lineHeight: 1.7,
        }}
      >
        {section.content.text || ""}
      </p>
    </div>
  </section>
);

const ContactPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => (
  <section style={{ padding: "48px 24px", backgroundColor: theme.backgroundColor }}>
    <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: theme.primaryColor,
          marginBottom: 24,
        }}
      >
        {section.content.title || "Kontakt"}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {section.content.phone && (
          <p style={{ fontSize: 15, color: theme.secondaryColor }}>
            Telefon:{" "}
            <a href={`tel:${section.content.phone}`} style={{ color: theme.accentColor }}>
              {section.content.phone}
            </a>
          </p>
        )}
        {section.content.email && (
          <p style={{ fontSize: 15, color: theme.secondaryColor }}>
            E-Mail:{" "}
            <a href={`mailto:${section.content.email}`} style={{ color: theme.accentColor }}>
              {section.content.email}
            </a>
          </p>
        )}
        {section.content.address && (
          <p style={{ fontSize: 15, color: theme.secondaryColor }}>
            {section.content.address}
          </p>
        )}
      </div>
    </div>
  </section>
);

const TestimonialsPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => {
  const testimonials = [
    { quote: section.content.quote1, author: section.content.author1 },
    { quote: section.content.quote2, author: section.content.author2 },
  ].filter((t) => t.quote);

  return (
    <section
      style={{
        padding: "48px 24px",
        backgroundColor: `${theme.primaryColor}05`,
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: theme.primaryColor,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {section.content.title || "Das sagen unsere Kunden"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                padding: 24,
                backgroundColor: theme.backgroundColor,
                borderRadius: theme.borderRadius,
                boxShadow: `0 2px 8px ${theme.primaryColor}08`,
              }}
            >
              <blockquote
                style={{
                  fontSize: 14,
                  fontStyle: "italic",
                  color: theme.secondaryColor,
                  marginBottom: 12,
                  lineHeight: 1.6,
                }}
              >
                "{t.quote}"
              </blockquote>
              <cite
                style={{
                  fontStyle: "normal",
                  fontWeight: 600,
                  color: theme.primaryColor,
                  fontSize: 13,
                }}
              >
                – {t.author}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => {
  const faqs = [
    { q: section.content.question1, a: section.content.answer1 },
    { q: section.content.question2, a: section.content.answer2 },
  ].filter((f) => f.q);

  return (
    <section style={{ padding: "48px 24px", backgroundColor: theme.backgroundColor }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: theme.primaryColor,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {section.content.title || "Häufige Fragen"}
        </h2>
        {faqs.map((f, i) => (
          <div
            key={i}
            style={{
              marginBottom: 20,
              paddingBottom: 20,
              borderBottom: `1px solid ${theme.primaryColor}10`,
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: theme.primaryColor,
                marginBottom: 8,
              }}
            >
              {f.q}
            </h3>
            <p style={{ fontSize: 14, color: theme.secondaryColor, lineHeight: 1.6 }}>
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const CtaPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => (
  <section
    style={{
      padding: "48px 24px",
      backgroundColor: theme.accentColor,
      textAlign: "center",
    }}
  >
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 12,
        }}
      >
        {section.content.headline || "Bereit loszulegen?"}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "rgba(255,255,255,0.9)",
          marginBottom: 20,
        }}
      >
        {section.content.text || ""}
      </p>
      {section.content.buttonText && (
        <button
          style={{
            padding: "12px 24px",
            backgroundColor: "#fff",
            color: theme.accentColor,
            border: "none",
            borderRadius: theme.borderRadius,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {section.content.buttonText}
        </button>
      )}
    </div>
  </section>
);

const GalleryPreview: React.FC<{ section: Section; theme: typeof themePresets.classic }> = ({
  section,
  theme,
}) => (
  <section
    style={{
      padding: "48px 24px",
      backgroundColor: `${theme.primaryColor}05`,
      textAlign: "center",
    }}
  >
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <h2
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: theme.primaryColor,
          marginBottom: 16,
        }}
      >
        {section.content.title || "Galerie"}
      </h2>
      <p style={{ fontSize: 15, color: theme.secondaryColor }}>
        {section.content.description || ""}
      </p>
    </div>
  </section>
);

// =============================================================================
// SECTION RENDERER
// =============================================================================

const SectionPreview: React.FC<{
  section: Section;
  theme: typeof themePresets.classic;
}> = ({ section, theme }) => {
  switch (section.type) {
    case "hero":
      return <HeroPreview section={section} theme={theme} />;
    case "services":
      return <ServicesPreview section={section} theme={theme} />;
    case "about":
      return <AboutPreview section={section} theme={theme} />;
    case "contact":
      return <ContactPreview section={section} theme={theme} />;
    case "testimonials":
      return <TestimonialsPreview section={section} theme={theme} />;
    case "faq":
      return <FaqPreview section={section} theme={theme} />;
    case "cta":
      return <CtaPreview section={section} theme={theme} />;
    case "gallery":
      return <GalleryPreview section={section} theme={theme} />;
    default:
      return null;
  }
};

// =============================================================================
// MAIN PREVIEW COMPONENT
// =============================================================================

export const Preview: React.FC = () => {
  const draft = useProjectStore((s) => s.draft);
  const previewMode = useProjectStore((s) => s.previewMode);
  const publishedVersions = useProjectStore((s) => s.publishedVersions);
  const currentPageId = useProjectStore((s) => s.currentPageId);
  const setCurrentPage = useProjectStore((s) => s.setCurrentPage);
  const setPreviewMode = useProjectStore((s) => s.setPreviewMode);

  // Get data based on preview mode
  const data =
    previewMode === "published" && publishedVersions.length > 0
      ? publishedVersions[publishedVersions.length - 1].data
      : draft;

  const theme = themePresets[data.theme.preset];
  const navigation = buildNavigation(data.pages);
  const header = data.globalSections.header;
  const footer = data.globalSections.footer;

  // Get current page or first page
  let page = data.pages.find((p) => p.id === currentPageId);
  if (!page || currentPageId.startsWith("GLOBAL_")) {
    page = data.pages[0];
  }

  if (!page) {
    return (
      <aside
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3f4f6",
          color: "#6b7280",
        }}
      >
        Keine Seite vorhanden
      </aside>
    );
  }

  return (
    <aside
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e5e7eb",
        overflow: "hidden",
      }}
    >
      {/* Preview Mode Toggle */}
      <div
        style={{
          padding: "8px 16px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "#6b7280" }}>Vorschau</span>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => setPreviewMode("draft")}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              backgroundColor: previewMode === "draft" ? "#4f46e5" : "#f3f4f6",
              color: previewMode === "draft" ? "#fff" : "#374151",
            }}
          >
            Entwurf
          </button>
          <button
            onClick={() => setPreviewMode("published")}
            disabled={publishedVersions.length === 0}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              border: "none",
              borderRadius: 4,
              cursor:
                publishedVersions.length === 0 ? "not-allowed" : "pointer",
              backgroundColor:
                previewMode === "published" ? "#4f46e5" : "#f3f4f6",
              color: previewMode === "published" ? "#fff" : "#374151",
              opacity: publishedVersions.length === 0 ? 0.5 : 1,
            }}
          >
            Veröffentlicht
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 16,
        }}
      >
        <div
          style={{
            backgroundColor: theme.backgroundColor,
            fontFamily: theme.fontFamily,
            color: theme.textColor,
            borderRadius: 8,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            overflow: "hidden",
            minHeight: "100%",
          }}
        >
          {/* Header */}
          <header
            style={{
              backgroundColor: theme.backgroundColor,
              borderBottom: `1px solid ${theme.primaryColor}15`,
              padding: "12px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: theme.primaryColor,
              }}
            >
              {header.content.logoText || "Logo"}
            </div>
            <nav style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {navigation.map((item) => (
                <a
                  key={item.pageId}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(item.pageId);
                  }}
                  style={{
                    color: theme.secondaryColor,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            {header.content.phone && (
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.primaryColor,
                }}
              >
                {header.content.phone}
              </div>
            )}
          </header>

          {/* Page Content */}
          <main>
            {page.sections.map((section) => (
              <SectionPreview key={section.id} section={section} theme={theme} />
            ))}
          </main>

          {/* Footer */}
          <footer
            style={{
              backgroundColor: theme.primaryColor,
              color: "rgba(255,255,255,0.8)",
              padding: "32px 20px",
              textAlign: "center",
            }}
          >
            <p style={{ marginBottom: 6, fontSize: 14 }}>
              {footer.content.copyright || ""}
            </p>
            {footer.content.address && (
              <p style={{ fontSize: 13 }}>{footer.content.address}</p>
            )}
          </footer>
        </div>
      </div>
    </aside>
  );
};
