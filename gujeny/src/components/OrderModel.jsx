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
  const [payment, setPayment] = useState('Cash');

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * 100,
    0
  );

  const handleOrder = () => {
    if (!address.trim()) {
      alert('Please enter your delivery address 🏠');
      return;
    }

    setOrderPlaced(true);

    // Save order to localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push({
        userId: currentUser.username || currentUser.hotelId || 'guest',
        items: cartItems.map((item) => ({
          idMeal: item.idMeal,
          mealName: item.strMeal,
          quantity: item.quantity,
          price: item.quantity * 100,
        })),
        total: totalPrice,
        address,
        payment,
        timestamp: Date.now(),
        status: 'Preparing',
      });
      localStorage.setItem('orders', JSON.stringify(orders));
    }

    // Animate progress
    let step = 0;
    const timer = setInterval(() => {
      step += Math.floor(Math.random() * 15) + 10; // random speed
      setProgress(Math.min(step, 100));
      if (step >= 100) clearInterval(timer);
    }, 500);
  };

  useEffect(() => {
    if (!show) {
      setOrderPlaced(false);
      setProgress(0);
      setAddress('');
      setPayment('Cash');
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{ backgroundColor: '#ffb400', color: 'white' }}
      >
        <Modal.Title>🛒 Your Order</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: '#fffbea' }}>
        {!orderPlaced ? (
          <>
            <div className="mb-3">
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
              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="Cash">Cash on Delivery</option>
                <option value="Card">Credit/Debit Card</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="warning"
              className="w-100 fw-bold text-dark"
              onClick={handleOrder}
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
