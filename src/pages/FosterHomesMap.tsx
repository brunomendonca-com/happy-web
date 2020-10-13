import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from "react-leaflet";

import mapMarkerImg from '../images/map-marker.svg';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/foster-homes-map.css';

const FosterHomesMap: React.FC = () => {

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
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
      </Map>

      <Link to="" className="create-foster-home" >
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default FosterHomesMap;