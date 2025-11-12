import React from 'react';

export default function SearchBar({ value = '', onChange }) {
  return (
    <div className="mb-3">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search restaurants or cuisines..."
        className="form-control form-control-lg"
        aria-label="Search restaurants or cuisines"
      />
    </div>
  );
}
