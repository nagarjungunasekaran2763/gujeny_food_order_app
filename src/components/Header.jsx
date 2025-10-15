import React from 'react';

export default function Header({ locationString, onDetect }) {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <h3 className="m-0 fw-bold text-danger">Zomato Clone</h3>
        <div>
          <small className="text-muted me-3">
            {locationString || 'Detecting location...'}
          </small>
          <button className="btn btn-outline-dark btn-sm" onClick={onDetect}>
            Detect Location
          </button>
        </div>
      </div>
    </nav>
  );
}
