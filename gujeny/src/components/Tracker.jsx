import React, { useEffect, useState } from 'react';

export default function Tracker({ restaurant, distance, close }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 10;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content text-center">
          <div className="modal-header">
            <h5 className="modal-title">🚗 Tracking Order</h5>
            <button className="btn-close" onClick={close}></button>
          </div>
          <div className="modal-body">
            <p>
              Your order from <b>{restaurant.name}</b> is on the way!
            </p>
            <p>
              Distance: <b>{distance} km</b>
            </p>
            <div className="progress" style={{ height: '25px' }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${progress}%` }}
              >
                {progress < 100 ? `${progress}%` : 'Delivered ✅'}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
