export const restaurants = [
  // ----- Indian 20 -----
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Indian Spice House ${i + 1}`,
    cuisine: ['Indian'],
    rating: (4 + Math.random()).toFixed(1),
    cost_for_two: 300 + Math.floor(Math.random() * 400),
    address: 'Koramangala, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?indian-food,${i}`,
  })),

  // ----- North Indian 10 -----
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 21,
    name: `North Indian Tadka ${i + 1}`,
    cuisine: ['North Indian'],
    rating: (4 + Math.random()).toFixed(1),
    cost_for_two: 400 + Math.floor(Math.random() * 400),
    address: 'Indiranagar, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?north-indian,${i}`,
  })),

  // ----- Chinese 10 -----
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 31,
    name: `Dragon Palace ${i + 1}`,
    cuisine: ['Chinese'],
    rating: (3.8 + Math.random() * 1.2).toFixed(1),
    cost_for_two: 500 + Math.floor(Math.random() * 400),
    address: 'Whitefield, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?chinese-food,${i}`,
  })),

  // ----- Japanese 10 -----
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 41,
    name: `Sakura Delight ${i + 1}`,
    cuisine: ['Japanese'],
    rating: (4 + Math.random()).toFixed(1),
    cost_for_two: 700 + Math.floor(Math.random() * 400),
    address: 'HSR Layout, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?japanese-food,${i}`,
  })),

  // ----- Healthy 10 -----
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 51,
    name: `Green Bowl ${i + 1}`,
    cuisine: ['Healthy'],
    rating: (3.9 + Math.random()).toFixed(1),
    cost_for_two: 500 + Math.floor(Math.random() * 300),
    address: 'BTM Layout, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?healthy-food,${i}`,
  })),

  // ----- Salads 10 -----
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 61,
    name: `Salad Stop ${i + 1}`,
    cuisine: ['Salads'],
    rating: (3.7 + Math.random() * 1.3).toFixed(1),
    cost_for_two: 350 + Math.floor(Math.random() * 150),
    address: 'MG Road, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?salad,${i}`,
  })),

  // ----- Cafe/Bakery 30 -----
  ...Array.from({ length: 30 }, (_, i) => ({
    id: i + 71,
    name: `Cafe Delight ${i + 1}`,
    cuisine: ['Cafe', 'Bakery'],
    rating: (3.5 + Math.random() * 1.5).toFixed(1),
    cost_for_two: 250 + Math.floor(Math.random() * 400),
    address: 'Indiranagar, Bangalore',
    thumb: `https://source.unsplash.com/600x400/?cafe,${i}`,
  })),
];
