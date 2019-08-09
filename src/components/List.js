import React from 'react';
import './List.css';

export function List({ children }) {
  return (
    <ul className="List">
      {children}
    </ul>
  );
}