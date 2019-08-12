import React, { useState } from 'react';
import R from 'ramda';

import { List } from './List';
import { GameListRow } from './GameListRow';
import { FilterBar } from './FilterBar';

function sortGames(games, sortKey, sortDir) {
  const path = sortKey.split('.');
  return games.sort((a, b) =>  {
    if (['numplays'].includes(sortKey)) {
      return parseInt(R.path(path, sortDir === 'ASC' ? a : b), 10) - parseInt(R.path(path, sortDir === 'ASC' ? b : a), 10);
    } else if (['statistics.ratings.averageweight'].includes(sortKey)) {
      return parseFloat(R.path(path, sortDir === 'ASC' ? a : b), 10) - parseFloat(R.path(path, sortDir === 'ASC' ? b : a), 10);
    } else {
      return R.lt(
        R.path(path, sortDir === 'ASC' ? a : b),
        R.path(path, sortDir === 'ASC' ? b : a),
      ) ? -1 : 1;
    }
  });
}

function filterGames(games, playerFilter) {
  return games.filter(game => playerFilter === 0 || (parseInt(game.minplayers, 10) <= playerFilter && parseInt(game.maxplayers, 10) >= playerFilter));
}

export function GameList({ games }) {
  const [sortKey, setSortKey] = useState('name');
  const [sortDir, setSortDir] = useState('ASC');
  const [playerFilter, setPlayerFilter] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const sortedGames = sortGames(
    filterGames(games, playerFilter),
  sortKey, sortDir);
  return (
    <List> 
      <FilterBar
        sortDir={sortDir}
        sortKey={sortKey}
        playerFilter={playerFilter}
        setSortKey={setSortKey}
        setSortDir={setSortDir}
        setPlayerFilter={setPlayerFilter}
      />
      {
        sortedGames.map((game, i) => 
          <GameListRow 
            key={i}
            index={i}
            game={game}
            expanded={game.objectid === expandedId}
            onClick={() => setExpandedId(game.objectid === expandedId ? null : game.objectid)}
          />
        )
      }
    </List>
  );
}
