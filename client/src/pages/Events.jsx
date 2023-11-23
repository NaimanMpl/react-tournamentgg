import { gsap } from "gsap";
import { useEffect, useState } from "react";
import Curtain from "../components/Curtain";
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import { fetchEvents } from "../services/api";
import '../styles/Events.scss';

const Events = () => {

  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      const data = await fetchEvents();
      setEvents(data.events);
    }

    fetchEventsData();

    const context = gsap.context(() => {

      gsap.from('h1', { y: 100, duration: 1, delay: 1.5 });
      gsap.to('h1', { y: 0, duration: 1, delay: 1.5 });

      gsap.from('.line', { width: 0, duration: 1.5, delay: 1.5 });
      gsap.to('.line', { width: '100%', duration: 1.5, delay: 1.5 });
    });

    return () => context.revert();
  }, []);

  return (
    <>
      <Curtain>
        <Header color="#222222" />
        <div id="eventspage">
          <div className="events-page--title">
            <h1>Evenements</h1>
          </div>
          <div className="line"></div>
          <section className="events">
            <h2>Evenements en cours</h2>
            <div className="events-container">
              {events.map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    game={event.game.title}
                    startDate={new Date(event.start)}
                    endDate={new Date(event.end)}
                    participants={parseInt(event.participant)}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </Curtain>
    </>
  )
}

export default Events;