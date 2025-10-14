import React from 'react';

export default function Filters({ cuisines, selectedCuisine, onSelect }) {
  return (
    <div className="mt-3 d-flex flex-wrap gap-2">
      <button
        className={`btn btn-sm ${
          !selectedCuisine ? 'btn-dark' : 'btn-outline-dark'
        }`}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {cuisines.map((c) => (
        <button
          key={c}
          className={`btn btn-sm ${
            selectedCuisine === c ? 'btn-dark' : 'btn-outline-dark'
          }`}
          onClick={() => onSelect(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
