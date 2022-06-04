import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScore } from '../contexts/ScoreContext';
import {
  StyledCharacter,
  StyledGame,
  StyledScore,
  StyledTimer,
} from '../styled/Game';
import { Strong } from '../styled/Shared';

const MAX_SECONDS = 5;
const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz0123456789';

function Game() {
  const [score, setScore] = useScore(0);
  const [ms, setMs] = useState(999);
  const [seconds, setSeconds] = useState(MAX_SECONDS);
  const [currentCharacter, setCurrentCharacter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= -1) {
      navigate('/gameOver');
    }
  }, [seconds, ms, navigate]);

  const updateTime = useCallback((startTime) => {
    const endTime = new Date();
    const timeTaken = (
      endTime.getTime() - startTime.getTime()
    ).toString();

    //add zeros if necessary to ensure the string has exactly 5 characters
    const formattedMSString = ('0000' + timeTaken).slice(-5);

    //0000 - first 2 are the seconds, and the last 3 are the ms
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
    const updatedMs =
      1000 -
      parseInt(formattedMSString.substring(formattedMSString.length - 3));

    setSeconds(addLeadingZeros(updatedSeconds, 2));
    setMs(addLeadingZeros(updatedMs, 3));
  }, []);

  const addLeadingZeros = (str, length) => {
    let zeros = '';
    for (let i = 0; i < length; i++) {
      zeros += '0';
    }

    return (zeros + str).slice(-length);
  };

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36);
    setCurrentCharacter(CHARACTERS[randomInt]);
  };

  useEffect(() => {
    setRandomCharacter();
    setScore(0);
    const currentTime = new Date();
    const interval = setInterval(() => updateTime(currentTime), 1);
    return () => {
      clearInterval(interval);
    };

  }, [setScore, updateTime]);

  const keyUpHandler = useCallback((e) => {
    if (e.key === currentCharacter) {
      setScore(score + 1);
    } else {
      if (score > 0) {
        setScore(score - 1);
      }
    }
    setRandomCharacter();
  }, [currentCharacter, score, setScore]);

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler);
    return () => {
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [keyUpHandler]);

  return (
    <StyledGame>
      <StyledScore>
        Score: <Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  );
}

export default Game;
