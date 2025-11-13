import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // simple validation
    if (email === '' || password === '') {
      setError('Please enter both email and password!');
      return;
    }

    // save dummy user to localStorage
    const user = { email, name: 'GujenY User' };
    localStorage.setItem('currentUser', JSON.stringify(user));

    // redirect to home page
    navigate('/');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #fff 60%, #FFD700 40%)',
      }}
    >
      <Card
        style={{
          width: '350px',
          borderRadius: '20px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Card.Body>
          <h3 className="text-center mb-4 fw-bold text-warning">🍴 GujenY</h3>
          <h5 className="text-center mb-3">Welcome Back!</h5>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 fw-bold"
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                border: 'none',
              }}
            >
              Login
            </Button>
          </Form>

          <p className="text-center mt-3 text-muted small">
            Don’t have an account?{' '}
            <span
              className="text-warning fw-bold"
              style={{ cursor: 'pointer' }}
            >
              Register Soon
            </span>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}
