import React from 'react';
import cx from 'classnames';
import './DropdownButton.css';

export function DropdownButton({ button, expanded, onClick, children }) {
  
  return (
    <div className={cx('DropdownButton', {expanded})}>
      {React.cloneElement(button, {
        onClick
      })}
      <div className="DropdownButton-panel">
        {children}
      </div>
    </div>
  );
}