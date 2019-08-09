import React from 'react';

import { List } from './List';
import { GameListRow } from './GameListRow';
import { FilterBar } from './FilterBar';

export function GameList({ games }) {
  return (
    <List> 
      {/* <FilterBar /> */}
      {
        games.map((game, i) => 
          <GameListRow key={i} index={i} game={game} />
        )
      }
    </List>
  );
}
