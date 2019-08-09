import React from 'react';
import './FilterBar.css';

import { Button } from './Button';

function handleClick(
  value, 
  sortDir,
  sortKey,
  setSortDir,
  setSortKey,
) {
  if (value === sortKey) {
    setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')
  } else {
    setSortKey(value);
    setSortDir('ASC');
  }
}

const sortableFields = [
  { name: 'name', display: 'Name' },
  { name: 'statistics.ratings.averageweight', display: 'Weight'},
];

export function FilterBar({
  sortDir,
  sortKey,
  setSortDir,
  setSortKey,
}) {
  return (
    <div className="FilterBar">
      {sortableFields.map(({name, display}) => (
        <Button onClick={() => handleClick(name, sortDir, sortKey, setSortDir, setSortKey)}>
          {`${display} ${sortKey === name ? (sortDir === 'ASC' ? '⬇' : '⬆') : ''}`}
        </Button>
      ))}
    </div>
  );
};
