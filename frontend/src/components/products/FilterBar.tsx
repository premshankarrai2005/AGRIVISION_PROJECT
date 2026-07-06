"use client";

interface FilterBarProps {
  category: string;
  status: string;
  sort: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  category,
  status,
  sort,
  onCategoryChange,
  onStatusChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="All">All Categories</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Grains">Grains</option>
        <option value="Pulses">Pulses</option>
        <option value="Flowers">Flowers</option>
        <option value="Seeds">Seeds</option>
        <option value="Spices">Spices</option>
        <option value="Organic Products">Organic Products</option>
        <option value="Others">Others</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="All">All Status</option>
        <option value="available">Available</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="">Newest</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>

      <button
        onClick={onReset}
        className="bg-gray-700 text-white rounded-lg px-4 py-3 hover:bg-gray-800"
      >
        Reset Filters
      </button>
    </div>
  );
}