import { gsap } from 'gsap/gsap-core';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profileIcon from '../assets/profilepicture.png';
import smashBg from '../assets/smashbg.png';
import Button from '../components/Button';
import Curtain from '../components/Curtain';
import Header from '../components/Header';
import MatchCard from '../components/MatchCard';
import UserCard from '../components/UserCard';
import { useAuth } from '../contexts/AuthContext';
import { fetchEvent, fetchEventMatchs, joinTournament } from '../services/api';
import { getGameBackground } from '../services/utils';
import '../styles/Event.scss';

const Event = () => {
  const { id } = useParams();
  const [ eventData, setEventData ] = useState({
    id: '',
    title: '',
    game: '',
    users: [],
  });
  const [ matchData, setMatchData ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ buttonLabel, setButtonLabel ] = useState('Rejoindre');
  const [ loggedIn, setLoggedIn ] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (!user.loggedIn) {
      setLoggedIn("Vous n'êtes pas connecté");
      return;
    }
    
    setLoggedIn(`Bienvenue ${user.login}`);
    if (user.events.includes(parseInt(id))) setButtonLabel('Inscrit');
  }, [user]);

  useEffect(() => {
    
    const fetchEventData = async () => {
      const event = await fetchEvent(id);

      if (event == null) return;

      setEventData({ 
        id: event.id, 
        title: event.title,
        description: event.description,
        game: event.game.title,
        users: event.users
      });
      setLoading(false);
    }

    const fetchMatchData = async () => {
      const matchs = await fetchEventMatchs(id);
      setMatchData(matchs.matchs);
    }

    fetchMatchData();
    fetchEventData();
  }, []);

  const handleJoin = async () => {
    if (!user.loggedIn) {
      navigate('/login');
      return;
    }
    if (user.events.includes(parseInt(id))) {
      return;
    }
    setButtonLabel('Chargement...');
    const response = await joinTournament(eventData.id);

    if (response.code === 401 || response.code === 404) {
      setButtonLabel('Rejoindre');
      return;
    }
    
    if (response.code === 200) {
      setButtonLabel('Inscrit');
    }
  }
  
  const backgroundStyle = {
    background: `linear-gradient(90deg, rgba(0, 0, 0, 0.80) -16.72%, rgba(0, 0, 0, 0.00) 94.17%), url(${getGameBackground(eventData.game)}), lightgray 50%`,
    backgroundPosition: 'top',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
  }
  
  return (
    <>
      <Curtain label={eventData.title}>
        {loading ? (
          <div id="eventpage">
            <Header />
          </div>
        ) : (
          <>
            <div style={backgroundStyle} id="eventpage">
              <Header />
              <section className="event-hero">
                <h1 className='event-title'>{eventData.title}</h1>
                <h2 className='event-author'>Me and the homies</h2>
                <p className='event-description'>{eventData.description}</p>
                <Button onClick={handleJoin} id='event-join--btn' color='var(--white)' background='transparent' label={buttonLabel} />
              </section>
            </div>
            <section className="event-users">
              <div className="event-users-title--container">
                <h2 className="event-users--title">Participants</h2>
              </div>
              <div className="event-users-container">
                {eventData.users.map((user) => {
                  return (
                    <UserCard
                      key={user.id}
                      profileIcon={profileIcon}
                      wins={user.wins}
                      looses={user.looses}
                      points={user.points}
                      login={user.login}
                    />
                  );
                })}
              </div>
            </section>
            <section className="event-matchs">
              <h2>Matchs</h2>
              <div className="event-matchs--container">
                {matchData.map((match) => {
                  return (
                    <MatchCard
                      key={match.id}
                      id={match.id}
                      title={`${match.player1} vs ${match.player2}`}
                      format={match.format}
                      game={match.gameTitle}
                      date={new Date(match.date)}
                      winner={match.winner}
                    />
                  )
                })}
              </div>
            </section>
          </>
        )}
      </Curtain>
    </>
  );
}

export default Event;