import navBurger from '../assets/nav-burger.svg';
import '../styles/Header.scss';

const Header = ({ color }) => {
  return (
    <header>
      <a href='/' style={{color: color}} className="header-title">Tournament.GG</a>
      <nav>
        <ul>
          <li><a style={{ color: color }} href="#">Tournois</a></li>
          <li><a style={{ color: color }} href="/events">Evenements</a></li>
          <li><a style={{ color: color }} href="#">A propos</a></li>
        </ul>
      </nav>
      <svg width="49" height="17" viewBox="0 0 49 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46.7466 16.959H2.19625C1.11415 16.959 0.236938 16.0818 0.236938 14.9997C0.236938 13.9176 1.11415 13.0404 2.19625 13.0404H46.7466C47.8287 13.0404 48.7059 13.9176 48.7059 14.9997C48.7059 16.0818 47.8287 16.959 46.7466 16.959Z" fill={color} />
        <path d="M46.7468 4.19885H2.19638C1.11427 4.19885 0.237061 3.32164 0.237061 2.23954C0.237061 1.15743 1.11427 0.28022 2.19638 0.28022H46.7468C47.8289 0.28022 48.7061 1.15743 48.7061 2.23954C48.7061 3.32164 47.8289 4.19885 46.7468 4.19885Z" fill={color}/>
      </svg>
    </header>
  );
}

Header.defaultProps = {
  color: "var(--white)"
}

export default Header;