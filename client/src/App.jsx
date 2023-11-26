import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Event from './pages/Event';
import Events from './pages/Events';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/dashboard/Reports';
import Users from './pages/dashboard/Users';
import './styles/App.scss';

const App = () => {
  return (
    <div id="app">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/event/:id" element={<Event />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path='/dashboard/users' element={<Users />} />
              <Route path='/dashboard/settings' element={<Users />} />
              <Route path='/dashboard/reports' element={<Reports />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
