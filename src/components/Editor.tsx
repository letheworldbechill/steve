// =============================================================================
// EDITOR COMPONENT
// Krug-konform: Nur das Nötigste sichtbar, Inline-Editing, klare Felder
// =============================================================================

import React from "react";
import { useProjectStore } from "../store/projectStore";
import { Input, Textarea } from "./ui/Input";
import { Section, SectionType, ThemePreset } from "../types/project";
import { themePresetInfo } from "../utils/themePresets";

// =============================================================================
// SECTION LABELS
// =============================================================================

const sectionLabels: Record<SectionType, string> = {
  header: "Header",
  footer: "Footer",
  hero: "Hero-Bereich",
  services: "Leistungen",
  about: "Über uns",
  contact: "Kontakt",
  testimonials: "Kundenstimmen",
  gallery: "Galerie",
  faq: "Häufige Fragen",
  cta: "Handlungsaufforderung",
};

// =============================================================================
// SECTION EDITOR
// =============================================================================

interface SectionEditorProps {
  section: Section;
  pageId: string;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  canRemove: boolean;
}

const SectionEditor: React.FC<SectionEditorProps> = ({
  section,
  pageId,
  onMoveUp,
  onMoveDown,
  onRemove,
  canMoveUp,
  canMoveDown,
  canRemove,
}) => {
  const updateContent = useProjectStore((s) => s.updateSectionContent);

  const renderFields = () => {
    switch (section.type) {
      case "hero":
        return (
          <>
            <Input
              label="Überschrift"
              value={section.content.headline || ""}
              onChange={(v) => updateContent(pageId, section.id, "headline", v)}
              placeholder="Ihre Hauptbotschaft"
            />
            <Textarea
              label="Beschreibung"
              value={section.content.subheadline || ""}
              onChange={(v) => updateContent(pageId, section.id, "subheadline", v)}
              placeholder="Kurze Beschreibung Ihres Angebots"
              rows={2}
            />
            <Input
              label="Button-Text"
              value={section.content.buttonText || ""}
              onChange={(v) => updateContent(pageId, section.id, "buttonText", v)}
              placeholder="z.B. Kontakt aufnehmen"
            />
            <Input
              label="Button-Link"
              value={section.content.buttonLink || ""}
              onChange={(v) => updateContent(pageId, section.id, "buttonLink", v)}
              placeholder="#kontakt"
              helpText="Für interne Links # verwenden, z.B. #kontakt"
            />
          </>
        );

      case "services":
        return (
          <>
            <Input
              label="Titel"
              value={section.content.title || ""}
              onChange={(v) => updateContent(pageId, section.id, "title", v)}
              placeholder="Unsere Leistungen"
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Leistung 1
            </div>
            <Input
              label="Titel"
              value={section.content.service1Title || ""}
              onChange={(v) => updateContent(pageId, section.id, "service1Title", v)}
              placeholder="Name der Leistung"
            />
            <Textarea
              label="Beschreibung"
              value={section.content.service1Desc || ""}
              onChange={(v) => updateContent(pageId, section.id, "service1Desc", v)}
              placeholder="Kurze Beschreibung"
              rows={2}
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Leistung 2
            </div>
            <Input
              label="Titel"
              value={section.content.service2Title || ""}
              onChange={(v) => updateContent(pageId, section.id, "service2Title", v)}
              placeholder="Name der Leistung"
            />
            <Textarea
              label="Beschreibung"
              value={section.content.service2Desc || ""}
              onChange={(v) => updateContent(pageId, section.id, "service2Desc", v)}
              placeholder="Kurze Beschreibung"
              rows={2}
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Leistung 3
            </div>
            <Input
              label="Titel"
              value={section.content.service3Title || ""}
              onChange={(v) => updateContent(pageId, section.id, "service3Title", v)}
              placeholder="Name der Leistung"
            />
            <Textarea
              label="Beschreibung"
              value={section.content.service3Desc || ""}
              onChange={(v) => updateContent(pageId, section.id, "service3Desc", v)}
              placeholder="Kurze Beschreibung"
              rows={2}
            />
          </>
        );

      case "about":
        return (
          <>
            <Input
              label="Titel"
              value={section.content.title || ""}
              onChange={(v) => updateContent(pageId, section.id, "title", v)}
              placeholder="Über uns"
            />
            <Textarea
              label="Text"
              value={section.content.text || ""}
              onChange={(v) => updateContent(pageId, section.id, "text", v)}
              placeholder="Erzählen Sie Ihre Geschichte..."
              rows={5}
            />
          </>
        );

      case "contact":
        return (
          <>
            <Input
              label="Titel"
              value={section.content.title || ""}
              onChange={(v) => updateContent(pageId, section.id, "title", v)}
              placeholder="Kontakt"
            />
            <Input
              label="Telefon"
              value={section.content.phone || ""}
              onChange={(v) => updateContent(pageId, section.id, "phone", v)}
              placeholder="031 123 45 67"
              type="tel"
            />
            <Input
              label="E-Mail"
              value={section.content.email || ""}
              onChange={(v) => updateContent(pageId, section.id, "email", v)}
              placeholder="info@firma.ch"
              type="email"
            />
            <Textarea
              label="Adresse"
              value={section.content.address || ""}
              onChange={(v) => updateContent(pageId, section.id, "address", v)}
              placeholder="Musterstrasse 1, 3000 Bern"
              rows={2}
            />
          </>
        );

      case "testimonials":
        return (
          <>
            <Input
              label="Titel"
              value={section.content.title || ""}
              onChange={(v) => updateContent(pageId, section.id, "title", v)}
              placeholder="Das sagen unsere Kunden"
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Kundenstimme 1
            </div>
            <Textarea
              label="Zitat"
              value={section.content.quote1 || ""}
              onChange={(v) => updateContent(pageId, section.id, "quote1", v)}
              placeholder="Was sagt der Kunde?"
              rows={2}
            />
            <Input
              label="Name"
              value={section.content.author1 || ""}
              onChange={(v) => updateContent(pageId, section.id, "author1", v)}
              placeholder="Max Mustermann"
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Kundenstimme 2
            </div>
            <Textarea
              label="Zitat"
              value={section.content.quote2 || ""}
              onChange={(v) => updateContent(pageId, section.id, "quote2", v)}
              placeholder="Was sagt der Kunde?"
              rows={2}
            />
            <Input
              label="Name"
              value={section.content.author2 || ""}
              onChange={(v) => updateContent(pageId, section.id, "author2", v)}
              placeholder="Anna Beispiel"
            />
          </>
        );

      case "faq":
        return (
          <>
            <Input
              label="Titel"
              value={section.content.title || ""}
              onChange={(v) => updateContent(pageId, section.id, "title", v)}
              placeholder="Häufige Fragen"
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Frage 1
            </div>
            <Input
              label="Frage"
              value={section.content.question1 || ""}
              onChange={(v) => updateContent(pageId, section.id, "question1", v)}
              placeholder="Wie erreiche ich Sie?"
            />
            <Textarea
              label="Antwort"
              value={section.content.answer1 || ""}
              onChange={(v) => updateContent(pageId, section.id, "answer1", v)}
              placeholder="Ihre Antwort..."
              rows={2}
            />
            <div style={{ marginTop: 16, marginBottom: 8, fontWeight: 500, fontSize: 13, color: "#6b7280" }}>
              Frage 2
            </div>
            <Input
              label="Frage"
              value={section.content.question2 || ""}
              onChange={(v) => updateContent(pageId, section.id, "question2", v)}
              placeholder="Was kostet Ihr Service?"
            />
            <Textarea
              label="Antwort"
              value={section.content.answer2 || ""}
              onChange={(v) => updateContent(pageId, section.id, "answer2", v)}
              placeholder="Ihre Antwort..."
              rows={2}
            />
          </>
        );

      case "cta":
        return (
          <>
            <Input
              label="Überschrift"
              value={section.content.headline || ""}
              onChange={(v) => updateContent(pageId, section.id, "headline", v)}
              placeholder="Bereit loszulegen?"
            />
            <Textarea
              label="Text"
              value={section.content.text || ""}
              onChange={(v) => updateContent(pageId, section.id, "text", v)}
              placeholder="Kontaktieren Sie uns noch heute!"
              rows={2}
            />
            <Input
              label="Button-Text"
              value={section.content.buttonText || ""}
              onChange={(v) => updateContent(pageId, section.id, "buttonText", v)}
              placeholder="Jetzt anfragen"
            />
            <Input
              label="Button-Link"
              value={section.content.buttonLink || ""}
              onChange={(v) => updateContent(pageId, section.id, "buttonLink", v)}
              placeholder="#kontakt"
            />
          </>
        );

      case "gallery":
        return (
          <>
            <Input
              label="Titel"
              value={section.content.title || ""}
              onChange={(v) => updateContent(pageId, section.id, "title", v)}
              placeholder="Galerie"
            />
            <Textarea
              label="Beschreibung"
              value={section.content.description || ""}
              onChange={(v) => updateContent(pageId, section.id, "description", v)}
              placeholder="Eindrücke unserer Arbeit"
              rows={2}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        padding: 20,
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>
          {sectionLabels[section.type] || section.type}
        </h3>
        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={onMoveUp}
            disabled={!canMoveUp}
            style={{
              padding: "4px 8px",
              fontSize: 12,
              border: "1px solid #e5e7eb",
              borderRadius: 4,
              background: "#fff",
              cursor: canMoveUp ? "pointer" : "not-allowed",
              opacity: canMoveUp ? 1 : 0.4,
            }}
            title="Nach oben"
          >
            ↑
          </button>
          <button
            onClick={onMoveDown}
            disabled={!canMoveDown}
            style={{
              padding: "4px 8px",
              fontSize: 12,
              border: "1px solid #e5e7eb",
              borderRadius: 4,
              background: "#fff",
              cursor: canMoveDown ? "pointer" : "not-allowed",
              opacity: canMoveDown ? 1 : 0.4,
            }}
            title="Nach unten"
          >
            ↓
          </button>
          <button
            onClick={onRemove}
            disabled={!canRemove}
            style={{
              padding: "4px 8px",
              fontSize: 12,
              border: "1px solid #fecaca",
              borderRadius: 4,
              background: "#fef2f2",
              color: "#dc2626",
              cursor: canRemove ? "pointer" : "not-allowed",
              opacity: canRemove ? 1 : 0.4,
            }}
            title="Entfernen"
          >
            ×
          </button>
        </div>
      </div>
      {renderFields()}
    </div>
  );
};

// =============================================================================
// PAGE SEO EDITOR
// =============================================================================

const PageSeoEditor: React.FC<{ pageId: string }> = ({ pageId }) => {
  const page = useProjectStore((s) =>
    s.draft.pages.find((p) => p.id === pageId)
  );
  const updateSeo = useProjectStore((s) => s.updatePageSeo);

  if (!page) return null;

  return (
    <details style={{ marginTop: 24 }}>
      <summary
        style={{
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 14,
          color: "#374151",
          padding: "12px 0",
        }}
      >
        🔍 Suchmaschinen (SEO) – optional
      </summary>
      <div
        style={{
          padding: 16,
          backgroundColor: "#f9fafb",
          borderRadius: 8,
          marginTop: 8,
        }}
      >
        <Input
          label="SEO-Titel"
          value={page.seo?.title || ""}
          onChange={(v) => updateSeo(pageId, "title", v)}
          placeholder={page.title}
          helpText="Wird in Google angezeigt (falls gesetzt)"
        />
        <Textarea
          label="Meta-Beschreibung"
          value={page.seo?.description || ""}
          onChange={(v) => updateSeo(pageId, "description", v)}
          placeholder="Kurze Beschreibung für Suchmaschinen"
          rows={2}
          helpText="Max. 160 Zeichen empfohlen"
        />
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 12,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={page.seo?.noindex || false}
            onChange={(e) => updateSeo(pageId, "noindex", e.target.checked)}
          />
          Seite nicht von Suchmaschinen indexieren
        </label>
      </div>
    </details>
  );
};

// =============================================================================
// PAGE DETAILS EDITOR
// =============================================================================

const PageDetailsEditor: React.FC<{ pageId: string }> = ({ pageId }) => {
  const page = useProjectStore((s) =>
    s.draft.pages.find((p) => p.id === pageId)
  );
  const updateTitle = useProjectStore((s) => s.updatePageTitle);
  const updateSlug = useProjectStore((s) => s.updatePageSlug);

  if (!page) return null;

  return (
    <div
      style={{
        padding: 16,
        backgroundColor: "#f9fafb",
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <Input
        label="Seitenname"
        value={page.title}
        onChange={(v) => updateTitle(pageId, v)}
        placeholder="Name der Seite"
      />
      {!page.isHome && (
        <Input
          label="Seitenadresse (URL)"
          value={page.slug}
          onChange={(v) => updateSlug(pageId, v)}
          placeholder="seiten-adresse"
          helpText={`Ihre Seite wird unter /pages/${page.slug}.html erreichbar sein`}
        />
      )}
    </div>
  );
};

// =============================================================================
// GLOBAL HEADER EDITOR
// =============================================================================

const GlobalHeaderEditor: React.FC = () => {
  const header = useProjectStore((s) => s.draft.globalSections.header);
  const update = useProjectStore((s) => s.updateGlobalSectionContent);

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        Header (alle Seiten)
      </h2>
      <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
        Diese Einstellungen gelten für alle Seiten Ihrer Website.
      </p>
      <div
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
        }}
      >
        <Input
          label="Firmenname / Logo-Text"
          value={header.content.logoText || ""}
          onChange={(v) => update("header", "logoText", v)}
          placeholder="Meine Firma"
        />
        <Input
          label="Telefonnummer (im Header)"
          value={header.content.phone || ""}
          onChange={(v) => update("header", "phone", v)}
          placeholder="031 123 45 67"
          type="tel"
          helpText="Wird oben rechts im Header angezeigt"
        />
      </div>
    </div>
  );
};

// =============================================================================
// GLOBAL FOOTER EDITOR
// =============================================================================

const GlobalFooterEditor: React.FC = () => {
  const footer = useProjectStore((s) => s.draft.globalSections.footer);
  const update = useProjectStore((s) => s.updateGlobalSectionContent);

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        Footer (alle Seiten)
      </h2>
      <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
        Diese Einstellungen gelten für alle Seiten Ihrer Website.
      </p>
      <div
        style={{
          padding: 20,
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
        }}
      >
        <Input
          label="Copyright-Text"
          value={footer.content.copyright || ""}
          onChange={(v) => update("footer", "copyright", v)}
          placeholder="© 2024 Meine Firma"
        />
        <Textarea
          label="Adresse"
          value={footer.content.address || ""}
          onChange={(v) => update("footer", "address", v)}
          placeholder="Musterstrasse 1, 3000 Bern"
          rows={2}
        />
      </div>
    </div>
  );
};

