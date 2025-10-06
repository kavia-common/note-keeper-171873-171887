import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Reusable Button component with class composition.
 */
function Button({ children, className = '', ...props }) {
  return (
    <button className={`btn ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;
