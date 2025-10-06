import React from 'react';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * Header component for the notes app.
 */
function Header() {
  return (
    <div className="space-between" data-testid="app-header">
      <div className="brand" aria-label="Notes App">
        <div className="brand-badge" aria-hidden>🗒️</div>
        <div>
          <div style={{ fontSize: 18 }}>Ocean Notes</div>
          <div className="muted" style={{ fontSize: 12 }}>Capture. Organize. Focus.</div>
        </div>
      </div>
      <div className="row" role="toolbar" aria-label="Global actions">
        <Button className="secondary" aria-label="Help">Help</Button>
      </div>
    </div>
  );
}

export default Header;
