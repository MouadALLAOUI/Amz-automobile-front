import {
  HashRouter,
  // BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import LoginView from '../views/Login/LoginView';
import Templates from '../views/Templates';
import CheckLogin from '../component/CheckLogin';
import Welcome from '../views/content/welcome';
import Rapport from '../views/content/Rapport';
import PrintPdf from '../views/content/pdfs';
import Tasks from '../views/content/tasks/tasks';
import About from '../views/content/about';
import NotFoundPage from '../views/notfound';
import Employers from '../views/content/employers';

function Routers() {
  // const electron = window.electron;
  return (
    <HashRouter basename="/">
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="home" element={<CheckLogin Component={Templates} />}>
          <Route index element={<CheckLogin Component={Welcome} />} />
          <Route path="rapport" element={<CheckLogin Component={Rapport} />} />
          <Route
            path="print-pdf"
            element={<CheckLogin Component={PrintPdf} />}
          />
          <Route path="tasks" element={<CheckLogin Component={Tasks} />} />
          <Route path="about" element={<CheckLogin Component={About} />} />
          <Route path="employers" element={<CheckLogin Component={Employers} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* </BrowserRouter> */}
    </HashRouter>
  );
}

export default Routers;
