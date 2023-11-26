import PropTypes from 'prop-types';
import { useState } from 'react';

const NavButton = (props) => {
  const { redirectLink, label, icon, active } = props;

  const [ hovered, setHovered ] = useState(false);

  return (
    <a
      style={
        { 
          display: 'flex', 
          alignItems: 'center', 
          gap: '.7rem', 
          background: active === true ? 'var(--light-purple)' : hovered === true ? 'var(--light-purple)' : 'transparent',
          padding: '.6rem 1rem',
          borderRadius: '.5rem'
        }
      }
      className='side-nav--button' 
      onMouseEnter={() => { setHovered(true) }} 
      onMouseLeave={() => { if (!active) setHovered(false) }} 
      href={redirectLink}
    >
      <img style={{ maxWidth: '20px' }} src={icon} alt="Icone" />
      {label}
    </a>
  );
}

NavButton.defaultProps = {
  active: false
}

NavButton.propTypes = {
  redirectLink: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool
}

export default NavButton;