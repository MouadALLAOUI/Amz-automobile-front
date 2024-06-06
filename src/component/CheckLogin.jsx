// import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  // userRoleSelector,
  userSelector
} from "../store/userSlice";
// import { useNavigate } from "react-router-dom";
import LoginView from "../views/Login/LoginView";


function CheckLogin({ Component }) {
  const user = useSelector(userSelector);
  // const role = useSelector(userRoleSelector);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (role !== "DEV") {
  //     if (Component === 'ReglagesView') {
  //       navigate("/pharma");
  //     }
  //   }
  //   if (role === "LIRE") {
  //     if (Component === 'EntreesView' || Component === 'SortiesView') {
  //       navigate("/pharma");
  //     }
  //   }
  // }, []);
  return (
    user === null ? <LoginView /> : <Component />
  );
}

export default CheckLogin;