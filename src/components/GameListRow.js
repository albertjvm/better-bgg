import React from 'react';
import ReactSVG from 'react-svg';
import R from 'ramda';
import cx from 'classnames';

import { ListRow } from './ListRow';

import clock from '../icons/clock.svg';
import meeple from '../icons/meeple.svg';
import weight from '../icons/weight.svg';
import './GameListRow.css';

function playerString({ minplayers, maxplayers }) {
  return `${minplayers}${minplayers === maxplayers ? '' : ` - ${maxplayers}`}`;
}

function playtimeString({ minplaytime, maxplaytime }) {
  return `${minplaytime}${minplaytime === maxplaytime ? '' : ` - ${maxplaytime}`}`;
}

const gameWeight = R.path(['statistics', 'ratings', 'averageweight']);

export function GameListRow({ game, index, expanded, onClick }) {
  return (
    <ListRow className={cx('GameListRow', {expanded})} onClick={onClick} index={index} evenOddColour={true}>
      <div className="GameListRow-body">
        <span className="GameListRow-name" title={game.name}>{game.name}</span>
        <span className="GameListRow-players">
          {game.minplayers ? <ReactSVG className="GameListRow-players-icon" src={meeple} /> : null}
          {game.minplayers ? `${playerString(game)}`: ''}
        </span>
      </div>
      <div className="GameListRow-expanded-body">
        <p className="GameListRow-description">{game.description}</p>
        <span className="GameListRow-weight">
          { gameWeight(game) ? <ReactSVG className="GameListRow-weight-icon" src={weight} /> : null}
          { gameWeight(game) ? `${gameWeight(game)}`: ''}
        </span>
        <span className="GameListRow-playtime">
          { game.minplaytime ? <ReactSVG className="GameListRow-playtime-icon" src={clock} /> : null}
          { game.minplaytime ? `${playtimeString(game)}`: ''}
        </span>
      </div>
    </ListRow>
  );
}