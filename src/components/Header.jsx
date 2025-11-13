import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
  const [locationString, setLocationString] = useState('Detecting location...');

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationString('Geolocation not supported');
      return;
    }

    setLocationString('Detecting location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Use OpenStreetMap Nominatim API for reverse geocoding
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );

          const city =
            res.data.address.city ||
            res.data.address.town ||
            res.data.address.village ||
            '';
          const state = res.data.address.state || '';
          const country = res.data.address.country || '';
          setLocationString(
            `${city ? city + ', ' : ''}${state ? state + ', ' : ''}${country}`
          );
        } catch (err) {
          console.error(err);
          setLocationString(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
        }
      },
      (error) => {
        console.error(error);
        setLocationString('Location access denied');
      }
    );
  };

  return (
    <header className="sticky-top shadow-sm bg-white">
      <Container className="d-flex align-items-center justify-content-between py-2">
        <Link to="/" className="text-decoration-none d-flex align-items-center">
          <span
            className="d-inline-flex align-items-center justify-content-center rounded-circle me-2"
            style={{ width: 42, height: 42, background: '#FFF3CD' }}
            aria-hidden="true"
          >
            <span style={{ fontSize: 18 }}>🍔</span>
          </span>
          <span className="fs-5 fw-bold text-warning">Gujeny</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <small className="text-muted">{locationString}</small>
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={detectLocation}
            aria-label="Detect my location"
          >
            Detect Location
          </button>
        </div>
      </Container>
    </header>
  );
}
