import React from 'react';
import { useNavigate } from 'react-router-dom';
import notfound404 from '../media/404.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="text-section">
          <h2 className="error-code">Ooops... </h2>
          <h2 className="error-message">404 Page not found</h2>
          <p>
            this page those not exist or we still work on please try onother page.
          </p>
          <button className="go-back-btn" onClick={() => navigate(-1)}>
            Go Back →
          </button>
        </div>
        <div className="image-section">
          <img src={notfound404} alt="404 Illustration" className="not-found-image" />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
