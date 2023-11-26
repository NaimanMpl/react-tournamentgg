import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideNav from '../components/SideNav';
import { useAuth } from "../contexts/AuthContext";
import '../styles/Dashboard.scss';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user.loggedIn)
    if (!user.loggedIn && !user.loading) {
      navigate('/');
      return;
    }
  }, [user]);

  return (
    <div id="dashboard" style={{ display: 'flex'}}>
      <SideNav />
      <div className="dashboard-content" style={{ padding: '2rem', width: '100%' }}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard;