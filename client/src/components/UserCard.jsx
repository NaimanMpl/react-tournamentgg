import PropTypes from 'prop-types';
import defaultProfilePicture from '../assets/default-pp.svg';
import { getBase64Image } from '../services/utils';
import '../styles/components/UserCard.scss';

const UserCard = ({ points, login, wins, looses, profileIcon }) => {
  return (
    <div className="user-card">
      <div className="user-card--infos">
        <p>{points}</p>
        <span>Points</span>
      </div>
      <div className="user-card--profile">
        <img src={profileIcon === null ? defaultProfilePicture : getBase64Image(profileIcon)} alt="Profile picture" />
        <span>{login}</span>
      </div>
      <div className="user-card--infos">
        <p>{wins}</p>
        <span>Victoires</span>
      </div>
      <div className="user-card--infos">
        <p>{looses}</p>
        <span>Défaites</span>
      </div>
      <div className="user-card--infos">
        <p>{wins + looses === 0 ? 0 : (wins * 100 / (wins + looses)).toFixed(2)}%</p>
        <span>Winrate</span>
      </div>
    </div>
  );

}

UserCard.propTypes = {
  points: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired,
  wins: PropTypes.number.isRequired,
  looses: PropTypes.number.isRequired,
  profileIcon: PropTypes.string.isRequired
}

export default UserCard;