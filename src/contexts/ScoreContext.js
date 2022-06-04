import React, { useContext, useState } from 'react';

// Start at -1 to make sure that the user cannot navigate to the scores screen
const ScoreContext = React.createContext(-1);
const useScore = () => useContext(ScoreContext);

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(-1);

  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {children}
    </ScoreContext.Provider>
  );
};

export { ScoreProvider, useScore };
