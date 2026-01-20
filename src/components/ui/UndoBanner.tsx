// =============================================================================
// UNDO BANNER
// Krug-konform: Sichtbar nach Änderung, 30-Sekunden-Timeout, kein Modal
// =============================================================================

import React, { useEffect, useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { Button } from "./Button";

export const UndoBanner: React.FC = () => {
  const undo = useProjectStore((state) => state.undo);
  const historyLength = useProjectStore((state) => state.history.length);
  const [visible, setVisible] = useState(false);
  const [prevHistoryLength, setPrevHistoryLength] = useState(0);

  useEffect(() => {
    // Show banner when history increases
    if (historyLength > prevHistoryLength && historyLength > 0) {
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
      }, 30000);

      return () => clearTimeout(timeout);
    }
    
    setPrevHistoryLength(historyLength);
  }, [historyLength, prevHistoryLength]);

  // Hide when history is empty
  useEffect(() => {
    if (historyLength === 0) {
      setVisible(false);
    }
  }, [historyLength]);

  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1f2937",
        color: "#ffffff",
        padding: "12px 20px",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        gap: 16,
        zIndex: 1000,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        animation: "slideUp 0.2s ease",
      }}
    >
      <span style={{ fontSize: 14 }}>Änderung vorgenommen</span>
      <Button
        variant="ghost"
        size="small"
        onClick={() => {
          undo();
          setVisible(false);
        }}
      >
        <span style={{ color: "#ffffff" }}>Rückgängig machen</span>
      </Button>
      <button
        onClick={() => setVisible(false)}
        style={{
          background: "transparent",
          border: "none",
          color: "#9ca3af",
          cursor: "pointer",
          padding: 4,
          fontSize: 16,
        }}
        aria-label="Schliessen"
      >
        ×
      </button>
    </div>
  );
};
