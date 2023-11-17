import { useState } from "react";

export function useRegistrationModel() {
    const [ formData, setFormData ] = useState({
        login: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    function validate() {
        const errors = {};

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

        if (formData.login.length < 2) {
            errors.login = "Le nom d'utilisateur doit avoir minimum 2 caractères !";
        }

        if (!emailRegex.test(formData.email)) {
            errors.email = 'Veuillez saisir une adresse mail valide !';
        }

        if (!passwordRegex.test(formData.password)) {
            errors.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un caractère spécial !';
        }


    }

    function submit() {
        
    }

    return {
        formData,
        setFormData,
        validate,
        submit
    }
}