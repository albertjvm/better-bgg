import React, { Component } from 'react';

import { GameList } from './GameList';
import { Header } from './Header';
import { Login } from './Login';
import { PlayView } from './PlayView';
import { getCollectionByUsername, getItemsByIds } from '../utils/bggFetch.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      user: {},
      collection: {},
      selectedGame: null,
    };
  }

  componentDidMount() {
    try {
      let username = window.localStorage.getItem('username');
      if (username) {
        this.handleLogin(username);
      }
    } catch (err) {
      console.error(err);
    }
  }

  fetchData() {
    const { username } = this.state;

    try {
      // getUserByName(username)
      //   .then(user => {
      //     this.setState((state) => ({
      //       ...state,
      //       user,
      //     }));
      //     return user;
      //   })
      //   .then(user => {
          getCollectionByUsername(username).then(collection => {
            this.setState((state) => ({
              ...state,
              collection,
            }));

            return collection;
          })
          .then(({ items }) => {
            getItemsByIds(items.map(i => i.objectid))
              .then(result => {

                this.setState((state) => ({
                  ...state,
                  collection: {
                    ...state.collection,
                    items: items.map(item => {
                      let rItem = result.items.find(i => item.objectid === i.id);
                      let decodedDescription = rItem.description;
                      try {
                        decodedDescription = decodeURI(decodedDescription);
                      } catch(e) {
                        console.error(e);
                      }

                      return {
                        ...item,
                        description: decodedDescription,
                        minplayers: rItem.minplayers,
                        maxplayers: rItem.maxplayers,
                        minage: rItem.minage,
                        minplaytime: rItem.minplaytime,
                        maxplaytime: rItem.maxplaytime,
                        playingtime: rItem.playingtime,
                        statistics: rItem.statistics,
                      };
                    })
                  }
                }));

              });
          });
    //     })
    //     .then(null, err => {
    //       console.error(err);
    //     });
    } catch (err) {
      console.error(err);
    }
  }

  handleLogin(username) {
    this.setState({
      username
    }, () => {
      this.fetchData();
      window.localStorage.setItem('username', username);
    });
  }

  handleLogout() {
    this.setState({
      username: null,
      user: {},
      collection: {},
      selectedGame: null,
    });
    window.localStorage.removeItem('username');
  }

  selectGame(game) {
    this.setState({
      selectedGame: game,
    });
  }

  render() {
    const { collection, username, selectedGame } = this.state;
    return (
      <div className="App">
        <Header
          username={username}
          onLogout={() => this.handleLogout()}
        />
        <section className="App-body">
          { username ?
            selectedGame ?
              <PlayView username={username} game={selectedGame} onBack={() => this.selectGame(null)} />
            :
              <GameList 
                games={collection.items || []}
                username={username}
                selectGame={(game) => this.selectGame(game)}
              />
          :
            <Login onLogin={(username) => this.handleLogin(username)} />
          }
        </section>
      </div>
    );
  }
}

export default App;
