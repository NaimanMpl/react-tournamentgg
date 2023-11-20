import { useState } from "react";
import { fetchUserByEmail, fetchUserByLogin, registerUser } from "../services/api";

export const useRegistrationModel = () => {
  const [ formData, setFormData ] = useState({
      login: '',
      email: '',
      password: '',
      confirmPassword: ''
  });

  const validate = async () => {
    let errors = {
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (formData.login.length < 2 || formData.login.length === 0) {
      errors.login = "Le nom d'utilisateur doit avoir minimum 2 caractères !";
    }

    if (!emailRegex.test(formData.email) || formData.email.length === 0) {
      errors.email = 'Veuillez saisir une adresse mail valide !';
    }

    if (!passwordRegex.test(formData.password) || formData.password.length === 0) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial !';
    }

    if (formData.confirmPassword !== formData.password || formData.confirmPassword.length === 0) {
      errors.confirmPassword = 'Les 2 mots de passes doivent être identiques !'
    }

    const usersByLogin = await fetchUserByLogin(formData.login);
    const usersByEmail = await fetchUserByEmail(formData.email);


    if (usersByLogin.users.length > 0 && formData.login.length >= 2) {
      errors.login = 'Un utilisateur avec ce nom existe déjà !';
    }

    if (usersByEmail.users.length > 0 && formData.email.length >= 2) {
      errors.email = 'Un utilisateur avec cette adresse email existe déjà !';
    }

    return new Promise(resolve => resolve(errors));
  }

  const submit = async () => {
    
    const request = await registerUser(formData);

    if (request.response.status !== 200) {
      return new Promise(resolve => {
        resolve({
          error: request.data.error
        })
      });
    }

    return new Promise(resolve => { resolve({ success: request.data.success }) });

  }

  return {
    formData,
    setFormData,
    validate,
    submit
  }
}