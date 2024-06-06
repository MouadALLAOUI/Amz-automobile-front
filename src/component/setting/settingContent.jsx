import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userSelector } from '../../store/userSlice';

export default function SettingContent({
  onClose = () => {},
  onDecconect = () => {},
}) {
  const user = useSelector(userSelector);
  return (
    <div className="setting-content">
      <h3 className="setting-content-title">Settings</h3>
      <div className="setting-content-list">
        <div className="setting-content-user-div">
          <div className="icon"><p>{user.nom[0]}</p></div>
          <div className="text">
            <p className="name">{user.nom} {user.prenom}</p>
            <p className="email">{user.email}</p>
          </div>
        </div>
        <div className="setting-content-list-container">
          <NavLink
            className="setting-content-list-item"
            to="./general"
            onClick={onClose}
          >
            <h3>General</h3>
            <i className="fa-solid fa-gear" />
          </NavLink>
          <NavLink
            className="setting-content-list-item"
            to="./general"
            onClick={onClose}
          >
            <h3>Profile</h3>
            <i className="fa-solid fa-user" />
          </NavLink>
          <NavLink
            className="setting-content-list-item deconect"
            to="./déconnecter"
            onClick={onDecconect}
          >
            <h3>déconnecter</h3>
            <i className="fa-solid fa-portal-exit" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
