import React from 'react';

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
      <button
        className="btn btn-outline-dark btn-sm"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button
        className="btn btn-outline-dark btn-sm"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
