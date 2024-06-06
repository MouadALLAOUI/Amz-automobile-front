import { Lang } from '../../env/environnement';
import logo from '../../media/logoAmz.jpeg';

function Welcome() {
  return (
    <div className="Welcome">
      <p className="bienvenu-text">{Lang.WELCOME.welcoming}</p>
      <div className="bg-imgLogo">
        <img className="logoBienvenu" src={logo} alt="" />
      </div>
    </div>
  );
}

export default Welcome;
