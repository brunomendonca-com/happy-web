import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import api from '../services/api';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/fosterhome.css';

interface Fosterhome {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface FosterhomeParams {
  id: string;
}

const FosterHome: React.FC = () => {
  const params = useParams<FosterhomeParams>();

  const [fosterhome, setFosterhome] = useState<Fosterhome>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/fosterhomes/${params.id}`).then(response => {
      setFosterhome(response.data);
    });
  }, [params.id]);

  if (!fosterhome) {
    return <p>Loading...</p>;
  }

  return (
    <div id="page-fosterhome">
      <Sidebar />
      <main>
        <div className="fosterhome-details">
          <img
            src={fosterhome.images[activeImageIndex].url}
            alt={fosterhome.name}
          />

          <div className="images">
            {fosterhome.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={fosterhome.name} />
                </button>
              );
            })}
          </div>

          <div className="fosterhome-details-content">
            <h1>{fosterhome.name}</h1>
            <p>{fosterhome.about}</p>

            <div className="map-container">
              <Map
                center={[fosterhome.latitude, fosterhome.longitude]}
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
                  position={[fosterhome.latitude, fosterhome.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${fosterhome.latitude},${fosterhome.longitude}`}
                >
                  Get directions on Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Volunteering Instructions</h2>
            <p>{fosterhome.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Monday to Friday
                <br />
                {fosterhome.opening_hours}
              </div>
              {fosterhome.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  We are open
                  <br />
                  on weekends
                </div>
              ) : (
                  <div className="open-on-weekends not-open">
                    <FiInfo size={32} color="#ff669d" />
                  We are not open
                    <br />
                  on weekends
                  </div>
                )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Contact us
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FosterHome;
