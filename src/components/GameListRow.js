import React from 'react';
import ReactSVG from 'react-svg';

import { ListRow } from './ListRow';

import meeple from '../icons/meeple.svg';
import './GameListRow.css';

function playerString({ minplayers, maxplayers }) {
  return `${minplayers}${minplayers === maxplayers ? '' : ` - ${maxplayers}`}`;
}

export function GameListRow({ game, index }) {
  return (
    <ListRow index={index} evenOddColour={true}>
      <div className="GameListRow-body">
        <span className="GameListRow-name">{game.name}</span>
        <span className="GameListRow-players">
          {game.minplayers ? <ReactSVG className="GameListRow-players-icon" src={meeple} /> : null}
          {game.minplayers ? `${playerString(game)}`: ''}
        </span>
      </div>
    </ListRow>
  );
}