// =============================================================================
// THEME EDITOR
// =============================================================================

const ThemeEditor: React.FC = () => {
  const currentPreset = useProjectStore((s) => s.draft.theme.preset);
  const setPreset = useProjectStore((s) => s.setThemePreset);

  const presets: ThemePreset[] = ["classic", "modern", "warm", "elegant"];

  return (
    <div style={{ marginTop: 32 }}>
      <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>
        🎨 Design-Stil
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {presets.map((preset) => (
          <div
            key={preset}
            onClick={() => setPreset(preset)}
            style={{
              padding: 16,
              borderRadius: 8,
              border:
                currentPreset === preset
                  ? "2px solid #4f46e5"
                  : "1px solid #e5e7eb",
              backgroundColor:
                currentPreset === preset ? "#eef2ff" : "#ffffff",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14 }}>
              {themePresetInfo[preset].title}
            </div>
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              {themePresetInfo[preset].description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN EDITOR COMPONENT
// =============================================================================

export const Editor: React.FC = () => {
  const currentPageId = useProjectStore((s) => s.currentPageId);
  const draft = useProjectStore((s) => s.draft);
  const moveSectionUp = useProjectStore((s) => s.moveSectionUp);
  const moveSectionDown = useProjectStore((s) => s.moveSectionDown);
  const removeSection = useProjectStore((s) => s.removeSectionFromPage);

  // Global Section Editors
  if (currentPageId === "GLOBAL_HEADER") {
    return (
      <main
        style={{
          flex: 1,
          padding: 24,
          overflowY: "auto",
          backgroundColor: "#f9fafb",
        }}
      >
        <GlobalHeaderEditor />
        <ThemeEditor />
      </main>
    );
  }

  if (currentPageId === "GLOBAL_FOOTER") {
    return (
      <main
        style={{
          flex: 1,
          padding: 24,
          overflowY: "auto",
          backgroundColor: "#f9fafb",
        }}
      >
        <GlobalFooterEditor />
      </main>
    );
  }

  // Page Editor
  const page = draft.pages.find((p) => p.id === currentPageId);

  if (!page) {
    return (
      <main
        style={{
          flex: 1,
          padding: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#6b7280",
        }}
      >
        Wählen Sie eine Seite aus der Seitenleiste
      </main>
    );
  }

  return (
    <main
      style={{
        flex: 1,
        padding: 24,
        overflowY: "auto",
        backgroundColor: "#f9fafb",
      }}
    >
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        {page.title}
      </h2>
      <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
        Bearbeiten Sie die Inhalte dieser Seite
      </p>

      <PageDetailsEditor pageId={currentPageId} />

      {page.sections.map((section, index) => (
        <SectionEditor
          key={section.id}
          section={section}
          pageId={currentPageId}
          onMoveUp={() => moveSectionUp(currentPageId, section.id)}
          onMoveDown={() => moveSectionDown(currentPageId, section.id)}
          onRemove={() => removeSection(currentPageId, section.id)}
          canMoveUp={index > 0}
          canMoveDown={index < page.sections.length - 1}
          canRemove={page.sections.length > 1}
        />
      ))}

      <PageSeoEditor pageId={currentPageId} />
    </main>
  );
};
