import React, { useState, useEffect } from 'react';

export default function Tracker({
  restaurant = null,
  userLocation = null,
  close = () => {},
}) {
  const [progress, setProgress] = useState(0);
  const [distance, setDistance] = useState(0); // km

  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (val) => (val * Math.PI) / 180;
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!restaurant || !userLocation) return;

    // assume restaurant has lat/lng or fake coordinates if missing
    const restaurantCoords = restaurant.location || {
      lat: userLocation.lat + 0.02,
      lng: userLocation.lng + 0.02,
    };

    const dist = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurantCoords.lat,
      restaurantCoords.lng
    );
    setDistance(dist.toFixed(2));

    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10; // animate progress
      });
    }, 800);
    return () => clearInterval(timer);
  }, [restaurant, userLocation]);

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-header">
            <h5 className="modal-title">🚗 Tracking Order</h5>
            <button
              type="button"
              className="btn-close"
              onClick={close}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Your order{' '}
              {restaurant
                ? `from ${restaurant.name || restaurant.strMeal}`
                : ''}{' '}
              is on the way.
            </p>
            <p className="small text-muted">
              Distance: <strong>{distance} km</strong>
            </p>
            <div className="progress" style={{ height: 22 }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {progress < 100 ? `${progress}%` : 'Delivered ✅'}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-warning text-dark" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
