import PropTypes from 'prop-types';

const Form = ({ children, className, onSubmit }) => {
  
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

Form.defaultProps = {
  className: undefined
}

export default Form;