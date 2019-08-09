import React from 'react';
import './Button.css';

export function Button({ onClick, children, ...rest }) {
  return (
    <button className="Button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};