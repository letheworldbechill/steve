// =============================================================================
// AUTOSAVE STATUS
// Krug-konform: Immer sichtbar, beruhigend
// =============================================================================

import React from "react";
import { useProjectStore } from "../../store/projectStore";

export const AutosaveStatus: React.FC = () => {
  const lastSavedAt = useProjectStore((state) => state.lastSavedAt);

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("de-CH", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        color: lastSavedAt ? "#059669" : "#6b7280",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: lastSavedAt ? "#059669" : "#9ca3af",
        }}
      />
      {lastSavedAt
        ? `Gespeichert um ${formatTime(lastSavedAt)}`
        : "Änderungen werden gespeichert…"}
    </div>
  );
};
