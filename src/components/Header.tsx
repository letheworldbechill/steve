// =============================================================================
// HEADER / TOOLBAR COMPONENT
// Krug-konform: Klare Aktionen, Status sichtbar, Export prominent
// =============================================================================

import React, { useState } from "react";
import { useProjectStore } from "../store/projectStore";
import { Button } from "./ui/Button";
import { AutosaveStatus } from "./ui/AutosaveStatus";
import { exportZip } from "../utils/exportZip";

export const Header: React.FC = () => {
  const draft = useProjectStore((s) => s.draft);
  const publish = useProjectStore((s) => s.publish);
  const publishedVersions = useProjectStore((s) => s.publishedVersions);
  const undo = useProjectStore((s) => s.undo);
  const historyLength = useProjectStore((s) => s.history.length);

  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePublish = () => {
    publish();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Use published version if available, otherwise draft
      const dataToExport =
        publishedVersions.length > 0
          ? publishedVersions[publishedVersions.length - 1].data
          : draft;
      await exportZip(dataToExport);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export fehlgeschlagen. Bitte versuchen Sie es erneut.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header
      style={{
        height: 56,
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Left: Logo & Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#4f46e5",
          }}
        >
          Smooth Builder
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#9ca3af",
            padding: "2px 8px",
            backgroundColor: "#f3f4f6",
            borderRadius: 4,
          }}
        >
          Pro
        </div>
      </div>

      {/* Center: Status */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <AutosaveStatus />
        {historyLength > 0 && (
          <Button variant="ghost" size="small" onClick={undo}>
            ↩ Rückgängig
          </Button>
        )}
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showSuccess && (
          <span
            style={{
              fontSize: 13,
              color: "#059669",
              marginRight: 8,
            }}
          >
            ✓ Veröffentlicht!
          </span>
        )}

        <Button variant="secondary" size="medium" onClick={handlePublish}>
          Veröffentlichen
        </Button>

        <Button
          variant="primary"
          size="medium"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? "Wird erstellt…" : "Website herunterladen"}
        </Button>
      </div>
    </header>
  );
};
