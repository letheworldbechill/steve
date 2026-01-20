// =============================================================================
// SMOOTH BUILDER PRO – PROJECT STORE
// Single Source of Truth nach Steve Krug Prinzipien
// Autosave, Undo, Versionen, Draft/Published
// =============================================================================

import { create } from "zustand";
import {
  ProjectData,
  PublishedVersion,
  Page,
  Section,
  PreviewMode,
  ThemePreset,
  PageSeo,
} from "../types/project";

const STORAGE_KEY = "smooth-builder-project";

// =============================================================================
// INITIAL PROJECT DATA
// =============================================================================

const createInitialProject = (): ProjectData => ({
  globalSections: {
    header: {
      id: "global-header",
      type: "header",
      content: {
        logoText: "Meine Firma",
        phone: "",
      },
    },
    footer: {
      id: "global-footer",
      type: "footer",
      content: {
        copyright: `© ${new Date().getFullYear()} Meine Firma`,
        address: "",
      },
    },
  },
  globalSeo: {
    titleSuffix: "– Meine Firma",
    defaultDescription: "Professionelle Dienstleistungen für KMU",
  },
  theme: {
    preset: "classic",
  },
  hosting: {
    customDomain: "",
  },
  pages: [
    {
      id: "home",
      title: "Startseite",
      slug: "index",
      order: 0,
      isHome: true,
      sections: [
        {
          id: "hero-1",
          type: "hero",
          content: {
            headline: "Willkommen bei Meine Firma",
            subheadline: "Ihre professionelle Lösung für...",
            buttonText: "Kontakt aufnehmen",
            buttonLink: "#kontakt",
          },
        },
        {
          id: "services-1",
          type: "services",
          content: {
            title: "Unsere Leistungen",
            service1Title: "Beratung",
            service1Desc: "Kompetente Beratung für Ihre Bedürfnisse",
            service2Title: "Umsetzung",
            service2Desc: "Professionelle Umsetzung Ihrer Projekte",
            service3Title: "Support",
            service3Desc: "Zuverlässiger Support für Sie",
          },
        },
        {
          id: "about-1",
          type: "about",
          content: {
            title: "Über uns",
            text: "Wir sind ein erfahrenes Team mit langjähriger Expertise...",
          },
        },
        {
          id: "contact-1",
          type: "contact",
          content: {
            title: "Kontakt",
            phone: "",
            email: "",
            address: "",
          },
        },
      ],
      seo: {
        title: "",
        description: "",
        noindex: false,
      },
    },
  ],
});

// =============================================================================
// LOAD FROM LOCALSTORAGE
// =============================================================================

const loadFromStorage = (): ProjectData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ProjectData;
    }
  } catch (error) {
    console.warn("Could not load from storage:", error);
  }
  return createInitialProject();
};

// =============================================================================
// STORE INTERFACE
// =============================================================================

interface ProjectState {
  // Data
  draft: ProjectData;
  publishedVersions: PublishedVersion[];
  
  // Navigation State
  currentPageId: string;
  previewMode: PreviewMode;
  
  // Undo System
  history: ProjectData[];
  lastSavedAt: number | null;
  
  // Actions - Navigation
  setCurrentPage: (pageId: string) => void;
  setPreviewMode: (mode: PreviewMode) => void;
  
  // Actions - Page Management
  addPage: () => void;
  removePage: (pageId: string) => void;
  movePageUp: (pageId: string) => void;
  movePageDown: (pageId: string) => void;
  updatePageTitle: (pageId: string, title: string) => void;
  updatePageSlug: (pageId: string, slug: string) => void;
  
  // Actions - SEO
  updatePageSeo: (
    pageId: string,
    field: keyof PageSeo,
    value: string | boolean
  ) => void;
  updateGlobalSeo: (field: "titleSuffix" | "defaultDescription", value: string) => void;
  
  // Actions - Section Content
  updateSectionContent: (
    pageId: string,
    sectionId: string,
    field: string,
    value: string
  ) => void;
  
  // Actions - Global Sections
  updateGlobalSectionContent: (
    section: "header" | "footer",
    field: string,
    value: string
  ) => void;
  
  // Actions - Sections Management
  addSectionToPage: (pageId: string, sectionType: Section["type"]) => void;
  removeSectionFromPage: (pageId: string, sectionId: string) => void;
  moveSectionUp: (pageId: string, sectionId: string) => void;
  moveSectionDown: (pageId: string, sectionId: string) => void;
  
  // Actions - Theme
  setThemePreset: (preset: ThemePreset) => void;
  
  // Actions - Undo/Versioning
  undo: () => void;
  publish: () => void;
  restoreVersion: (versionId: string) => void;
  
  // Actions - Hosting
  updateCustomDomain: (domain: string) => void;
}

// =============================================================================
// SECTION TEMPLATES
// =============================================================================

