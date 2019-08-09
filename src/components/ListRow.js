import React from 'react';
import cx from 'classnames';
import './ListRow.css';

export function ListRow({ index, evenOddColour = false, children }) {
  return (
    <li className={cx('ListRow', evenOddColour ? (index % 2 === 0 ? 'ListRow-even' : 'ListRow-odd') : null)}>
      {children}
    </li>
  );
}