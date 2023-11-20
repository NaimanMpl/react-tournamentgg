import { useState } from "react";
import { loginUser } from "../services/api";

export const useLoginModel = () => {
  const [ formData, setFormData ] = useState({
    login: '',
    password: ''
  });

  const submit = async () => {
    const request = await loginUser(formData);
    if (request.response.status !== 301) {
      return new Promise(resolve => {
        resolve({ error: request.data.error });
      });
    }
    
    return new Promise(resolve => {
      resolve({ response: request.response });
    });
  }

  return {
    formData,
    setFormData,
    submit
  }
}