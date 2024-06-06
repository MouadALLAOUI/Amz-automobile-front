import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from '../component/navbar/NavBar';
import TopBar from '../component/topBar/TopBar';
import SettingModal from '../component/setting/settingModal';
import { setUser } from '../store/userSlice';

function Templates() {
  const [settingModal, setSettingModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDecconnect = () => {
    setSettingModal(false);
    dispatch(setUser(null));
    navigate('/');
  };

  const handdleSettings = () => {
    setSettingModal(!settingModal);
  };

  return (
    <div className="App-Conatiner">
      <div className="nav-bar">
        <TopBar handdleSettings={handdleSettings} />
        <NavBar />
      </div>
      <div>
        <SettingModal
          open={settingModal}
          setOpen={setSettingModal}
          onDecconect={() => onDecconnect()}
        />
      </div>
      <div className="content-wrapper">
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Templates;
