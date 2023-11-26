import PropTypes from 'prop-types';
import selector from '../assets/arrow-down.svg';
import trashIcon from '../assets/trash.svg';
import { getBase64Image } from '../services/utils';
import '../styles/components/AccountCard.scss';

const AccountCard = (props) => {
  const { login, email, profilePicture, admin, canDelete } = props;
  return (
    <div className="account-card">
      {
        profilePicture === null ? 
        (
          <div className='account-card--pp'>
            <span>{login.charAt(0)}</span>
          </div>
        ) 
        : 
        (
          <img className='account-card--pp' src={getBase64Image(profilePicture)} alt="Photo de profil" />
        )
      }
      <div className="account-card--infos">
        <h2>{login}</h2>
        <p>{email}</p>
      </div>
      <div className='account-card--roles-selector-container'>
        <div className="account-card--roles-selector">
          <div>
            <p>{admin ? 'Administrateur' : 'Joueur'}</p>
            <img src={selector} alt="Choisir" />
          </div>
        </div>
        {canDelete && <img className='account-delete--cta' src={trashIcon} alt="Supprimer" />}
      </div>
    </div>
  );
}

AccountCard.defaultProps = {
  canDelete: true
}

AccountCard.propTypes = {
  login: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
  admin: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool
}

export default AccountCard;