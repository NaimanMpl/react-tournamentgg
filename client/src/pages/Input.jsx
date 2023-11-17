import React from 'react';
import '../styles/components/Input.scss';

const Input = React.forwardRef((props, ref) => {
  const { id, label, type, placeholder, onChange } = props;
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input onChange={onChange} ref={ref} className="input-field" type={type} placeholder={placeholder} id={id} name={id} />
    </>
  );
});

export default Input;