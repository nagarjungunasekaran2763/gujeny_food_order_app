import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RestaurantCard from '../components/RestaurantCard';
import Pagination from '../components/Pagination';
import OrderModel from '../components/OrderModel';
import Tracker from '../components/Tracker';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [page, setPage] = useState(1);
  const [showTracker, setShowTracker] = useState(false);
  const [trackingMeal, setTrackingMeal] = useState(null);

  const mealsPerPage = 8;

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
      if (exists)
        return prev.map((item) =>
          item.idMeal === meal.idMeal
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      return [...prev, { ...meal, quantity }];
    });
  };

  const clearCart = () => setCart([]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const filteredMeals = meals
    .filter((meal) =>
      selectedCuisine ? meal.strArea === selectedCuisine : true
    )
    .filter((meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const totalPages = Math.ceil(filteredMeals.length / mealsPerPage);
  const displayedMeals = filteredMeals.slice(
    (page - 1) * mealsPerPage,
    page * mealsPerPage
  );

  return (
    <div style={{ backgroundColor: '#fffbea', minHeight: '100vh' }}>
      <Header
        locationString="Theni, TN"
        onDetect={() => alert('Detect Location')}
      />

      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 style={{ color: '#ffb400' }}>🍔 Gujeny Food Order Website</h2>
          <div className="d-flex gap-2">
            <Button variant="outline-dark" onClick={() => setShowCart(true)}>
              🛒 View Cart ({cart.length})
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filters
          cuisines={[...new Set(meals.map((m) => m.strArea))]}
          selectedCuisine={selectedCuisine}
          onSelect={setSelectedCuisine}
        />

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="warning" />
            <p>Loading meals...</p>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {displayedMeals.map((meal) => (
              <Col key={meal.idMeal}>
                <RestaurantCard meal={meal} addToCart={addToCart} />
              </Col>
            ))}
          </Row>
        )}

        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </Container>

      {showCart && (
        <OrderModel
          show={showCart}
          cartItems={cart}
          onClose={() => setShowCart(false)}
          clearCart={clearCart}
        />
      )}
      {showTracker && (
        <Tracker
          restaurant={trackingMeal}
          distance={2}
          onClose={() => setShowTracker(false)}
        />
      )}
    </div>
  );
}
