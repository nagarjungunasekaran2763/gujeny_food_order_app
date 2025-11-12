import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const HotelRegistration = () => {
  const [showModal, setShowModal] = useState(false);
  const [hotel, setHotel] = useState({
    name: '',
    location: '',
    address: '',
    foodTypes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Hotel Registered:', hotel);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card p-5 shadow-lg border-0 rounded-4"
        style={{ width: '500px', backgroundColor: '#fffef7' }}
      >
        <h3 className="text-center mb-4 text-warning fw-bold">
          🏨 Hotel Registration
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={hotel.name}
              onChange={handleChange}
              placeholder="Enter your hotel name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hotel Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={hotel.location}
              onChange={handleChange}
              placeholder="Enter your hotel location"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="address"
              value={hotel.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Food Types (e.g., Indian, Chinese, etc.)</Form.Label>
            <Form.Control
              type="text"
              name="foodTypes"
              value={hotel.foodTypes}
              onChange={handleChange}
              placeholder="Enter food types"
              required
            />
          </Form.Group>

          <Button
            variant="warning"
            type="submit"
            className="w-100 fw-bold text-dark"
          >
            Register
          </Button>
        </Form>
      </div>

      {/* Success Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-warning fw-bold">
            🎉 Registration Successful
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ✅ Your hotel registration has been received successfully.
          </p>
          <p>
            🕒 <strong>Gujeney staff</strong> will visit within{' '}
            <strong>7 days</strong> for verification.
          </p>
          <p>
            Once approved, your hotel will appear in the Gujeney restaurant list.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" className="text-dark" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelRegistration;
