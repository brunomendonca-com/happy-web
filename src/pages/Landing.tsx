import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg';

const Landing: React.FC = () => {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <main>
          <h1>Bring some happiness to the world</h1>
          <p>Visit foster care homes and change a child's day.</p>
        </main>

        <div className="location">
          <strong>Calgary</strong>
          <span>Alberta</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={32} color="rgba(0, 0, 0, 0.5)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;