// =============================================================================
// THEME PRESETS
// Vordefinierte Farbschemata nach Steve Krug (Auswahl statt Konfiguration)
// =============================================================================

import { ThemePreset } from "../types/project";

export interface ThemeValues {
  fontFamily: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  borderRadius: string;
}

export const themePresets: Record<ThemePreset, ThemeValues> = {
  classic: {
    fontFamily: "'Inter', Arial, sans-serif",
    primaryColor: "#1f2937",
    secondaryColor: "#4b5563",
    backgroundColor: "#ffffff",
    textColor: "#374151",
    accentColor: "#3b82f6",
    borderRadius: "4px",
  },
  modern: {
    fontFamily: "'Inter', sans-serif",
    primaryColor: "#4f46e5",
    secondaryColor: "#6366f1",
    backgroundColor: "#f9fafb",
    textColor: "#111827",
    accentColor: "#4f46e5",
    borderRadius: "8px",
  },
  warm: {
    fontFamily: "Georgia, serif",
    primaryColor: "#92400e",
    secondaryColor: "#b45309",
    backgroundColor: "#fffbeb",
    textColor: "#78350f",
    accentColor: "#d97706",
    borderRadius: "6px",
  },
  elegant: {
    fontFamily: "'Inter', sans-serif",
    primaryColor: "#18181b",
    secondaryColor: "#3f3f46",
    backgroundColor: "#fafafa",
    textColor: "#27272a",
    accentColor: "#a855f7",
    borderRadius: "2px",
  },
};

export const themePresetInfo: Record<
  ThemePreset,
  { title: string; description: string }
> = {
  classic: {
    title: "Klassisch",
    description: "Zeitlos und professionell – passt zu jedem Geschäft",
  },
  modern: {
    title: "Modern",
    description: "Frisch und zeitgemäss – für innovative Unternehmen",
  },
  warm: {
    title: "Warm",
    description: "Einladend und persönlich – für Handwerk und Gastronomie",
  },
  elegant: {
    title: "Elegant",
    description: "Zurückhaltend und hochwertig – für Premium-Angebote",
  },
};
