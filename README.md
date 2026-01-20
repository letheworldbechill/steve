# Smooth Builder Pro

Ein benutzerfreundlicher Website-Builder für Schweizer KMU, entwickelt nach den UX-Prinzipien von Steve Krug ("Don't Make Me Think").

## Features

### Kernfunktionen
- ✅ **20-Minuten-Flow**: Website in 20 Minuten erstellen
- ✅ **Mehrseitige Websites**: Beliebig viele Seiten hinzufügen
- ✅ **Globale Header/Footer**: Einmal ändern, überall aktualisiert
- ✅ **Autosave**: Änderungen werden automatisch gespeichert
- ✅ **Undo-System**: Bis zu 20 Schritte rückgängig machen
- ✅ **Versionen**: Veröffentlichte Stände speichern

### Sektionen
- Hero-Bereich
- Leistungen (Services)
- Über uns
- Kontakt
- Kundenstimmen (Testimonials)
- FAQ
- Call-to-Action
- Galerie

### Design
- 4 Theme-Presets: Klassisch, Modern, Warm, Elegant
- Responsive Layout
- Barrierefreie Gestaltung

### SEO
- SEO-Titel und Beschreibung pro Seite
- Open Graph Tags für Social Media
- Automatische Sitemap
- Automatische robots.txt
- noindex Option

### Export
- Vollständiger ZIP-Export
- Semantisches HTML
- Optimiertes CSS
- Deployment-ready

## Installation

```bash
npm install
```

## Entwicklung

```bash
npm run dev
```

Die App läuft unter http://localhost:5173

## Build

```bash
npm run build
```

## Technologie-Stack

- React 18
- TypeScript
- Zustand (State Management)
- Vite (Build Tool)
- JSZip (Export)

## Architektur

```
src/
├── types/          # TypeScript Definitionen
├── store/          # Zustand Store (Single Source of Truth)
├── components/     # React Komponenten
│   ├── ui/         # UI Basis-Komponenten
│   ├── Sidebar     # Seiten-Navigation
│   ├── Editor      # Inhaltsbearbeitung
│   ├── Preview     # Live-Vorschau
│   └── Header      # Toolbar
├── utils/          # Hilfsfunktionen
│   ├── navigation  # Navigation generieren
│   ├── themePresets# Design-Vorlagen
│   ├── generateCss # CSS generieren
│   ├── renderHtml  # HTML rendern
│   ├── generateSitemap
│   ├── generateRobots
│   └── exportZip   # ZIP-Export
└── styles/         # Globale Styles
```

## UX-Prinzipien (Steve Krug)

1. **Don't make me think**: Jede Aktion ist selbsterklärend
2. **Clear exits**: Undo immer verfügbar
3. **Visual hierarchy**: Max. 1 Primäraktion pro View
4. **Goodwill schützen**: Autosave + Status sichtbar
5. **First-click matters**: Defaults statt Konfiguration

## Zielgruppe

- Schweizer KMU (45-65 Jahre)
- Design-unaffine Nutzer
- Keine technischen Vorkenntnisse nötig

## Lizenz

Proprietär - Alle Rechte vorbehalten.
