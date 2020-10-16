import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/fosterhome.css';

const FosterHome: React.FC = () => {
  return (
    <div id="page-fosterhome">
      <Sidebar />
      <main>
        <div className="fosterhome-details">
          <img
            src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
            alt="Closer to Home"
          />

          <div className="images">
            <button className="active" type="button">
              <img
                src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
                alt="Closer to Home"
              />
            </button>
            <button type="button">
              <img
                src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
                alt="Closer to Home"
              />
            </button>
            <button type="button">
              <img
                src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
                alt="Closer to Home"
              />
            </button>
            <button type="button">
              <img
                src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
                alt="Closer to Home"
              />
            </button>
            <button type="button">
              <img
                src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
                alt="Closer to Home"
              />
            </button>
            <button type="button">
              <img
                src="https://mk0topagayop5ios32yd.kinstacdn.com/wp-content/uploads/FRN_cropped.jpg"
                alt="Closer to Home"
              />
            </button>
          </div>

          <div className="fosterhome-details-content">
            <h1>Closer to Home</h1>
            <p>
              Closer to Home Community Services (CTH) is a charitable
              organization located in Calgary that offers a wide range of
              services designed to meet the unique needs of children, youth and
              families.
            </p>

            <div className="map-container">
              <Map
                center={[-27.2092052, -49.6401092]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[-27.2092052, -49.6401092]}
                />
              </Map>

              <footer>
                <a href="">Get directions on Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Volunteering Instructions</h2>
            <p>
              Volunteers are treated with dignity, respect and consideration. We
              aim to create the best fit between our volunteers, programs,
              staff, children, youth and families.
            </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Monday to Friday
                <br />
                8:00am to 6:00pm
              </div>
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                We are open
                <br />
                at weekends
              </div>
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Contact us
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FosterHome;
