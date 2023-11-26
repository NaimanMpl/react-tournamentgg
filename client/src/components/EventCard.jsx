import PropTypes from 'prop-types';
import calendarIcon from '../assets/calendar.svg';
import personIcon from '../assets/person.svg';
import { getBase64Image, getGameBackground } from '../services/utils';
import '../styles/components/EventCard.scss';

const EventCard = (props) => {
  const { id, title, game, startDate, endDate, participants } = props;

  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  const eventBgStyle = {
    background: `url(${getGameBackground(game)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '10rem'
  }

  return (
    <a style={{ color: 'var(--black)' }} href={`/event/${id}`}>
      <div className='event'>
        <div style={eventBgStyle} className="event-background"></div>
        <div className='event-data'>
          <h3 className='event-title'>{title}</h3>
          <p className='event-game'>{game}</p>
          <div className='event-date'>
            <img src={calendarIcon} alt='Date' />
            <span>{`${startDate.getDate()} ${startMonth.charAt(0).toUpperCase() + startMonth.slice(1)} - ${endDate.getDate()} ${endMonth.charAt(0).toUpperCase() + endMonth.slice(1)}`}</span>
          </div>
          <div className='event-participants'>
            <img src={personIcon} alt='Person' />
            <span>{participants} participants</span>
          </div>
        </div>
      </div>
    </a>
  );
}

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  participants: PropTypes.number.isRequired
}

export default EventCard;