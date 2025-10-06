import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * Modal for creating or editing a note.
 */
function NoteEditorModal({ isOpen, note, onClose, onSave }) {
  const isEdit = !!note;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setTitle(note?.title || '');
      setContent(note?.content || '');
      setError('');
    }
  }, [isOpen, note]);

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    onSave({ title: title.trim(), content });
    onClose?.();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={isEdit ? 'Edit note' : 'New note'}
      onClose={onClose}
      footer={
        <>
          <Button className="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{isEdit ? 'Save changes' : 'Create note'}</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <label className="muted" htmlFor="title">Title</label>
        <input
          id="title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          aria-invalid={!!error}
        />
        {error && <div role="alert" style={{ color: 'var(--color-error)', fontSize: 12 }}>{error}</div>}
        <label className="muted" htmlFor="content" style={{ marginTop: 6 }}>Content</label>
        <textarea
          id="content"
          className="textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
        />
      </form>
    </Modal>
  );
}

export default NoteEditorModal;
