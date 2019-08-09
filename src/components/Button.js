import React from 'react';
import cx from 'classnames';
import './Button.css';

export function Button({ onClick, className, children, ...rest }) {
  return (
    <button className={cx('Button', className)} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};