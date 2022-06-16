import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import useTheme from './hooks/useTheme';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import HighScores from './pages/HighScores';
import Home from './pages/Home';
import { Container } from './styled/Container';
import Global from './styled/Global';
import Loader from './styled/Loader';
import { Main } from './styled/Main';
import { darkTheme, lightTheme } from './styled/themes';

function App() {
  const { loading } = useAuth0();

  const [theme, toggleTheme] = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Router>
      <ThemeProvider theme={currentTheme}>
        <Global />
        <Main>
          {loading && (
            <Loader>
              <p>Loading...</p>
            </Loader>
          )}
          {!loading && (
            <Container>
              <Navbar toggleTheme={toggleTheme} />
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
