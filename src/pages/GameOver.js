import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';

function GameOver() {
  const [score] = useScore();

  const navigate = useNavigate();

  if (score === -1) {
    navigate('/');
  }

  return (
    <div>
      <h1>Game Over</h1>
      <p>{score}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again?</StyledLink>
    </div>
  );
}

export default GameOver;
