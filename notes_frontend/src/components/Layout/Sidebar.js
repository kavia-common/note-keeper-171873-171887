import React from 'react';
import Button from '../common/Button';

/**
 * PUBLIC_INTERFACE
 * Sidebar contains filters and quick actions.
 */
function Sidebar({ pinnedOnly, onFilterChange }) {
  return (
    <div>
      <div className="section-title">Filters</div>
      <div className="filter-group" role="group" aria-label="Filter notes">
        <Button
          className={!pinnedOnly ? '' : 'secondary'}
          aria-pressed={!pinnedOnly}
          onClick={() => onFilterChange(false)}
        >
          All Notes
        </Button>
        <Button
          className={pinnedOnly ? '' : 'secondary'}
          aria-pressed={pinnedOnly}
          onClick={() => onFilterChange(true)}
        >
          Pinned
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
