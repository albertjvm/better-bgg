import React from 'react';
import './DropdownButton.css';

export function DropdownButton({ button, expanded, onClick, children }) {
  
  return (
    <div className="DropdownButton">
      {React.cloneElement(button, {
        onClick
      })}
      {expanded ? (
        <div className="DropdownButton-panel">
          {children}
        </div>
      ) : null}
    </div>
  );
}