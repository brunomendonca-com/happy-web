import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/create-fosterhome.css';
import api from '../services/api';

const CreateFosterHome: React.FC = () => {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleMapClick = (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('/fosterhomes', data);

    alert('New register created successfully!');

    history.push('/app');
  };

  const handleSelectedImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const selectedImages = [...images];
    selectedImages.push(...Array.from(event.target.files));

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  };

  const handleDeletePreviewImage = (index: number) => {
    const remainingPreviewImages = [...previewImages];
    remainingPreviewImages.splice(index, 1);
    setPreviewImages(remainingPreviewImages);

    const remainingImages = [...images];
    remainingImages.splice(index, 1);
    setImages(remainingImages);
  };

  return (
    <div id="page-create-fosterhome">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-fosterhome-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[51.0527255, -114.0620326]}
              style={{ width: '100%', height: 280 }}
              zoom={13}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 && position.longitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                About
                <span> 300 characters max.</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Pictures</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="image-preview">
                      <img src={image} alt={name} />
                      <button
                        className="delete-image"
                        type="button"
                        onClick={() => handleDeletePreviewImage(index)}
                      >
                        <FiX size={24} color="#FF669D" />
                      </button>
                    </div>
                  );
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                type="file"
                multiple
                id="image[]"
                onChange={handleSelectedImages}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Volunteering</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Opening Hours</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Open on Weekends</label>

              <div className="button-select">
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(true)}
                  className={open_on_weekends ? 'activeYes' : ''}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setOpenOnWeekends(false)}
                  className={!open_on_weekends ? 'activeNo' : ''}
                >
                  No
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateFosterHome;
