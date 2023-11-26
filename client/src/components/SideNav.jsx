import accountIcon from '../assets/account.svg';
import settingsIcon from '../assets/settings.svg';
import ticketIcon from '../assets/tickets.svg';
import '../styles/components/SideNav.scss';
import NavButton from './NavButton';

const SideNav = () => {
  return (
    <header className="side-header">
      <a className='side-header--title' href="/">TournamentGG</a>
      <nav>
        <ul>
          <li><NavButton active={window.location.href.includes('/settings') ? true : false} redirectLink='/dashboard/settings' icon={settingsIcon} label='Paramètres'  /></li>
          <li><NavButton active={window.location.href.includes('/users') ? true : false} redirectLink='/dashboard/users' icon={accountIcon} label='Comptes'  /></li>
          <li><NavButton active={window.location.href.includes('/reports') ? true : false} redirectLink='/dashboard/reports' icon={ticketIcon} label='Plaintes'  /></li>
        </ul>
      </nav>
    </header>
  );
}

export default SideNav;