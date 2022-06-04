import React from 'react'
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from '../styled/Game';
import { Strong } from '../styled/Shared';

function Game() {
  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>0</Strong>
      </StyledScore>
      <StyledCharacter>A</StyledCharacter>
      <StyledTimer>
        Time: <Strong>00:000</Strong>
      </StyledTimer>
    </StyledGame>
  );
}

export default Game;
