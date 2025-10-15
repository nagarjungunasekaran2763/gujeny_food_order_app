import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
  
export default function LoginPage() {
  const [mode, setMode] = useState('choice'); // 'choice' | 'user' | 'hotel'
  const [userMode, setUserMode] = useState('signin');
  const [userForm, setUserForm] = useState({ username: '', password: '' });
  const [hotelForm, setHotelForm] = useState({
    name: '',
    address: '',
    lat: '',
    lng: '',
    foodTypes: '',
  });
  const nav = useNavigate();

  const saveUser = (user) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const saveHotel = (hotel) => {
    const hotels = JSON.parse(localStorage.getItem('hotels') || '[]');
    hotels.push(hotel);
    localStorage.setItem('hotels', JSON.stringify(hotels));
  };

  const findUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(
      (u) => u.username === username && u.password === password
    );
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (userMode === 'signin') {
      const found = findUser(userForm.username, userForm.password);
      if (!found) return alert('Invalid credentials!');
      localStorage.setItem('currentUser', JSON.stringify(found));
      nav('/');
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find((u) => u.username === userForm.username))
        return alert('Username exists!');
      const newUser = {
        username: userForm.username,
        password: userForm.password,
      };
      saveUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      nav('/');
    }
  };

  const handleHotelSubmit = (e) => {
    e.preventDefault();
    const newHotel = {
      id: Date.now(),
      name: hotelForm.name,
      address: hotelForm.address,
      lat: hotelForm.lat,
      lng: hotelForm.lng,
      foodTypes: hotelForm.foodTypes.split(','),
    };
    saveHotel(newHotel);
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ type: 'hotel', hotelId: newHotel.id })
    );
    nav('/hotel-dashboard');
  };

  return (
    <div className="login-page d-flex align-items-stretch">
      {/* LEFT PANEL */}
      <div className="left-panel d-none d-lg-flex flex-column justify-content-center align-items-center">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide w-100 h-100"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner h-100">
            <div className="carousel-item active h-100">
              <img
                src="https://source.unsplash.com/1600x900/?pizza"
                className="d-block w-100 h-100"
                alt="Pizza"
              />
            </div>
            <div className="carousel-item h-100">
              <img
                src="https://source.unsplash.com/1600x900/?biryani"
                className="d-block w-100 h-100"
                alt="Biryani"
              />
            </div>
            <div className="carousel-item h-100">
              <img
                src="https://source.unsplash.com/1600x900/?salad"
                className="d-block w-100 h-100"
                alt="Salad"
              />
            </div>
          </div>
        </div>
        <div className="overlay-text text-center text-white px-4">
          <h1>Order Happiness</h1>
          <p>Find local restaurants & eat fresh daily 🍴</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel d-flex flex-column justify-content-center align-items-center">
        <div className="top-buttons position-absolute top-0 end-0 p-3">
          <button
            className={`btn btn-sm me-2 ${
              mode === 'user' ? 'btn-danger' : 'btn-outline-danger'
            }`}
            onClick={() => setMode('user')}
          >
            User
          </button>
          <button
            className={`btn btn-sm ${
              mode === 'hotel' ? 'btn-danger' : 'btn-outline-danger'
            }`}
            onClick={() => setMode('hotel')}
          >
            Hotel
          </button>
        </div>

        {/* CHOICE */}
        {mode === 'choice' && (
          <div className="text-center">
            <h3 className="mb-4 fw-bold">Choose Login Type</h3>
            <button
              className="btn btn-lg btn-danger m-2"
              onClick={() => setMode('user')}
            >
              I am a User
            </button>
            <button
              className="btn btn-lg btn-outline-danger m-2"
              onClick={() => setMode('hotel')}
            >
              I am a Hotel
            </button>
          </div>
        )}

        {/* USER FORM */}
        {mode === 'user' && (
          <div className="login-box p-4 rounded shadow bg-white">
            <h4 className="text-center mb-3">
              {userMode === 'signin' ? 'User Sign In' : 'User Register'}
            </h4>
            <form onSubmit={handleUserSubmit}>
              <input
                className="form-control mb-3"
                placeholder="Username"
                value={userForm.username}
                onChange={(e) =>
                  setUserForm({ ...userForm, username: e.target.value })
                }
                required
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={userForm.password}
                onChange={(e) =>
                  setUserForm({ ...userForm, password: e.target.value })
                }
                required
              />
              <button type="submit" className="btn btn-danger w-100 mb-2">
                {userMode === 'signin' ? 'Login' : 'Register'}
              </button>
              <button
                type="button"
                className="btn btn-link w-100"
                onClick={() =>
                  setUserMode(userMode === 'signin' ? 'signup' : 'signin')
                }
              >
                {userMode === 'signin'
                  ? 'Create an account'
                  : 'Already have an account? Sign in'}
              </button>
            </form>
          </div>
        )}

        {/* HOTEL FORM */}
        {mode === 'hotel' && (
          <div className="login-box p-4 rounded shadow bg-white">
            <h4 className="text-center mb-3">Hotel Registration</h4>
            <form onSubmit={handleHotelSubmit}>
              <input
                className="form-control mb-2"
                placeholder="Hotel Name"
                value={hotelForm.name}
                onChange={(e) =>
                  setHotelForm({ ...hotelForm, name: e.target.value })
                }
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Address"
                value={hotelForm.address}
                onChange={(e) =>
                  setHotelForm({ ...hotelForm, address: e.target.value })
                }
                required
              />
              <input
                className="form-control mb-2"
                placeholder="Food Types (comma separated)"
                value={hotelForm.foodTypes}
                onChange={(e) =>
                  setHotelForm({ ...hotelForm, foodTypes: e.target.value })
                }
                required
              />
              <button type="submit" className="btn btn-danger w-100">
                Register Hotel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
