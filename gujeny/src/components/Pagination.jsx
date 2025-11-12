import React from 'react';

export default function Pagination({ page = 1, totalPages = 1, setPage }) {
  const prev = () => setPage(Math.max(1, page - 1));
  const next = () => setPage(Math.min(totalPages, page + 1));

  return (
    <nav
      aria-label="Page navigation"
      className="d-flex justify-content-center align-items-center gap-3 mt-4"
    >
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={prev}
        disabled={page === 1}
        aria-label="Previous page"
      >
        Prev
      </button>

      <span className="small text-muted">
        Page <strong>{page}</strong> / {totalPages}
      </span>

      <button
        className="btn btn-outline-dark btn-sm"
        onClick={next}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
