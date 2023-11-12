import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { useEffect, useLayoutEffect, useState } from 'react';
import scrollDownIcon from '../assets/scroll-down-icon.svg';
import Header from '../components/Header';
import '../styles/Home.scss';

const Home = () => {

	const [ loading, setLoading ] = useState(true);
	const titleRef1 = useState(null);
	const titleRef2 = useState(null);
	const titleRef3 = useState(null);
	
	return (
		<div id="home">
			<div id="home-wrapper">
				<Header />
				<Spline onLoad={() => setLoading(false)} scene="https://prod.spline.design/deghLmU9PVmhiTNH/scene.splinecode" />
				<main>
					<section id="hero">
						<div className="hero-container">
							<div className="title-container">
								<h1 ref={titleRef1}>Parce que votre</h1>
							</div>
							<div className="title-container">
								<h1 ref={titleRef2}>basket ne s'arrête</h1>
							</div>
							<div className="title-container">
								<h1 ref={titleRef3}>jamais.</h1>
							</div>
							<p>Même sous la pluie, un Dimanche, à tout moment, le coach des Lakers peut admirer le joueur qui sommeille en vous </p>
						</div>
					</section>
				</main>
				<img className="hero-scoll-down--cta" src={scrollDownIcon} alt="Scroll down" />
			</div>
		</div>
	);
}

export default Home;