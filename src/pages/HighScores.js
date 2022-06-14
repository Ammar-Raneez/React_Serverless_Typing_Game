import React, { useEffect, useState } from 'react'

import { ScoresList, ScoreLI, ScoreName } from '../styled/HighScores';

function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    const loadHighScores = async () => {
      try {
        // netlify dev creates a proxy config so that it makes it seem like both the client
        // and functions are running on the same localhost, although they run in different ports
        const res = await fetch('/.netlify/functions/getHighScores');
        const scores = await res.json();
        setHighScores(scores);
      } catch (err) {
        console.error(err);
      }
    };
    loadHighScores();
  }, []);

  return (
    <div>
      <h1>High Scores</h1>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLI key={score.id}>
            {index + 1}.
            <ScoreName>{score.fields.name}</ScoreName>
            {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  );
}

export default HighScores;
