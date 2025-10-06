import React, { useEffect, useRef } from 'react';

/**
 * PUBLIC_INTERFACE
 * Accessible modal component with ESC/overlay close and initial focus.
 */
function Modal({ isOpen, title, onClose, children, footer }) {
  const ref = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      // focus first input
      setTimeout(() => {
        const el = ref.current?.querySelector('input, textarea, button');
        el?.focus();
      }, 0);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title} onMouseDown={onClose}>
      <div
        className="modal"
        ref={ref}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ fontWeight: 700 }}>{title}</div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✖</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-actions">{footer}</div>
      </div>
    </div>
  );
}

export default Modal;
