import React, { Component } from 'react';

import { GameList } from './GameList';
import { Header } from './Header';
import { Login } from './Login';
import { getCollectionByUsername, getUserByName, getItemsByIds } from '../utils/bggFetch.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      user: {},
      collection: {},
    };
  }

  componentDidMount() {
    try {
      this.handleLogin(window.localStorage.getItem('username'));
    } catch (err) {
      console.error(err);
    }
  }

  fetchData() {
    const { username } = this.state;

    try {
      getUserByName(username)
        .then(user => {
          this.setState((state) => ({
            ...state,
            user,
          }));
          return user;
        })
        .then(user => {
          getCollectionByUsername(user.name).then(collection => {
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
                      return {
                        ...item,
                        description: decodeURI(rItem.description),
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
        })
        .then(null, err => {
          console.error(err);
        });
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

  render() {
    const { collection, username } = this.state;
    return (
      <div className="App">
        <Header
          username={username}
          onLogout={() => this.setState({
            username: null,
            user: {},
            collection: {},
          })}
        />
        <section className="App-body">
          { username ?
            <GameList games={collection.items || []} />
          :
            <Login onLogin={(username) => this.handleLogin(username)} />
          }
        </section>
      </div>
    );
  }
}

export default App;
