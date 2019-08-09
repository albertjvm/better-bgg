import React from 'react';
import ReactSVG from 'react-svg';

import { ListRow } from './ListRow';

import meeple from '../icons/meeple.svg';
import clock from '../icons/clock.svg';
import './GameListRow.css';

function playerString({ minplayers, maxplayers }) {
  return `${minplayers}${minplayers === maxplayers ? '' : ` - ${maxplayers}`}`;
}

function playtimeString({ minplaytime, maxplaytime }) {
  return `${minplaytime}${minplaytime === maxplaytime ? '' : ` - ${maxplaytime}`}`;
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
        {/* <span className="GameListRow-playtime">
          {game.minplaytime ? <ReactSVG className="GameListRow-playtime-icon" src={clock} /> : null}
          {game.minplaytime ? `${playtimeString(game)}`: ''}
        </span> */}
      </div>
    </ListRow>
  );
}