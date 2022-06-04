import React from 'react';
import { Link } from 'react-router-dom';
import { StyledLink, StyledNavbar, StyledNavBrand, StyledNavItem } from '../styled/Navbar';
import { Accent } from '../styled/Shared';

function Navbar() {
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
      </StyledNavItem>
    </StyledNavbar>
  );
}

export default Navbar;
