import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../media/logoAmz.jpeg';
import LoginForm from '../../component/loginPage/form';
import TopBar from '../../component/topBar/TopBar';
import GET_ENV, { isElectron } from '../../env/environnement';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setRole, setUser } from '../../store/userSlice';

export default function LoginView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = `${GET_ENV().API_URL}/login`;

  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('admin');
  const [err, setErr] = useState(false);

  useEffect(() => {
    setErr(false);
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(url, { email, password })
      .then((response) => {
        dispatch(setUser(response.data.user));
        dispatch(setRole(response.data.role));
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
        setErr(true);
      });
  };

  return (
    <div className="Login-Page">
      {isElectron() && <TopBar isSearchBar isLogin />}
      <div className="overBackround">
        <div className="LoginLogo">
          <img src={logo} alt="" className="Logo" />
        </div>
        <LoginForm
          isErr={err}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
