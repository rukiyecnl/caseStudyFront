"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 💰 Fiyat filtreleme
  const handleFilter = (min, max) => {
    const params = new URLSearchParams(searchParams);
    if (min !== "" && max !== "") {
      params.set("minPrice", min);
      params.set("maxPrice", max);
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
      setMinPrice("");
      setMaxPrice("");
    }
    router.push(`?${params.toString()}`);
  };

  // 🌟 Popülarite filtreleme
  const handleRatingFilter = (minPopularity) => {
    const params = new URLSearchParams(searchParams);
    if (minPopularity) {
      params.set("minPopularity", minPopularity);
    } else {
      params.delete("minPopularity");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <button
        onClick={() => handleRatingFilter("")}
        className="btn"
      >
        All Products
      </button>
      {/* Fiyat Filtreleme */}
      <div className="priceFilter">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="minInputBar"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="maxInputBar"
        />
        <button
          onClick={() => handleFilter(minPrice, maxPrice)}
          className="btn"
        >
          Apply
        </button>
        <button
          onClick={() => handleFilter("",  "")}
          className="btn"
        >
          Clear
        </button>
      </div>

      {/* ⭐ Popülarite Filtreleme */}
      <div className="popularityFilter">
        {[3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingFilter(rating)}
            className="btn"
          >
            {Array.from({ length: rating }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
            <span className="ml-1 text-sm"> and up</span>
          </button>
        ))}
      </div>
    </div>
  );
}
