import React, {useState} from 'react';
import './Login.css';

import { Button } from './Button';

export function Login({ onLogin }) {
  const [value, setValue] = useState('');
  return (
    <div className="Login">
      <label className="Login-label" id="usernameLabel">Enter your BGG username</label>
      <input
        aria-labelledBy="usernameLabel"
        className="Login-input"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyPress={e => {
          if(e.key === 'Enter') {
            onLogin(value);
          }
        }}
      />
      <Button className="Login-button" onClick={() => onLogin(value)}>GO</Button>
    </div>
  )
}