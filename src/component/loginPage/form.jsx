import { useState } from 'react';
import Input from '../input/input';
import { Button } from '@mui/joy';

function LoginForm({
  isErr = false,
  email = '',
  setEmail = () => { },
  password = '',
  setPassword = () => { },
  handleSubmit = () => { },
}) {
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const [passwordInputType, setPasswordInputType] = useState('password');
  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      <p>Se connecter</p>
      <Input
        type="text"
        name="userName"
        id="userName"
        value={email}
        isErr={isErr}
        placeholder="nom d’utilisateur"
        onChange={handleEmailChange}
      />
      <Input
        IsAIco
        AIco="fa-solid fa-eye"
        type={passwordInputType}
        name="userPass"
        id="userPass"
        value={password}
        isErr={isErr}
        placeholder="mot de passe"
        onChange={handlePasswordChange}
        onAIcoClicked={() => setPasswordInputType(passwordInputType == 'password' ? 'text' : 'password')}
      // IsBIco
      />
      <Button
        color="neutral"
        size="lg"
        variant="solid"
        type="submit"
        sx={{ bgcolor: '#000' }}
      >
        Se connecter
      </Button>
    </form>
  );
}

export default LoginForm;
