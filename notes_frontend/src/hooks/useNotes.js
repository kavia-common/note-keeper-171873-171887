import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as api from '../services/mockApi';

/**
 * PUBLIC_INTERFACE
 * useNotes manages notes state, search/filter, modal and CRUD operations.
 */
function useNotes() {
  const [allNotes, setAllNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const debounceRef = useRef();

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const data = await api.getNotes();
    setAllNotes(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Debounce search update to mimic latency
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 200);
    return () => clearTimeout(debounceRef.current);
  }, [search]);

  const notes = useMemo(() => {
    let n = [...allNotes];
    if (debouncedSearch) {
      n = n.filter(
        (x) =>
          x.title.toLowerCase().includes(debouncedSearch) ||
          (x.content || '').toLowerCase().includes(debouncedSearch)
      );
    }
    if (pinnedOnly) {
      n = n.filter((x) => x.pinned);
    }
    // sort pinned first, then updated desc
    n.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    });
    return n;
  }, [allNotes, debouncedSearch, pinnedOnly]);

  const openCreate = useCallback(() => {
    setEditingNote(null);
    setIsModalOpen(true);
  }, []);
  const openEdit = useCallback((note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const createNote = useCallback(async (payload) => {
    const created = await api.createNote(payload);
    setAllNotes((s) => [created, ...s]);
  }, []);
  const updateNote = useCallback(async (id, payload) => {
    const updated = await api.updateNote(id, payload);
    setAllNotes((s) => s.map((n) => (n.id === id ? updated : n)));
  }, []);
  const deleteNote = useCallback(async (id) => {
    await api.deleteNote(id);
    setAllNotes((s) => s.filter((n) => n.id !== id));
  }, []);
  const togglePin = useCallback(async (id) => {
    const target = allNotes.find((n) => n.id === id);
    if (!target) return;
    const updated = await api.updateNote(id, { pinned: !target.pinned });
    setAllNotes((s) => s.map((n) => (n.id === id ? updated : n)));
  }, [allNotes]);

  return {
    notes,
    pinnedOnly,
    search,
    isLoading,
    isModalOpen,
    editingNote,
    setSearch,
    setPinnedOnly,
    openCreate,
    openEdit,
    closeModal,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
  };
}

export default useNotes;
