import React, { useState } from 'react';
import OrderModel from './OrderModel';

const RestaurantCard = ({ r }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card h-100 shadow-sm">
        <img
          src={r.image}
          className="card-img-top"
          alt={r.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{r.name}</h5>
          <p className="card-text text-muted">{r.cuisine.join(', ')}</p>
          <button
            className="btn btn-danger w-100"
            onClick={() => setShowModal(true)}
          >
            Order Now
          </button>
        </div>
      </div>

      <OrderModel
        show={showModal}
        onClose={() => setShowModal(false)}
        restaurant={r}
      />
    </>
  );
};

export default RestaurantCard;
