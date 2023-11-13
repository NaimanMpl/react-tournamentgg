import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
