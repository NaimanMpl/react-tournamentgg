import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import closeIcon from '../assets/close-dark.svg';
import plus from '../assets/plus.svg';
import Button from '../components/Button';
import { useReportModel } from '../hooks/useReportModel';

const DashboardTitle = ({ id, title, description, subTitle, children }) => {

  const [ reportFormVisible, setReportFormVisible ] = useState(false);
  const { formData, setFormData, validate, submit } = useReportModel();
  const [ error, setError ] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setFormData({...formData, date: currentDate.toISOString().split('T')[0]});
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "confirmpassword") name = "confirmPassword";
    setFormData({...formData, [name]: value});
  }

  const handleClick = async (e) => {
    e.preventDefault();

    const error = await validate();
    if (error !== null) {
      setError(error);
      return;
    }

    const data = await submit();

    if (data.error) {
      setError(data.error);
      return;
    }

    setError('');
    setReportFormVisible(false);
    window.location.reload();

  }

  return (
    <>
      {reportFormVisible && 
      <form className="report-form">
        <p style={{ textAlign: 'center', color: 'red' }} className="error">{error}</p>
        <img style={{maxWidth: '20px', position: 'absolute', top: '2rem', right: '2rem'}} src={closeIcon} alt="Close" />
        <label htmlFor="reason">Raison</label>
        <input onChange={handleChange} type="text" name="reason" id="reason" placeholder='Veuillez saisir une raison' />
        <label htmlFor="description">Description</label>
        <input onChange={handleChange} type="text" name="description" id="description" placeholder='Veuillez saisir une description' />
        <label htmlFor="date">Date</label>
        <input onChange={handleChange} type="date" name="date" id="date" value={currentDate.toISOString().split('T')[0]} />
        <label htmlFor="description">Match</label>
        <input onChange={handleChange} type="text" name="match" id="match" placeholder="Veuillez saisir l'identifiant du match" />
        <label htmlFor="description">Joueur</label>
        <input onChange={handleChange} type="text" name="player" id="player" placeholder="Veuillez saisir l'identifiant du joueur" />
        <Button onClick={handleClick} label="Envoyer" />
      </form>
      }
      <section id={id}>
        <h1 style={{fontSize: '2rem', paddingBottom: '1rem' }}>{title}</h1>
        <p style={{ color: 'var(--light-gray-3)', fontSize: '1.2rem', paddingBottom: '1.3rem' }}>{description}</p>
        {id === 'reports' && 
        <div onClick={() => { setReportFormVisible(true) }} className="plainte-cta" style={{ display: 'flex', gap: '1rem', alignItems: 'center', cursor: 'pointer' }}>
          <span style={{ fontWeight: '600'}}>Ajouter une plainte</span>
          <img src={plus} alt="Plus" />
        </div>
        }
        <h2 style={{ fontSize: '1.7rem ', paddingBottom: '1rem', borderBottom: '1px solid var(--light-gray-2)' }}>{subTitle}</h2>
        {children}
      </section>
    </>
  );
}

DashboardTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
}

export default DashboardTitle;