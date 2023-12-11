import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import Curtain from '../components/Curtain';
import { useRegistrationModel } from '../hooks/useRegistrationModel';
import '../styles/Register.scss';
import Form from './Form';
import Input from './Input';

const Register = () => {

  const { formData, setFormData, validate, submit } = useRegistrationModel();
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const inputs = {
    login: {
      ref: useRef(null),
      dialogRef: useRef(null)
    },
    email: {
      ref: useRef(null),
      dialogRef: useRef(null)
    },
    password: {
      ref: useRef(null),
      dialogRef: useRef(null)
    },
    confirmPassword: {
      ref: useRef(null),
      dialogRef: useRef(null)
    }
  }

  const handleErrors = (errors) => {
    let error = false;

    for (const [key, value] of Object.entries(errors)) {
      const input = inputs[key];
      if (value.length > 0 && formData[key].length > 0) {
        input.ref.current.classList.add('input-error');
        input.dialogRef.current.textContent = value;
        error = true;
      } else {
        input.ref.current.classList.remove('input-error');
        input.dialogRef.current.textContent = '';
      }
    }
    
    return error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    const anyError = handleErrors(errors);

    let anyEmptyField = false;

    for (const [key, value] of Object.entries(formData)) {
      if (value.length === 0) {
        inputs[key].ref.current.classList.add('input-error');
        inputs[key].dialogRef.current.textContent = 'Ce champ est requis !';
        anyEmptyField = true;
      }
    }

    if (anyError || anyEmptyField) return;

    setLoading(true);
    const data = await submit();
    setLoading(false);

    if (data.error) {
      setError(data.error);
      return;
    }

    setError('Inscription finalisée avec succès.');
    
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "confirmpassword") name = "confirmPassword";
    setFormData({...formData, [name]: value});
  }

  useEffect(() => {

    const updateInputs = async () => {
      const errors = await validate();

      handleErrors(errors);
    }

    updateInputs();
  }, [formData]);

  return (
    <Curtain label="Inscription">
      <div id="registerpage">
        <h1>S'inscrire.</h1>
        <p className='error'>{error}</p>
        <Form onSubmit={handleSubmit} className="register-form">
          <Input onChange={handleChange} ref={inputs.login.ref} type="text" label="Nom d'utilisateur" id="login" placeholder="john.doe" />
          <span style={{ color: 'red', fontSize: '0.8rem' }} ref={inputs.login.dialogRef} className="username-dialog"></span>
          <Input onChange={handleChange} ref={inputs.email.ref} type="text" label="Adresse email" id="email" placeholder="john.doe@gmail.com" />
          <span style={{ color: 'red', fontSize: '0.8rem' }} ref={inputs.email.dialogRef} className="email-dialog"></span>
          <Input onChange={handleChange} ref={inputs.password.ref} type="password" label="Mot de passe" id="password" placeholder="••••••••••••" />
          <span style={{ color: 'red', fontSize: '0.8rem' }} ref={inputs.password.dialogRef} className="password-dialog"></span>
          <Input onChange={handleChange} ref={inputs.confirmPassword.ref} type="password" label="Confirmer le mot de passe" id="confirmpassword" placeholder="••••••••••••" />
          <span style={{ color: 'red', fontSize: '0.8rem' }} ref={inputs.confirmPassword.dialogRef} className="confirm-password-dialog"></span>
          {loading ? <Button loading={true} id="registerbtn" label="C'est parti !" /> : <Button id="registerbtn" label="C'est parti !" />}
        </Form>
      </div>
    </Curtain>
  )
}

export default Register;