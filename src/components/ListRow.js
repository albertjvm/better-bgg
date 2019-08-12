import React from 'react';
import cx from 'classnames';
import './ListRow.css';

export function ListRow({ index, evenOddColour = false, children, className, onClick }) {
  return (
    <li 
      className={cx('ListRow', className, evenOddColour ? (index % 2 === 0 ? 'ListRow-even' : 'ListRow-odd') : null)}
      onClick={onClick}
    >
      {children}
    </li>
  );
}