import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapIcon from '../utils/mapIcon';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/foster-homes-map.css';
import api from '../services/api';

interface Fosterhome {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const FosterHomesMap: React.FC = () => {
  const [fosterhomes, setFosterhomes] = useState<Fosterhome[]>([]);

  useEffect(() => {
    api.get('/fosterhomes').then(response => {
      setFosterhomes(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="HappyMarker" />

          <h2>Pick a foster home in the map</h2>
          <p>Many children are waiting for you.</p>
        </header>

        <footer>
          <strong>Calgary</strong>
          <span>Alberta</span>
        </footer>
      </aside>

      <Map
        center={[51.0458017, -114.078731]}
        zoom={11}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {fosterhomes.map(fosterhome => {
          return (
            <Marker
              position={[fosterhome.latitude, fosterhome.longitude]}
              icon={mapIcon}
              key={`${fosterhome.id}-${fosterhome.name}`}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {fosterhome.name}
                <Link to={`/fosterhomes/${fosterhome.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/fosterhomes/create" className="create-foster-home">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
};

export default FosterHomesMap;
