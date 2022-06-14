import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../contexts/ScoreContext';
import { StyledCharacter } from '../styled/Game';
import { StyledLink } from '../styled/Navbar';
import { StyledTitle } from '../styled/Shared';

function GameOver() {
  const [score] = useScore();
  const [scoreMessage, setScoreMessage] = useState('');

  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  if (score === -1) {
    navigate('/');
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently();
        const options = {
          method: 'POST',

          // Pass a dummy name till auth is added
          body: JSON.stringify({ name: 'asdasfsd', score }),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch(
          '/.netlify/functions/saveHighScore',
          options
        );

        const data = await res.json();
        if (data.id) {
          setScoreMessage('Congrats! You got a high score!!');
        } else {
          setScoreMessage('Sorry, not a high score. Keep trying!');
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      saveHighScore();
    }
  }, [getAccessTokenSilently, isAuthenticated, score]);

  return (
    <div>
      <StyledTitle>Game Over</StyledTitle>
      <h2>{scoreMessage}</h2>
      {!isAuthenticated && (
        <p>You should log in or sign up to compete for high scores.</p>
      )}
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again</StyledLink>
      </div>
    </div>
  );
}

export default GameOver;
