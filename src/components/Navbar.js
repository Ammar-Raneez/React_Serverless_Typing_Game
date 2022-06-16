import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  StyledButton,
  StyledLink,
  StyledNavbar,
  StyledNavBrand,
  StyledNavItem,
} from '../styled/Navbar';
import { Accent } from '../styled/Shared';

function Navbar({ toggleTheme }) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItem>
        <li><StyledLink to="/">Home</StyledLink></li>
        <li><StyledLink to="/highScores">High Scores</StyledLink></li>
        {!isAuthenticated && (
          <li>
            <StyledButton onClick={loginWithRedirect}>Login</StyledButton>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <StyledButton onClick={logout}>Logout</StyledButton>
          </li>
        )}
        <button onClick={toggleTheme}>Toggle Theme</button>
      </StyledNavItem>
    </StyledNavbar>
  );
}

export default Navbar;
