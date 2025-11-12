import React, { useState } from 'react';
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function RestaurantCard({ meal, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: '15px' }}>
      <Card.Img
        variant="top"
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{
          height: '200px',
          objectFit: 'cover',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        }}
      />
      <Card.Body className="text-center bg-light">
        <Card.Title className="fw-bold text-dark">{meal.strMeal}</Card.Title>
        <Card.Text className="text-muted mb-2">
          {meal.strCategory} | {meal.strArea}
        </Card.Text>

        <InputGroup className="mb-2 justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <FormControl
            type="number"
            value={quantity}
            min={1}
            className="text-center"
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ maxWidth: '60px' }}
          />
          <Button
            variant="outline-secondary"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </InputGroup>

        <Button
          variant="warning"
          className="fw-bold text-dark px-4"
          onClick={() => addToCart(meal, quantity)}
        >
          🛒 Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
