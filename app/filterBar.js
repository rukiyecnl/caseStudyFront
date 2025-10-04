"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (min, max) => {
    const params = new URLSearchParams(searchParams);
    params.set("minPrice", min);
    params.set("maxPrice", max);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => handleFilter(0, 100)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        0–100₺
      </button>
      <button
        onClick={() => handleFilter(100, 500)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        100–500₺
      </button>
    </div>
  );
}