const createSection = (type: Section["type"]): Section => {
  const id = crypto.randomUUID();
  
  switch (type) {
    case "hero":
      return {
        id,
        type: "hero",
        content: {
          headline: "Ihre Überschrift",
          subheadline: "Ihre Beschreibung hier",
          buttonText: "Mehr erfahren",
          buttonLink: "#",
        },
      };
    case "services":
      return {
        id,
        type: "services",
        content: {
          title: "Unsere Leistungen",
          service1Title: "Leistung 1",
          service1Desc: "Beschreibung der ersten Leistung",
          service2Title: "Leistung 2",
          service2Desc: "Beschreibung der zweiten Leistung",
          service3Title: "Leistung 3",
          service3Desc: "Beschreibung der dritten Leistung",
        },
      };
    case "about":
      return {
        id,
        type: "about",
        content: {
          title: "Über uns",
          text: "Erzählen Sie hier Ihre Geschichte...",
        },
      };
    case "contact":
      return {
        id,
        type: "contact",
        content: {
          title: "Kontakt",
          phone: "",
          email: "",
          address: "",
        },
      };
    case "testimonials":
      return {
        id,
        type: "testimonials",
        content: {
          title: "Das sagen unsere Kunden",
          quote1: "Hervorragende Arbeit!",
          author1: "Max Mustermann",
          quote2: "Sehr zufrieden mit dem Service.",
          author2: "Anna Beispiel",
        },
      };
    case "gallery":
      return {
        id,
        type: "gallery",
        content: {
          title: "Galerie",
          description: "Eindrücke unserer Arbeit",
        },
      };
    case "faq":
      return {
        id,
        type: "faq",
        content: {
          title: "Häufige Fragen",
          question1: "Wie erreiche ich Sie?",
          answer1: "Sie können uns telefonisch oder per E-Mail erreichen.",
          question2: "Was kostet Ihr Service?",
          answer2: "Kontaktieren Sie uns für ein individuelles Angebot.",
        },
      };
    case "cta":
      return {
        id,
        type: "cta",
        content: {
          headline: "Bereit loszulegen?",
          text: "Kontaktieren Sie uns noch heute!",
          buttonText: "Jetzt anfragen",
          buttonLink: "#kontakt",
        },
      };
    default:
      return {
        id,
        type: "hero",
        content: {
          headline: "Neue Sektion",
          text: "",
        },
      };
  }
};

// =============================================================================
// STORE IMPLEMENTATION
// =============================================================================

