import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import HighScores from './pages/HighScores';
import Home from './pages/Home';
import { Container } from './styled/Container';
import Global from './styled/Global';
import { Main } from './styled/Main';

function App() {
  const { loading } = useAuth0();

  return (
    <Router>
      <Global />
      <Main>
        {loading && <p>Loading...</p>}
        {!loading && (
          <Container>
            <Navbar />
            <Routes>
              <Route path="/game" element={<Game />} />
              <Route path="/highScores" element={<HighScores />} />
              <Route path="/gameOver" element={<GameOver />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Container>
        )}
      </Main>
    </Router>
  );
}

export default App;
