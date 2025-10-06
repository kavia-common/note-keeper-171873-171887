import React from 'react';
import NoteItem from './NoteItem';

/**
 * PUBLIC_INTERFACE
 * Renders a list of notes with actions
 */
function NotesList({ notes, onEdit, onDelete, onTogglePin }) {
  return (
    <>
      {notes.map((n) => (
        <NoteItem
          key={n.id}
          note={n}
          onEdit={() => onEdit(n)}
          onDelete={() => onDelete(n.id)}
          onTogglePin={() => onTogglePin(n.id)}
        />
      ))}
    </>
  );
}

export default NotesList;
