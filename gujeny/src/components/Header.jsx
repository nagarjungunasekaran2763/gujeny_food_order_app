import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header({ locationString, onDetect }) {
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
          <span className="fs-5 fw-bold text-warning">Gujeney</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <small className="text-muted">
            {locationString || 'Detecting location...'}
          </small>
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={onDetect}
            aria-label="Detect my location"
          >
            Detect Location
          </button>
        </div>
      </Container>
    </header>
  );
}
