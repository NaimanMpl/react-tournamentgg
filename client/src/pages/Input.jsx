import '../styles/components/Input.scss';

const Input = ({ id, label, type, placeholder }) => {

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input className="input-field" type={type} placeholder={placeholder} />
    </>
  );
}

export default Input;