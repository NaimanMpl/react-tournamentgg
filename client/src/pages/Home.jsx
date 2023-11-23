import Spline from '@splinetool/react-spline';
import { gsap, Power3 } from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import scrollDownIcon from '../assets/scroll-down-icon.svg';
import Curtain from '../components/Curtain';
import Header from '../components/Header';
import '../styles/Home.scss';

const Home = () => {

	return (
    <>
      <div id="home">
        <Curtain>
          <div id="home-wrapper">
            <Header />
            <Spline scene="https://prod.spline.design/deghLmU9PVmhiTNH/scene.splinecode" />
            <main>
              <section id="hero">
                <div className="hero-container">
                  <div className="title-container">
                    <h1>Parce que votre</h1>
                  </div>
                  <div className="title-container">
                    <h1>basket ne s'arrête</h1>
                  </div>
                  <div className="title-container">
                    <h1>jamais.</h1>
                  </div>
                  <p>Même sous la pluie, un Dimanche, à tout moment, le coach des Lakers peut admirer le joueur qui sommeille en vous </p>
                </div>
              </section>
            </main>
            <img className="hero-scoll-down--cta" src={scrollDownIcon} alt="Scroll down" />
          </div>
        </Curtain>
      </div>
    </>
	);
}

export default Home;