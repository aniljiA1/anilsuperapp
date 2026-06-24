import { create } from "zustand";

const USER_KEY = "super_app_user";
const CATEGORIES_KEY = "super_app_categories";
const NOTES_KEY = "super_app_notes_list";
const LEGACY_NOTES_KEY = "super_app_notes";

const loadJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const loadNotes = () => {
  const list = loadJSON(NOTES_KEY, null);
  if (list) return list;
  // migrate the old single-textarea note into the new list format
  const legacy = localStorage.getItem(LEGACY_NOTES_KEY);
  if (legacy && legacy.trim()) {
    const migrated = [{ id: String(Date.now()), text: legacy, updatedAt: Date.now() }];
    localStorage.setItem(NOTES_KEY, JSON.stringify(migrated));
    localStorage.removeItem(LEGACY_NOTES_KEY);
    return migrated;
  }
  return [];
};

export const useStore = create((set, get) => ({
  user: loadJSON(USER_KEY, {
    name: "",
    username: "",
    email: "",
    mobile: "",
  }),
  categories: loadJSON(CATEGORIES_KEY, []),
  notes: loadNotes(),
  registered: loadJSON(USER_KEY, null) !== null,

  setUser: (userData) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    set({ user: userData, registered: true });
  },

  setCategories: (categoryArray) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categoryArray));
    set({ categories: categoryArray });
  },

  toggleCategory: (category) => {
    const current = get().categories;
    const exists = current.includes(category);
    const updated = exists
      ? current.filter((c) => c !== category)
      : [...current, category];
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated));
    set({ categories: updated });
  },

  addNote: (text) => {
    if (!text || !text.trim()) return;
    const note = { id: String(Date.now()), text: text.trim(), updatedAt: Date.now() };
    const updated = [note, ...get().notes];
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    set({ notes: updated });
  },

  updateNote: (id, text) => {
    const updated = get().notes.map((n) =>
      n.id === id ? { ...n, text, updatedAt: Date.now() } : n
    );
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    set({ notes: updated });
  },

  deleteNote: (id) => {
    const updated = get().notes.filter((n) => n.id !== id);
    localStorage.setItem(NOTES_KEY, JSON.stringify(updated));
    set({ notes: updated });
  },

  clearNotes: () => {
    localStorage.removeItem(NOTES_KEY);
    set({ notes: [] });
  },

  resetStore: () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(NOTES_KEY);
    set({
      user: { name: "", username: "", email: "", mobile: "" },
      categories: [],
      notes: [],
      registered: false,
    });
  },
}));
