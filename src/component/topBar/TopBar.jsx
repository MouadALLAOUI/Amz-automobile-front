import { IconButton, Input } from '@mui/joy';
import { isElectron } from '../../env/environnement';
import { useLocation } from 'react-router-dom';

export default function TopBar({
  isSearchBar = false,
  isLogin = false,
  handdleSettings = () => {},
}) {
  const handleWindowClose = () => {
    window.electron.close();
  };
  const handleWindowMinimize = () => {
    window.electron.minimize();
  };
  const handleWindowSize = () => {
    window.electron.maximize();
  };

  const location = useLocation();

  return (
    <div className="TopBar" id="top-bar">
      {isElectron() ? (
        <>
          <div className="TopBar-left">
            <IconButton className="TopBar-menu-btn" onClick={() => {}}>
              <i className="fa fa-font-awesome" />
            </IconButton>
            {!isSearchBar && (
              <Input
                className="TopBar-menu-search"
                startDecorator={<i className="fa fa-home" />}
                placeholder={`AMZ.AUTOMOBILES${location.pathname}`}
                disabled
              />
            )}
          </div>
          <div className="TopBar-right">
            <IconButton
              className="TopBar-right-windows-control-btn"
              onClick={() => {}}
            >
              <i className="fa fa-moon" />
            </IconButton>
            {!isLogin && (
              <IconButton
                className="TopBar-right-windows-control-btn"
                onClick={handdleSettings}
              >
                <i className="fa fa-cog" />
              </IconButton>
            )}
            <div className="TopBar-right-windows-control-btns-container">
              <IconButton
                className="TopBar-right-windows-control-btn"
                onClick={handleWindowMinimize}
              >
                <i className="fa fa-circle" style={{ color: 'green' }} />
              </IconButton>
              <IconButton
                className="TopBar-right-windows-control-btn"
                onClick={handleWindowSize}
              >
                <i className="fa fa-circle" style={{ color: 'blue' }} />
              </IconButton>
              <IconButton
                className="TopBar-right-windows-control-btn"
                onClick={handleWindowClose}
              >
                <i className="fa fa-circle" style={{ color: 'red' }} />
              </IconButton>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="TopBar-left-browser">
            <IconButton className="TopBar-menu-btn" onClick={() => {}}>
              <i className="fa fa-font-awesome" />
            </IconButton>
            {!isSearchBar && (
              <Input
                type="search"
                className="TopBar-menu-search"
                startDecorator={<i className="fa-solid fa-magnifying-glass" />}
                placeholder="search"
                disabled
                sx={{ width: 300, flexGrow: false }}
              />
            )}
          </div>
          <div className="TopBar-right-browser">
            <IconButton
              className="TopBar-right-windows-control-btn"
              onClick={() => {}}
            >
              <i className="fa fa-moon" />
            </IconButton>
            {!isLogin && (
              <IconButton
                className="TopBar-right-windows-control-btn"
                onClick={handdleSettings}
              >
                <i className="fa fa-cog" />
              </IconButton>
            )}
          </div>
        </>
      )}
    </div>
  );
}
