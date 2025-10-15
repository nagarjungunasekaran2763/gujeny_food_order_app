import React, { useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants } from '../data/restaurants';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const nav = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    nav('/login');
  };

  const categories = [
    'All',
    'Indian',
    'North Indian',
    'Chinese',
    'Japanese',
    'Healthy',
    'Salads',
    'Cafe',
  ];

  const filtered =
    selectedCategory === 'All'
      ? restaurants
      : restaurants.filter((r) => r.cuisine.includes(selectedCategory));

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          Welcome, {currentUser?.username || currentUser?.name || 'User'} 👋
        </h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2 className="text-center mb-4 fw-bold">🍽️ Zomato Clone</h2>

      {/* Category Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${
              selectedCategory === cat ? 'btn-danger' : 'btn-outline-danger'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filtered.map((r) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={r.id}>
            <RestaurantCard r={r} />
          </div>
        ))}
      </div>
    </div>
  );
}
