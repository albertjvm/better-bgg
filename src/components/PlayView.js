import React, {useState, useEffect} from 'react';
import ReactSVG from 'react-svg';
import {getPlays} from '../utils/bggFetch';
import './PlayView.css';
import arrow from '../icons/arrow.svg';

function winnersName(players) {
  const winner = players.find(p => p.win === '1');

  return winner ? winner.name : 'unknown';
}

function playersNames(players) {
  return players.map(p => p.name).join('\n');
}

export function PlayView({ username, game, onBack }) {
  const [plays, setPlays] = useState([]);

  useEffect(() => {
    try {
      getPlays(username, game.objectid)
        .then(result => {
          setPlays(result.plays.map(play => ({
            ...play,
            players: play.players && play.players.players,
          })));
        });
    } catch (err) {
      console.error(err);
    }
  }, [game]);

  return (
    <div className="PlayView">
      <h2 className="PlayView-heading">
        <ReactSVG className="PlayView-back-icon" src={arrow} onClick={() => onBack()} />
        {game.name}
        <span style={{width: '20px'}}/>
      </h2>
      <div className="PlayGrid">
        <div className="PlayGrid-column-headings">
          <span key={`heading-date`}>Date</span>
          <span key={`heading-players`}># of players</span>
          <span key={`heading-winner`}>Winner</span>
        </div>
        <div className="PlayGrid-body">
          {
            plays.map(({id, date, players = []}) => (
              <React.Fragment>
                <span key={`${id}-date`}>{date}</span>
                <span key={`${id}-players`} title={playersNames(players)}>{players.length} players</span>
                <span key={`${id}-winner`}>{winnersName(players)}</span>
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </div>
  )
}