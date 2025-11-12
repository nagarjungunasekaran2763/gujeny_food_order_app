import React, { useEffect, useState } from 'react';

export default function Tracker({
  restaurant = null,
  distance = 0,
  close = () => {},
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 10;
      });
    }, 800);
    return () => clearInterval(timer);
  }, [restaurant]);

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
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Your order
              {restaurant
                ? ` from ${restaurant.name || restaurant.strMeal}`
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
