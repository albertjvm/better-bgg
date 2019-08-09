import React from 'react';
import './FilterBar.css';

import { Button } from './Button';

export function FilterBar({
  sortDir,
  setSortKey,
  setSortDir,
}) {
  return (
    <div className="FilterBar">
      <Button onClick={() => setSortKey('name')}>Name</Button>
      <Button onClick={() => setSortKey('statistics.ratings.averageweight')}>Weight</Button>
      <Button 
        onClick={() => setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')}
        style={{
          padding: '0 2rem',
        }}
      >
        {sortDir === 'ASC' ? '⬇' : '⬆'}
      </Button>
    </div>
  );
};
