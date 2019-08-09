import React, {useState} from 'react';
import ReactSVG from 'react-svg';
import './FilterBar.css';

import sort from '../icons/sort.svg';
import filter from '../icons/filter.svg';
import { Button } from './Button';
import { DropdownButton } from './DropdownButton';

function handleClick(
  value, 
  sortDir,
  sortKey,
  setSortDir,
  setSortKey,
  setActiveDropdown,
) {
  if (value === sortKey) {
    setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')
  } else {
    setSortKey(value);
    setSortDir('ASC');
  }
  setActiveDropdown('');
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
  const [ activeDropdown, setActiveDropdown ] = useState('');
  return (
    <div className="FilterBar">
      <DropdownButton
        expanded={activeDropdown === 'sort'}
        onClick={() => setActiveDropdown(activeDropdown === 'sort' ? '' : 'sort')}
        button={
          <Button className="FilterBar-sort">
            <ReactSVG className="FilterBar-sort-icon" src={sort} />
          </Button>
        }
      >
        {sortableFields.map(({ name, display }) => (
          <Button key={name} onClick={() => handleClick(name, sortDir, sortKey, setSortDir, setSortKey, setActiveDropdown)}>{display}</Button>
        ))}
      </DropdownButton>
      <Button onClick={() => setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')}>{sortDir === 'ASC' ? '⬇' : '⬆'}</Button>
      <DropdownButton
        expanded={activeDropdown === 'filter'}
        onClick={() => setActiveDropdown(activeDropdown === 'filter' ? '' : 'filter')}
        button={
          <Button className="FilterBar-filter">
            <ReactSVG className="FilterBar-filter-icon" src={filter} />
          </Button>
        }
      >
        <Button>Another Button!</Button>
      </DropdownButton>
    </div>
  );
};
