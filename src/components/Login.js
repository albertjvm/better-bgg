import React, {useState} from 'react';
import './Login.css';

import { Button } from './Button';

export function Login({ onLogin }) {
  const [value, setValue] = useState('');
  return (
    <div className="Login">
      <span className="Login-label">Enter your BGG username</span>
      <input
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