import '../styles/Register.scss';
import Form from './Form';
import Input from './Input';

const Register = () => {
  return (
    <div id="registerpage">
      <h1>S'inscrire.</h1>
      <Form>
        <Input type="text" label="Nom d'utilisateur" id="username" placeholder="john.doe" />
        <Input type="text" label="Adresse email" id="email" placeholder="john.doe@gmail.com" />
        <Input type="password" label="Mot de passe" id="password" placeholder="••••••••" />
        <Input type="password" label="Confirmer le mot de passe" id="confirm-password" placeholder="••••••••" />
        <button id="registerbtn" type="submit">C'est parti !</button>
      </Form>
    </div>
  )
}

export default Register;