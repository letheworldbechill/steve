// =============================================================================
// APP COMPONENT
// Smooth Builder Pro - Hauptlayout
// 3-Panel-Layout: Sidebar | Editor | Preview
// =============================================================================

import React from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { UndoBanner } from "./components/ui/UndoBanner";

const App: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#111827",
      }}
    >
      {/* Top Header with Actions */}
      <Header />

      {/* Main Content: 3-Panel Layout */}
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {/* Left: Sidebar */}
        <Sidebar />

        {/* Center: Editor */}
        <Editor />

        {/* Right: Preview */}
        <Preview />
      </div>

      {/* Undo Banner (floating) */}
      <UndoBanner />
    </div>
  );
};


