import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import selector from '../assets/arrow-down.svg';
import check from '../assets/check.svg';
import trashIcon from '../assets/trash.svg';
import { updateReport } from '../services/api';
import { getBase64Image } from '../services/utils';
import '../styles/components/ReportCard.scss';

const ReportCard = (props) => {
  const { id, profilePicture, login, email, reason, description, status, onDelete, onStatusChange } = props;

  const [ optionHidden, setOptionHidden ] = useState(true);
  const [ currentStatus, setCurrentStatuts ] = useState(status);

  useEffect(() => {
    const updateReportStatus = async () => {
      const response = await updateReport(id, currentStatus);

      if (response.error) return;

    }

    updateReportStatus();
  }, [currentStatus]);

  return (
    <div className="report-card">
      {
        profilePicture === null ? 
        (
          <div className='report-card--pp'>
            <span>{login.charAt(0)}</span>
          </div>
        ) 
        : 
        (
          <img className='report-card--pp' src={getBase64Image(profilePicture)} alt="Photo de profil" />
        )
      }
      <div className="report-card--infos">
        <h2 className="report-card--login">{login}</h2>
        <p className="report-card--email">{email}</p>
      </div>
      <p className='report-card--reason'>{reason}</p>
      <p className='report-card--description'>{description}</p>
      <div className='report-card--roles-selector-container'>
        <div className="report-card--roles-selector" onClick={() => { setOptionHidden(optionHidden => !optionHidden) }}>
          <div className="report-card--roles-current">
              <p>{currentStatus}</p>
              <img src={selector} alt="Choisir" />
          </div>
          {!optionHidden && 
          <div className="report-card--options">
            <span onClick={() => { setCurrentStatuts('Refusé'); }} className={ currentStatus === 'Refusé' ? 'selected' : undefined }>Refusé</span>
            <span onClick={() => { setCurrentStatuts('En cours'); }} className={ currentStatus === 'En cours' ? 'selected' : undefined }>En cours</span>
            <span onClick={() => { setCurrentStatuts('Traité'); }} className={ currentStatus === 'Traité' ? 'selected' : undefined }>Traité</span>
          </div>
          }
        </div>
        <img onClick={onDelete} className='report-delete--cta' src={trashIcon} alt="Supprimer" />
      </div>
    </div>
  );
}

ReportCard.propTypes = {
  id: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
  login: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
}

export default ReportCard;