import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';

export default function OrderModel({
  show,
  cartItems = [],
  onClose,
  clearCart,
}) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null); // {lat, lng}

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * 100,
    0
  );

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser 😢');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setAddress(''); // Clear textarea if location detected
        alert('Location detected! 🚀');
      },
      () => alert('Unable to retrieve your location 😢')
    );
  };

  const handleOrder = () => {
    if (!address.trim() && !location) {
      alert('Please enter address or detect your location first! 📍');
      return;
    }

    setOrderPlaced(true);

    // Save order to localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({
        userId: currentUser.email || 'guest',
        items: cartItems.map((item) => ({
          idMeal: item.idMeal,
          mealName: item.strMeal,
          quantity: item.quantity,
          price: item.quantity * 100,
        })),
        total: totalPrice,
        address: address || `Lat: ${location.lat}, Lng: ${location.lng}`,
        timestamp: Date.now(),
        status: 'Preparing',
      });
      localStorage.setItem('orders', JSON.stringify(orders));
    }

    let step = 0;
    const timer = setInterval(() => {
      step += 10;
      setProgress(Math.min(step, 100));
      if (step >= 100) clearInterval(timer);
    }, 500);
  };

  useEffect(() => {
    if (!show) {
      setOrderPlaced(false);
      setProgress(0);
      setAddress('');
      setLocation(null);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#FFD700', color: '#000' }}
      >
        <Modal.Title>🛒 Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#fffbea' }}>
        {!orderPlaced ? (
          <>
            <h5>Order Summary:</h5>
            {cartItems.map((item) => (
              <div
                key={item.idMeal}
                className="d-flex justify-content-between mb-2"
              >
                <span>
                  {item.strMeal} x {item.quantity}
                </span>
                <span>₹{item.quantity * 100}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between fw-bold mb-3">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter your delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ borderColor: '#ffb400' }}
                disabled={!!location} // disable if location detected
              />
            </Form.Group>

            <Button
              variant={location ? 'success' : 'warning'}
              className="w-100 mb-3 text-dark fw-bold"
              onClick={detectLocation}
            >
              {location ? 'Location Detected ✅' : 'Detect Current Location 📍'}
            </Button>

            <Button
              variant="warning"
              className="w-100 text-dark fw-bold"
              onClick={handleOrder}
              disabled={!address.trim() && !location}
            >
              Confirm Order 🚀
            </Button>
          </>
        ) : (
          <>
            <h5 className="text-center mt-2">Your order is on the way 🚗💨</h5>
            <ProgressBar
              animated
              now={progress}
              variant="warning"
              className="my-3"
              label={progress < 100 ? `${progress}%` : 'Delivered ✅'}
            />
            {progress >= 100 && (
              <div className="text-center">
                <h5 className="text-success fw-bold">Order Delivered ✅</h5>
                <p>Enjoy your meal! 🍔🍟</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    clearCart();
                    onClose();
                  }}
                >
                  Close
                </Button>
              </div>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
