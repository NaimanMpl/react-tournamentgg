import { gsap, Power3 } from "gsap/gsap-core";
import { Children, useEffect, useRef, useState } from "react";

const Curtain = ({ children, label }) => {

  const screen = useRef(null);
  const [ visible, setVisible ] = useState(false);
  
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(screen.current, {
      duration: 1.2,
      width: '100%',
      left: '0',
      ease: Power3.easeInOut,
      onComplete: () => {
        setVisible(true);
      }
    });

    tl.to(screen.current, {
      duration: 1,
      left: '100%',
      ease: Power3.easeInOut,
      delay: 0.3,
    });

    tl.set(screen.current, { left: '-100%' });
    tl.set('.curtain-label', { opacity: 1 });

  }, []);

  return (
    <>
      <div className="load-container">
        <div className="load-screen" ref={screen}>
          {label && <p className="curtain-label">• {label}</p>}
        </div>
      </div>
      {visible ? children : <></>}
    </>
  );
}

Curtain.defaultProps = {
  label: undefined
}

export default Curtain;