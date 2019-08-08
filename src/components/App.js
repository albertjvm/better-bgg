import React, { Component } from 'react';
import cx from 'classnames';
import { getCollectionByUsername, getUserByName } from '../utils/bggFetch.js';
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
        { collection.items ?
          <div className="GameList"> {
            collection.items.map((item, i) => 
              <div
                className={cx('GameItem', i % 2 === 0 ? 'GameItem-even' : 'GameItem-odd')}
                key={item.objectid}
              >
                {item.name}
              </div>
            )
          }</div>
        : null}
      </div>
    );
  }
}

export default App;
