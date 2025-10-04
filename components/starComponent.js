import React from "react";

function StarRating({ rating, totalStars = 5 }) {
  const percentage = (rating / totalStars) * 100; // doluluk yüzdesi

  return (
    <div className="stars">
      <div className="filled-stars" style={{ width: `${percentage}%` }}>
        ★★★★★
      </div>
      <div className="empty-stars">
        ★★★★★
      </div>
    </div>
  );
}

export default StarRating;
