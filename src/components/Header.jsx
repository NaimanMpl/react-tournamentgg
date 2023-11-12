import navBurger from '../assets/nav-burger.svg';
import '../styles/Header.scss';

const Header = () => {
  return (
    <header>
      <span class="header-title">Tournament.GG</span>
      <nav>
        <ul>
          <li><a href="#">Tournois</a></li>
          <li><a href="#">Evenements</a></li>
          <li><a href="#">A propos</a></li>
        </ul>
      </nav>
      <img src={navBurger} alt="Menu" />
    </header>
  );
}

export default Header;