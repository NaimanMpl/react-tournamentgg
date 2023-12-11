import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import closeIcon from '../assets/close.svg';
import defaultProfilePicture from '../assets/default-pp.svg';
import navBurger from '../assets/nav-burger.svg';
import { useAuth } from '../contexts/AuthContext';
import { getBase64Image } from '../services/utils';
import '../styles/Header.scss';

const Header = ({ color }) => {
  const { user, setUser } = useAuth();
  const [ visible, setVisible ] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <>
      {visible && <div className="burger-nav">
        <div className="account-details">
          {!user.loading && user.loggedIn ? (
          <>
            <img className='account-pp' src={user.profilePicture === null ? defaultProfilePicture : getBase64Image(user.profilePicture) } alt="Profile picture" />
            <div className="account-details--infos">
              <p className='account-details--login'>{user.login}</p>
              <p className='account-details--email'>{user.email}</p>
            </div>
            <img onClick={() => { setVisible(false); }} className='burger-nav--close' src={closeIcon} alt="Close" />
          </>
          ) : (
          <>
            <img className='account-pp' src={defaultProfilePicture} alt="Profile picture" />
            <div className="account-details--infos">
              <p className='account-details--login'>Non connecté</p>
            </div>
            <img onClick={() => { setVisible(false); }} className='burger-nav--close' src={closeIcon} alt="Close" />
          </>
          ) }
        </div>
        <nav>
          <ul>
            <li><a href="/events">Evenements</a></li>
            {!user.loading && user.loggedIn ? 
            (<></>) : 
            (<>
              <li><a href="/register">S'inscrire</a></li>
              <li><a href="/login">Se connecter</a></li>
            </>)}
            {!user.loading && user.loggedIn && <li><a href="#" onClick={handleLogout}>Déconnexion</a></li>}
          </ul>
        </nav>
      </div>}
      <header className='base-header'>
        <a href='/' style={{color: color}} className="header-title">Tournament.GG</a>
        <svg onClick={() => { setVisible((visible) => !visible) }} style={{ cursor: 'pointer' }} width="49" height="17" viewBox="0 0 49 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46.7466 16.959H2.19625C1.11415 16.959 0.236938 16.0818 0.236938 14.9997C0.236938 13.9176 1.11415 13.0404 2.19625 13.0404H46.7466C47.8287 13.0404 48.7059 13.9176 48.7059 14.9997C48.7059 16.0818 47.8287 16.959 46.7466 16.959Z" fill={color} />
          <path d="M46.7468 4.19885H2.19638C1.11427 4.19885 0.237061 3.32164 0.237061 2.23954C0.237061 1.15743 1.11427 0.28022 2.19638 0.28022H46.7468C47.8289 0.28022 48.7061 1.15743 48.7061 2.23954C48.7061 3.32164 47.8289 4.19885 46.7468 4.19885Z" fill={color}/>
        </svg>
      </header>
    </>
  );
}

Header.defaultProps = {
  color: "var(--white)"
}

export default Header;