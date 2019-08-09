import React, { useState } from 'react';
import R from 'ramda';

import { List } from './List';
import { GameListRow } from './GameListRow';
import { FilterBar } from './FilterBar';

function sortGames(games, sortKey, sortDir) {
  const path = sortKey.split('.');
  return games.sort((a, b) => R.lt(
    R.path(path, sortDir === 'ASC' ? a : b),
    R.path(path, sortDir === 'ASC' ? b : a),
  ) ? -1 : 1);
}

export function GameList({ games }) {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('ASC');
  const sortedGames = sortGames(games, sortKey, sortDir);
  console.log(games);
  return (
    <List> 
      <FilterBar
        sortDir={sortDir}
        setSortKey={setSortKey}
        setSortDir={setSortDir}
      />
      {
        sortedGames.map((game, i) => 
          <GameListRow key={i} index={i} game={game} />
        )
      }
    </List>
  );
}
