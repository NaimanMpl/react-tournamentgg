import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import './styles/App.scss';

const App = () => {
  return (
    <Router>
      <div id="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
