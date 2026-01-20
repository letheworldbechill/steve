// =============================================================================
// SIDEBAR COMPONENT
// Krug-konform: Max 6 sichtbare Aktionen, klare Hierarchie
// =============================================================================

import React, { useState } from "react";
import { useProjectStore } from "../store/projectStore";
import { Button } from "./ui/Button";
import { SectionType } from "../types/project";

export const Sidebar: React.FC = () => {
  const pages = useProjectStore((s) =>
    [...s.draft.pages].sort((a, b) => a.order - b.order)
  );
  const currentPageId = useProjectStore((s) => s.currentPageId);
  const setCurrentPage = useProjectStore((s) => s.setCurrentPage);
  const addPage = useProjectStore((s) => s.addPage);
  const removePage = useProjectStore((s) => s.removePage);
  const movePageUp = useProjectStore((s) => s.movePageUp);
  const movePageDown = useProjectStore((s) => s.movePageDown);

  const [showAddSection, setShowAddSection] = useState(false);
  const addSectionToPage = useProjectStore((s) => s.addSectionToPage);

  const sectionTypes: { type: SectionType; label: string }[] = [
    { type: "hero", label: "Hero-Bereich" },
    { type: "services", label: "Leistungen" },
    { type: "about", label: "Über uns" },
    { type: "contact", label: "Kontakt" },
    { type: "testimonials", label: "Kundenstimmen" },
    { type: "faq", label: "Häufige Fragen" },
    { type: "cta", label: "Handlungsaufforderung" },
    { type: "gallery", label: "Galerie" },
  ];

  const isGlobalSection = currentPageId === "GLOBAL_HEADER" || currentPageId === "GLOBAL_FOOTER";

  return (
    <aside
      style={{
        width: 260,
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* =================================================================
          GLOBAL SECTIONS
          ================================================================= */}
      <div style={{ padding: "16px 16px 8px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#9ca3af",
            marginBottom: 8,
          }}
        >
          Global
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <button
            onClick={() => setCurrentPage("GLOBAL_HEADER")}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 13,
              backgroundColor:
                currentPageId === "GLOBAL_HEADER" ? "#e0e7ff" : "transparent",
              color:
                currentPageId === "GLOBAL_HEADER" ? "#4338ca" : "#374151",
              fontWeight: currentPageId === "GLOBAL_HEADER" ? 500 : 400,
            }}
          >
            🏠 Header (alle Seiten)
          </button>
          <button
            onClick={() => setCurrentPage("GLOBAL_FOOTER")}
            style={{
              padding: "8px 12px",
              borderRadius: 6,
              border: "none",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 13,
              backgroundColor:
                currentPageId === "GLOBAL_FOOTER" ? "#e0e7ff" : "transparent",
              color:
                currentPageId === "GLOBAL_FOOTER" ? "#4338ca" : "#374151",
              fontWeight: currentPageId === "GLOBAL_FOOTER" ? 500 : 400,
            }}
          >
            📄 Footer (alle Seiten)
          </button>
        </div>
      </div>

      <div
        style={{
          height: 1,
          backgroundColor: "#e5e7eb",
          margin: "8px 16px",
        }}
      />

      {/* =================================================================
          PAGES LIST
          ================================================================= */}
      <div style={{ padding: "8px 16px", flex: 1, overflowY: "auto" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "#9ca3af",
            marginBottom: 8,
          }}
        >
          Seiten
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {pages.map((page, index) => (
            <div
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                backgroundColor:
                  currentPageId === page.id ? "#e0e7ff" : "transparent",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.1s ease",
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: currentPageId === page.id ? "#4338ca" : "#374151",
                  fontWeight: currentPageId === page.id ? 500 : 400,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {page.isHome ? "🏠" : "📄"}
                {page.title}
                {page.isHome && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "#9ca3af",
                      fontWeight: 400,
                    }}
                  >
                    (Start)
                  </span>
                )}
              </span>

              {!page.isHome && (
                <div
                  style={{ display: "flex", gap: 2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => movePageUp(page.id)}
                    disabled={index <= 1}
                    style={{
                      padding: "2px 6px",
                      fontSize: 12,
                      border: "none",
                      background: "transparent",
                      cursor: index <= 1 ? "not-allowed" : "pointer",
                      opacity: index <= 1 ? 0.3 : 1,
                      color: "#6b7280",
                    }}
                    title="Nach oben"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => movePageDown(page.id)}
                    disabled={index === pages.length - 1}
                    style={{
                      padding: "2px 6px",
                      fontSize: 12,
                      border: "none",
                      background: "transparent",
                      cursor:
                        index === pages.length - 1
                          ? "not-allowed"
                          : "pointer",
                      opacity: index === pages.length - 1 ? 0.3 : 1,
                      color: "#6b7280",
                    }}
                    title="Nach unten"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => removePage(page.id)}
                    style={{
                      padding: "2px 6px",
                      fontSize: 12,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      color: "#ef4444",
                    }}
                    title="Seite entfernen"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button
          onClick={addPage}
          variant="ghost"
          size="small"
          fullWidth
        >
          + Neue Seite hinzufügen
        </Button>
      </div>

      {/* =================================================================
          ADD SECTION (for current page)
          ================================================================= */}
      {!isGlobalSection && currentPageId && (
        <>
          <div
            style={{
              height: 1,
              backgroundColor: "#e5e7eb",
              margin: "8px 16px",
            }}
          />

          <div style={{ padding: "8px 16px 16px" }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                color: "#9ca3af",
                marginBottom: 8,
              }}
            >
              Sektionen
            </div>

            {showAddSection ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  maxHeight: 200,
                  overflowY: "auto",
                }}
              >
                {sectionTypes.map((st) => (
                  <button
                    key={st.type}
                    onClick={() => {
                      addSectionToPage(currentPageId, st.type);
                      setShowAddSection(false);
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "1px solid #e5e7eb",
                      backgroundColor: "#ffffff",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: 13,
                      color: "#374151",
                    }}
                  >
                    {st.label}
                  </button>
                ))}
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setShowAddSection(false)}
                >
                  Abbrechen
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowAddSection(true)}
                variant="secondary"
                size="small"
                fullWidth
              >
                + Sektion hinzufügen
              </Button>
            )}
          </div>
        </>
      )}
    </aside>
  );
};