export const useProjectStore = create<ProjectState>((set, get) => ({
  // Initial State
  draft: loadFromStorage(),
  publishedVersions: [],
  currentPageId: "home",
  previewMode: "draft",
  history: [],
  lastSavedAt: null,

  // ==========================================================================
  // NAVIGATION
  // ==========================================================================

  setCurrentPage: (pageId) => {
    set({ currentPageId: pageId });
  },

  setPreviewMode: (mode) => {
    set({ previewMode: mode });
  },

  // ==========================================================================
  // PAGE MANAGEMENT
  // ==========================================================================

  addPage: () => {
    const currentDraft = get().draft;
    const maxOrder = Math.max(...currentDraft.pages.map((p) => p.order));
    const pageNumber = currentDraft.pages.length + 1;
    const newPageId = crypto.randomUUID();

    const newPage: Page = {
      id: newPageId,
      title: `Neue Seite ${pageNumber}`,
      slug: `seite-${pageNumber}`,
      order: maxOrder + 1,
      isHome: false,
      sections: [createSection("hero")],
      seo: {
        title: "",
        description: "",
        noindex: false,
      },
    };

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: [...currentDraft.pages, newPage],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      currentPageId: newPageId,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  removePage: (pageId) => {
    const currentDraft = get().draft;
    const page = currentDraft.pages.find((p) => p.id === pageId);

    // Cannot remove home page or if only one page left
    if (!page || page.isHome || currentDraft.pages.length <= 1) {
      return;
    }

    const newPages = currentDraft.pages.filter((p) => p.id !== pageId);
    const newDraft: ProjectData = {
      ...currentDraft,
      pages: newPages,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      currentPageId: newPages[0].id,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  movePageUp: (pageId) => {
    const currentDraft = get().draft;
    const pages = [...currentDraft.pages].sort((a, b) => a.order - b.order);
    const index = pages.findIndex((p) => p.id === pageId);

    // Cannot move first page or home page
    if (index <= 1 || pages[index].isHome) return;
    if (pages[index - 1].isHome) return;

    const updatedPages = pages.map((page) => {
      if (page.id === pageId) {
        return { ...page, order: page.order - 1 };
      }
      if (page.id === pages[index - 1].id) {
        return { ...page, order: page.order + 1 };
      }
      return page;
    });

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: updatedPages,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  movePageDown: (pageId) => {
    const currentDraft = get().draft;
    const pages = [...currentDraft.pages].sort((a, b) => a.order - b.order);
    const index = pages.findIndex((p) => p.id === pageId);

    // Cannot move last page or home page
    if (index === -1 || index === pages.length - 1 || pages[index].isHome) {
      return;
    }

    const updatedPages = pages.map((page) => {
      if (page.id === pageId) {
        return { ...page, order: page.order + 1 };
      }
      if (page.id === pages[index + 1].id) {
        return { ...page, order: page.order - 1 };
      }
      return page;
    });

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: updatedPages,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  updatePageTitle: (pageId, title) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((page) =>
        page.id === pageId ? { ...page, title } : page
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  updatePageSlug: (pageId, slug) => {
    const currentDraft = get().draft;
    const page = currentDraft.pages.find((p) => p.id === pageId);

    // Cannot change slug of home page
    if (page?.isHome) return;

    const safeSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-|-$/g, "");

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((p) =>
        p.id === pageId ? { ...p, slug: safeSlug || "seite" } : p
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // SEO
  // ==========================================================================

  updatePageSeo: (pageId, field, value) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((page) =>
        page.id === pageId
          ? {
              ...page,
              seo: {
                ...page.seo,
                [field]: value,
              },
            }
          : page
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  updateGlobalSeo: (field, value) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      globalSeo: {
        ...currentDraft.globalSeo,
        [field]: value,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // SECTION CONTENT
  // ==========================================================================

  updateSectionContent: (pageId, sectionId, field, value) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((page) =>
        page.id !== pageId
          ? page
          : {
              ...page,
              sections: page.sections.map((section) =>
                section.id !== sectionId
                  ? section
                  : {
                      ...section,
                      content: {
                        ...section.content,
                        [field]: value,
                      },
                    }
              ),
            }
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // GLOBAL SECTIONS
  // ==========================================================================

  updateGlobalSectionContent: (section, field, value) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      globalSections: {
        ...currentDraft.globalSections,
        [section]: {
          ...currentDraft.globalSections[section],
          content: {
            ...currentDraft.globalSections[section].content,
            [field]: value,
          },
        },
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // SECTIONS MANAGEMENT
  // ==========================================================================

  addSectionToPage: (pageId, sectionType) => {
    const currentDraft = get().draft;
    const newSection = createSection(sectionType);

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((page) =>
        page.id === pageId
          ? { ...page, sections: [...page.sections, newSection] }
          : page
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  removeSectionFromPage: (pageId, sectionId) => {
    const currentDraft = get().draft;
    const page = currentDraft.pages.find((p) => p.id === pageId);

    // Keep at least one section
    if (!page || page.sections.length <= 1) return;

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((p) =>
        p.id === pageId
          ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) }
          : p
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  moveSectionUp: (pageId, sectionId) => {
    const currentDraft = get().draft;
    const page = currentDraft.pages.find((p) => p.id === pageId);
    if (!page) return;

    const sectionIndex = page.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex <= 0) return;

    const newSections = [...page.sections];
    [newSections[sectionIndex - 1], newSections[sectionIndex]] = [
      newSections[sectionIndex],
      newSections[sectionIndex - 1],
    ];

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((p) =>
        p.id === pageId ? { ...p, sections: newSections } : p
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  moveSectionDown: (pageId, sectionId) => {
    const currentDraft = get().draft;
    const page = currentDraft.pages.find((p) => p.id === pageId);
    if (!page) return;

    const sectionIndex = page.sections.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1 || sectionIndex >= page.sections.length - 1) return;

    const newSections = [...page.sections];
    [newSections[sectionIndex], newSections[sectionIndex + 1]] = [
      newSections[sectionIndex + 1],
      newSections[sectionIndex],
    ];

    const newDraft: ProjectData = {
      ...currentDraft,
      pages: currentDraft.pages.map((p) =>
        p.id === pageId ? { ...p, sections: newSections } : p
      ),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // THEME
  // ==========================================================================

  setThemePreset: (preset) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      theme: { preset },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // UNDO / VERSIONING
  // ==========================================================================

  undo: () => {
    const history = get().history;
    if (history.length === 0) return;

    const previous = history[history.length - 1];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(previous));

    set({
      draft: previous,
      history: history.slice(0, -1),
      lastSavedAt: Date.now(),
    });
  },

  publish: () => {
    const currentDraft = get().draft;

    const version: PublishedVersion = {
      id: crypto.randomUUID(),
      data: JSON.parse(JSON.stringify(currentDraft)),
      publishedAt: Date.now(),
    };

    set({
      publishedVersions: [...get().publishedVersions, version],
      previewMode: "published",
    });
  },

  restoreVersion: (versionId) => {
    const version = get().publishedVersions.find((v) => v.id === versionId);
    if (!version) return;

    const restoredDraft = JSON.parse(JSON.stringify(version.data));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(restoredDraft));

    set({
      draft: restoredDraft,
      history: [],
      lastSavedAt: Date.now(),
    });
  },

  // ==========================================================================
  // HOSTING
  // ==========================================================================

  updateCustomDomain: (domain) => {
    const currentDraft = get().draft;

    const newDraft: ProjectData = {
      ...currentDraft,
      hosting: {
        ...currentDraft.hosting,
        customDomain: domain,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newDraft));

    set({
      draft: newDraft,
      history: [...get().history, currentDraft].slice(-20),
      lastSavedAt: Date.now(),
    });
  },
}));
