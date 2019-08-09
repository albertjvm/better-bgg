import React, {useState} from 'react';
import ReactSVG from 'react-svg';
import './FilterBar.css';

import sort from '../icons/sort.svg';
import filter from '../icons/filter.svg';
import meeple from '../icons/meeple.svg';
import { Button } from './Button';
import { Counter } from './Counter';
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
  { name: 'numplays', display: 'Plays' },
  { name: 'statistics.ratings.averageweight', display: 'Weight'},
];

export function FilterBar({
  sortDir,
  sortKey,
  playerFilter,
  setSortDir,
  setSortKey,
  setPlayerFilter,
}) {
  const [ activeDropdown, setActiveDropdown ] = useState('');
  return (
    <div className="FilterBar">
      <DropdownButton
        expanded={activeDropdown === 'sort'}
        onClick={() => setActiveDropdown(activeDropdown === 'sort' ? '' : 'sort')}
        button={
          <Button className="FilterBar-button FilterBar-sort">
            <ReactSVG className="FilterBar-sort-icon" src={sort} />
          </Button>
        }
      >
        {sortableFields.map(({ name, display }) => (
          <Button key={name} className="FilterBar-button FilterBar-sort-button" onClick={() => handleClick(name, sortDir, sortKey, setSortDir, setSortKey, setActiveDropdown)}>{display}</Button>
        ))}
      </DropdownButton>
      <Button className="FilterBar-button FilterBar-sortDir" onClick={() => setSortDir(sortDir === 'ASC' ? 'DESC' : 'ASC')}>{sortDir === 'ASC' ? '⬇' : '⬆'}</Button>
      <DropdownButton
        expanded={activeDropdown === 'filter'}
        onClick={() => setActiveDropdown(activeDropdown === 'filter' ? '' : 'filter')}
        button={
          <Button className="FilterBar-button FilterBar-filter">
            <ReactSVG className="FilterBar-filter-icon" src={filter} />
          </Button>
        }
      >
        <Counter initialValue={playerFilter} onChange={setPlayerFilter}>
            <ReactSVG className="FilterBar-counter-icon" src={meeple} />
        </Counter>
      </DropdownButton>
    </div>
  );
};
