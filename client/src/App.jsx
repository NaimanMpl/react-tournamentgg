import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Events from './pages/Events';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/events" element={<Events />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
