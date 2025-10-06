import { getJSON, setJSON } from '../utils/storage';

const STORAGE_KEY = 'ocean-notes';

/**
 * PUBLIC_INTERFACE
 * Returns all notes (simulated latency).
 */
export async function getNotes() {
  await delay(120);
  return getJSON(STORAGE_KEY, []);
}

/**
 * PUBLIC_INTERFACE
 * Create a new note and persist.
 */
export async function createNote({ title, content = '', pinned = false, tags = [], color = '' }) {
  await delay(120);
  const now = new Date().toISOString();
  const note = {
    id: cryptoRandomId(),
    title,
    content,
    pinned,
    createdAt: now,
    updatedAt: now,
    tags,
    color,
  };
  const notes = getJSON(STORAGE_KEY, []);
  const next = [note, ...notes];
  setJSON(STORAGE_KEY, next);
  return note;
}

/**
 * PUBLIC_INTERFACE
 * Update note by id with patch.
 */
export async function updateNote(id, patch) {
  await delay(120);
  const notes = getJSON(STORAGE_KEY, []);
  const now = new Date().toISOString();
  const next = notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: now } : n));
  setJSON(STORAGE_KEY, next);
  return next.find((n) => n.id === id);
}

/**
 * PUBLIC_INTERFACE
 * Delete a note.
 */
export async function deleteNote(id) {
  await delay(120);
  const notes = getJSON(STORAGE_KEY, []);
  const next = notes.filter((n) => n.id !== id);
  setJSON(STORAGE_KEY, next);
  return true;
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

function cryptoRandomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}
