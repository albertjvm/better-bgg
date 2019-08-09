import React, { Component } from 'react';

import { GameList } from './GameList';
import { getCollectionByUsername, getUserByName, getItemsByIds } from '../utils/bggFetch.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      collection: {},
    };
  }

  async componentDidMount() {
    try {
      getUserByName('albertjvm')
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
                        minplayers: rItem.minplayers,
                        maxplayers: rItem.maxplayers,
                        minage: rItem.minage,
                        minplaytime: rItem.minplaytime,
                        maxplaytime: rItem.maxplaytime,
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

  render() {
    const { user, collection } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://cf.geekdo-static.com/images/logos/navbar-logo-bgg-b2.svg" className="App-logo" alt="logo" />
          <h2 className="App-username">{user.name}</h2>
        </div>
        <section className="App-body">
          { collection.items ?
            <GameList games={collection.items} />
          : null}
        </section>
      </div>
    );
  }
}

export default App;
