import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import HighScores from './pages/HighScores';
import Home from './pages/Home';
import { Container } from './styled/Container';
import Global from './styled/Global';
import { Main } from './styled/Main';
import { darkTheme, lightTheme } from './styled/themes';

function App() {
  const { loading } = useAuth0();

  const theme = 'light';
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
