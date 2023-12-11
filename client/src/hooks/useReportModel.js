import { useState } from "react";
import { createPost } from "../services/api";

export const useReportModel = () => {
  const [ formData, setFormData ] = useState({
      reason: '',
      description: '',
      date: '',
      match: '',
      player: ''
  });

  const validate = async () => {
    let error = null;

    if (formData.reason.length === 0) {
      error = "Veuillez saisir une raison !";
    }

    if (formData.description.length === 0) {
      error = "Veuillez saisir une description !";
    }

    if (formData.date.length === 0) {
      error = "Veuillez saisir une date !";
    }

    if (formData.match.length === 0) {
      error = "Veuillez saisir un match !";
    }

    if (formData.player.length === 0) {
      error = "Veuillez saisir un joueur !";
    }

    return new Promise(resolve => resolve(error));
  }

  const submit = async () => {
    
    const request = await createPost(formData);

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