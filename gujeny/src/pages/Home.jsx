import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import OrderModel from '../components/OrderModel';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/search.php?s='
        );
        setMeals(res.data.meals || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const addToCart = (meal, quantity = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.idMeal === meal.idMeal);
      if (exists) {
        return prev.map((item) =>
          item.idMeal === meal.idMeal
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...meal, quantity }];
      }
    });
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  return (
    <div style={{ backgroundColor: '#fffbea', minHeight: '100vh' }}>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 style={{ color: '#ffb400' }}>🍔 Gujeny Food</h2>
          <div className="d-flex gap-2">
            <Button variant="outline-dark" onClick={() => setShowCart(true)}>
              🛒 View Cart ({cart.length})
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" />
            <p>Loading meals...</p>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {meals.map((meal) => (
              <Col key={meal.idMeal}>
                <RestaurantCard meal={meal} addToCart={addToCart} />
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {showCart && (
        <OrderModel
          show={showCart}
          cartItems={cart}
          onClose={() => setShowCart(false)}
          clearCart={clearCart}
        />
      )}
    </div>
  );
}
