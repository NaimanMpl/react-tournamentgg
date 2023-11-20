import { gsap } from 'gsap/gsap-core';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import calendarIcon from '../assets/calendar.svg';
import leagueoflegendsbg from '../assets/leagueoflegends.webp';
import minecraftBg from '../assets/minecraftbg.jpeg';
import personIcon from '../assets/person.svg';
import rocketLeagueBg from '../assets/rocketleague.jpeg';
import smashBg from '../assets/smashbg.png';
import valorantBg from '../assets/valorant.webp';

const Event = (props) => {
  const { title, game, startDate, endDate, participants } = props;

  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const endMonth = endDate.toLocaleString('default', { month: 'short' });

  const getGameBackground = () => {
    switch (game) {
      case 'League of Legends':
        return leagueoflegendsbg;
      case 'Valorant':
        return valorantBg;
      case 'Minecraft':
        return minecraftBg;
      case 'Rocket League':
        return rocketLeagueBg;
      case 'Smash Bros Ultimate':
        return smashBg;
      case 'Celeste':
        return celesteBg;
      default:
        return valorantBg;
    }
  }

  const eventBgStyle = {
    background: `url(${getGameBackground()})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '10rem'
  }

  return (
    <a style={{ color: 'var(--black)' }} href="#">
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

Event.propTypes = {
  title: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  participants: PropTypes.number.isRequired
}

export default Event;