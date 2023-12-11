import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import selector from '../assets/arrow-down.svg';
import trashIcon from '../assets/trash.svg';
import { updateAccount } from '../services/api';
import { getBase64Image } from '../services/utils';
import '../styles/components/AccountCard.scss';

const AccountCard = (props) => {
  const { id, login, email, profilePicture, admin, canDelete } = props;
  const [ optionHidden, setOptionHidden ] = useState(true);
  const [ currentStatus, setCurrentStatuts ] = useState(admin ? 'Administrateur' : 'Joueur');

  useEffect(() => {
    const updateAccountStatus = async () => {
      const response = await updateAccount(id, currentStatus);

      if (response.error) return;

    }

    updateAccountStatus();
  }, [currentStatus]);

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
        <div className="account-card--roles-selector" onClick={() => { setOptionHidden(optionHidden => !optionHidden) }} >
          <div className="account-card--roles-current">
              <p>{currentStatus}</p>
              <img src={selector} alt="Choisir" />
          </div>
          {!optionHidden && 
          <div className="account-card--options">
            <span onClick={() => { setCurrentStatuts('Administrateur'); }} className={ currentStatus === 'Administrateur' ? 'selected' : undefined }>Administrateur</span>
            <span onClick={() => { setCurrentStatuts('Joueur'); }} className={ currentStatus === 'Joueur' ? 'selected' : undefined }>Joueur</span>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

AccountCard.defaultProps = {
  canDelete: true
}

AccountCard.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
  admin: PropTypes.bool.isRequired,
  canDelete: PropTypes.bool
}

export default AccountCard;