import React, { useRef } from 'react';
import { useRegistrationModel } from '../hooks/useRegistrationModel';
import '../styles/Register.scss';
import Form from './Form';
import Input from './Input';


const Register = () => {

  const { formData, setFormData, valdate, submit } = useRegistrationModel();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "confirmpassword") name = "confirmPassword";
    setFormData({...formData, [name]: value});
  }

  return (
    <div id="registerpage">
      <h1>S'inscrire.</h1>
      <Form onSubmit={handleSubmit}>
        <Input onChange={handleChange} ref={usernameRef} type="text" label="Nom d'utilisateur" id="login" placeholder="john.doe" />
        <Input onChange={handleChange} ref={emailRef} type="text" label="Adresse email" id="email" placeholder="john.doe@gmail.com" />
        <Input onChange={handleChange} ref={passwordRef} type="password" label="Mot de passe" id="password" placeholder="••••••••" />
        <Input onChange={handleChange} ref={confirmPasswordRef} type="password" label="Confirmer le mot de passe" id="confirmpassword" placeholder="••••••••" />
        <button id="registerbtn" type="submit">C'est parti !</button>
      </Form>
    </div>
  )
}

export default Register;