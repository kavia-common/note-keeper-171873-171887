import React from 'react';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * Shown when there are no notes to display.
 */
function EmptyState({ onCreate }) {
  return (
    <div className="empty card" role="status" data-testid="empty-state">
      <div style={{ fontSize: 28, marginBottom: 8 }}>No notes yet</div>
      <div className="muted" style={{ marginBottom: 16 }}>
        Start capturing ideas, todos, and reminders. Your notes will appear here.
      </div>
      <Button onClick={onCreate}>Create your first note</Button>
    </div>
  );
}

export default EmptyState;
