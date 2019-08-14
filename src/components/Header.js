import React, {useState} from 'react';
import './Header.css';

import navbar from '../icons/navbar.svg';
import { Button } from './Button';
import { DropdownButton } from './DropdownButton';

export function Header({ username, onLogout }) {
  const [logoutExpanded, setLogoutExpanded] = useState(false);
  return (
    <div className="Header">
      <img src={navbar} className="Header-logo" alt="logo" />
      <DropdownButton
        expanded={logoutExpanded}
        onClick={() => setLogoutExpanded(!logoutExpanded)}
        button={
          <div className="Header-username">{username}</div>
        }
      >
        <Button className="Header-logout" onClick={() => {
          setLogoutExpanded(false);
          onLogout();
        }}>Log out</Button>
      </DropdownButton>
    </div>
  );
}