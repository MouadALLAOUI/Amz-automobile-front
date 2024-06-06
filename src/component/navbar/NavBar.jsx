import { NavLink } from 'react-router-dom';
import NavLinkBtn from '../navlinkbtn/navlinkbtn';
import { useSelector } from 'react-redux';
import { userRoleSelector } from '../../store/userSlice';

export default function NavBar({ setOpenDrawer = () => {} }) {
  const role = useSelector(userRoleSelector);
  return (
    <div className="NavBar">
      <div className="link-div">
        <div className="Group home">
          <NavLink
            className="link"
            to="./"
            onClick={() => setOpenDrawer(false)}
          >
            <NavLinkBtn Ico="fa-solid fa-home" text="ACCUEIL" />
          </NavLink>
        </div>
        <div className="Group links">
          <NavLink
            className="link"
            to="tasks"
            onClick={() => setOpenDrawer(false)}
          >
            <NavLinkBtn Ico="fa-solid fa-tasks" text="TASKS" />
          </NavLink>
          <NavLink
            className="link"
            to="rapport"
            onClick={() => setOpenDrawer(false)}
          >
            <NavLinkBtn Ico="fa-solid fa-chart-line" text="RAPPORT" />
          </NavLink>
          <NavLink
            className="link"
            to="print-pdf"
            onClick={() => setOpenDrawer(false)}
          >
            <NavLinkBtn Ico="fa-solid fa-print" text="PRINT TASKS" />
          </NavLink>
          {role === 'ADMIN' && (
            <>
              <NavLink
                className="link"
                to="employers"
                onClick={() => setOpenDrawer(false)}
              >
                <NavLinkBtn Ico="fa-solid fa-users-gear" text="Employers" />
              </NavLink>
            </>
          )}
          <NavLink
            className="link"
            to="about"
            onClick={() => setOpenDrawer(false)}
          >
            <NavLinkBtn Ico="fa-solid fa-info-circle" text="ABOUT" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
