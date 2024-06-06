import Input from '../input/input';
import {Button} from '@mui/joy';

function LoginForm({
  isErr = false,
  setEmail = () => {},
  setPassword = () => {},
  handleSubmit = () => {},
}) {
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit} className="LoginForm">
      <p>Se connecter</p>
      <Input
        type="text"
        name="userName"
        id="userName"
        isErr={isErr}
        placeholder="nom d’utilisateur"
        onChange={handleEmailChange}
      />
      <Input
        IsAIco
        AIco="fa-solid fa-eye"
        type="password"
        name="userPass"
        id="userPass"
        isErr={isErr}
        placeholder="mot de passe"
        onChange={handlePasswordChange}
        IsBIco
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
