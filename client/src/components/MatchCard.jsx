import PropTypes from 'prop-types';
import calendarIcon from '../assets/calendar.svg';
import personIcon from '../assets/person.svg';
import winnerCupIcon from '../assets/winner-cup.svg';
import { getBase64Image, getGameBackground, getMatchBackground } from '../services/utils';
import '../styles/components/MatchCard.scss';

const MatchCard = (props) => {
  const { id, title, format, game, date, winner } = props;

  const month = date.toLocaleString('default', { month: 'short' });

  const matchBgStyle = {
    background: `url(${getMatchBackground(game)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '10rem'
  }

  return (
    <div className='match'>
      <div style={matchBgStyle} className="match-background"></div>
      <div className='match-data'>
        <h3 className='match-title'>{title}</h3>
        <p className='match-game'>{game}</p>
        <div className='match-date'>
          <img src={calendarIcon} alt='Date' />
          <span>{`${date.getDate()} ${month.charAt(0).toUpperCase() + month.slice(1)}`}</span>
        </div>
        <div className='match-format'>
          <img src={personIcon} alt='Format' />
          <span>{format}</span>
        </div>
        <div className='match-participants'>
          <img src={winnerCupIcon} alt='Gagnant' />
          <span>{winner}</span>
        </div>
      </div>
    </div>
  );
}

MatchCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
}

export default MatchCard;