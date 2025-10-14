import React, { useState } from 'react';

const OrderModel = ({ show, onClose, restaurant }) => {
  const [orders, setOrders] = useState([
    { name: restaurant.name, quantity: 1 },
  ]);
  const [userLocation, setUserLocation] = useState(null);
  const [tracking, setTracking] = useState(false);

  // 🧩 Handle Quantity
  const handleQuantityChange = (index, type) => {
    const updated = [...orders];
    if (type === 'inc') updated[index].quantity++;
    else if (type === 'dec' && updated[index].quantity > 1)
      updated[index].quantity--;
    setOrders(updated);
  };

  // ➕ Add another food item
  const handleAddFood = () => {
    setOrders([...orders, { name: '', quantity: 1 }]);
  };

  // 🔄 Update food name
  const handleFoodNameChange = (index, value) => {
    const updated = [...orders];
    updated[index].name = value;
    setOrders(updated);
  };

  // 📍 Location detect
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
          alert('📍 Location detected successfully!');
        },
        () => alert('❌ Please allow location access!')
      );
    } else {
      alert('Geolocation not supported by this browser');
    }
  };

  // 🚗 Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userLocation) {
      alert('Please allow location access first!');
      return;
    }
    setTracking(true);
  };

  const dummyHotelLocation = { lat: 12.9716, lon: 77.5946 };

  // 📏 Distance Calculation
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  return (
    <>
      {show && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  🧾 Multi Order from {restaurant.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={onClose}
                ></button>
              </div>

              <div className="modal-body">
                {!tracking ? (
                  <>
                    <div className="text-center mb-3">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="img-fluid rounded mb-2"
                        style={{ maxHeight: '200px' }}
                      />
                      <h6>{restaurant.cuisine.join(', ')}</h6>
                    </div>

                    {/* ORDER FORM */}
                    <form onSubmit={handleSubmit}>
                      {orders.map((order, index) => (
                        <div
                          key={index}
                          className="border rounded p-3 mb-3 bg-light"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Food Name"
                              value={order.name}
                              onChange={(e) =>
                                handleFoodNameChange(index, e.target.value)
                              }
                              required
                            />
                            <div className="d-flex align-items-center gap-2">
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() =>
                                  handleQuantityChange(index, 'dec')
                                }
                              >
                                -
                              </button>
                              <span className="fw-bold">{order.quantity}</span>
                              <button
                                type="button"
                                className="btn btn-outline-success btn-sm"
                                onClick={() =>
                                  handleQuantityChange(index, 'inc')
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* ➕ Add Another Food */}
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mb-3"
                        onClick={handleAddFood}
                      >
                        ➕ Add Another Food
                      </button>

                      {/* Customer Details */}
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="Phone Number"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Delivery Address"
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <select className="form-select" required>
                          <option value="">Select Payment Method</option>
                          <option value="COD">Cash on Delivery</option>
                          <option value="UPI">UPI</option>
                          <option value="Card">Card</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-primary w-100 mb-3"
                        onClick={handleGetLocation}
                      >
                        📍 Detect My Location
                      </button>

                      <button type="submit" className="btn btn-danger w-100">
                        Confirm Order
                      </button>
                    </form>
                  </>
                ) : (
                  // ✅ Tracking Screen
                  <div className="text-center">
                    <h5>🚗 Tracking your multiple food orders...</h5>
                    {userLocation && (
                      <>
                        <p className="mt-3">
                          Distance from restaurant:{' '}
                          <b>
                            {getDistance(
                              userLocation.lat,
                              userLocation.lon,
                              dummyHotelLocation.lat,
                              dummyHotelLocation.lon
                            )}{' '}
                            km
                          </b>
                        </p>
                        <h6 className="fw-bold mt-3">🧾 Your Orders:</h6>
                        <ul className="list-group mb-3">
                          {orders.map((o, i) => (
                            <li
                              key={i}
                              className="list-group-item d-flex justify-content-between"
                            >
                              <span>{o.name}</span>
                              <span>Qty: {o.quantity}</span>
                            </li>
                          ))}
                        </ul>
                        <p>Estimated delivery time: 25 min</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModel;
