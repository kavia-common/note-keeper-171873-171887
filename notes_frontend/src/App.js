import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import NotesList from './components/Notes/NotesList';
import EmptyState from './components/Notes/EmptyState';
import NoteEditorModal from './components/Notes/NoteEditorModal';
import Button from './components/common/Button';
import useNotes from './hooks/useNotes';

// PUBLIC_INTERFACE
function App() {
  /** App shell using Ocean Professional theme, composing Header, Sidebar and Notes list.
   * Integrates useNotes hook to manage data and modal state.
   */
  const {
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
  } = useNotes();

  return (
    <div className="App">
      <div className="header card" role="banner">
        <Header />
        <div className="row">
          <input
            aria-label="Search notes"
            className="search-input"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={openCreate} data-testid="new-note-btn">New Note</Button>
        </div>
      </div>

      <div className="app-shell">
        <aside className="sidebar card" aria-label="Sidebar">
          <Sidebar
            pinnedOnly={pinnedOnly}
            onFilterChange={setPinnedOnly}
          />
        </aside>

        <main className="main" role="main">
          {isLoading ? (
            <div className="empty card" aria-busy="true">Loading notes...</div>
          ) : notes.length === 0 ? (
            <EmptyState onCreate={openCreate} />
          ) : (
            <div className="notes-grid" data-testid="notes-grid">
              <NotesList
                notes={notes}
                onEdit={openEdit}
                onDelete={deleteNote}
                onTogglePin={togglePin}
              />
            </div>
          )}
        </main>
      </div>

      <NoteEditorModal
        isOpen={isModalOpen}
        note={editingNote}
        onClose={closeModal}
        onSave={(payload) => {
          if (editingNote) return updateNote(editingNote.id, payload);
          return createNote(payload);
        }}
      />
    </div>
  );
}

export default App;
