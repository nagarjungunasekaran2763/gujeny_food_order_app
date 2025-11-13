import React from 'react';

export default function Filters({ cuisines = [], selectedCuisine, onSelect }) {
  return (
    <div className="mt-3 d-flex flex-wrap gap-2">
      <button
        type="button"
        className={`btn btn-sm ${
          !selectedCuisine ? 'btn-warning text-dark' : 'btn-outline-dark'
        }`}
        onClick={() => onSelect(null)}
        aria-pressed={!selectedCuisine}
      >
        All
      </button>

      {cuisines.map((c) => (
        <button
          key={c}
          type="button"
          className={`btn btn-sm ${
            selectedCuisine === c ? 'btn-warning text-dark' : 'btn-outline-dark'
          }`}
          onClick={() => onSelect(c)}
          aria-pressed={selectedCuisine === c}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
