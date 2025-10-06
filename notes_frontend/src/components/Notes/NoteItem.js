import React from 'react';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * Single note item card
 */
function NoteItem({ note, onEdit, onDelete, onTogglePin }) {
  const updated = new Date(note.updatedAt || note.createdAt);
  const dateText = updated.toLocaleString();

  return (
    <article className="note-card card" aria-label={`Note ${note.title}`}>
      <div className="space-between">
        <div className="title">{note.title}</div>
        <div className="note-actions" role="group" aria-label="Note actions">
          <button className="icon-btn pin" onClick={onTogglePin} aria-label={note.pinned ? 'Unpin note' : 'Pin note'}>
            {note.pinned ? '📌' : '📍'}
          </button>
          <button className="icon-btn" onClick={onEdit} aria-label="Edit note">✏️</button>
          <button className="icon-btn" onClick={onDelete} aria-label="Delete note">🗑️</button>
        </div>
      </div>
      <div className="content">{note.content}</div>
      <div className="meta">
        <span className="muted">{dateText}</span>
        {note.tags && note.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6 }}>
            {note.tags.map((t) => (
              <span key={t} className="muted">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default NoteItem;
