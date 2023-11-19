import PropTypes from 'prop-types';
import spinner from '../assets/spinner.svg';

const Button = (props) => {
  const { id, className, label, background, color, loading } = props;

  const style = {
    background: background,
    color: color,
    position: 'relative'
  }

  return (
    <button className={className} id={id} style={style}>
      {loading ? (
        "Chargement..."
      ) : label}
    </button>
  );
}

Button.defaultProps = {
  color: 'var(--white)',
  background: 'var(--black)',
  id: undefined,
  className: undefined,
  loading: false
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool
}

export default Button;