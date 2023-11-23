import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import { useLoginModel } from "../hooks/useLoginModel";
import '../styles/Login.scss';
import Form from "./Form";
import Input from "./Input";

const Login = () => {

  const { formData, setFormData, submit } = useLoginModel();
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user.loggedIn) {
      navigate('/');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name] : value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.login.length < 2 || formData.password.length < 2) {
      return;
    }

    const response = await submit();
    if (response.error) {
      setError(response.error);
      return;
    }

    navigate('/');
  }

  return  (
    <div id="loginpage">
      <h1>Se connecter.</h1>
      <p className='error'>{error}</p>
      <Form onSubmit={handleSubmit} className="login-form">
        <Input onChange={handleChange} type="text" label="Nom d'utilisateur" id="login" placeholder="john.doe" />
        <Input onChange={handleChange} type="password" label="Mot de passe" id="password" placeholder="••••••••••••" />
        {loading ? <Button loading={true} id="loginbtn" label="C'est parti !" /> : <Button id="loginbtn" label="C'est parti !" />}
      </Form>
    </div>
  )
}

export default Login;