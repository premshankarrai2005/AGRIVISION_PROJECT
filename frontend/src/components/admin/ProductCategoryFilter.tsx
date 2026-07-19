interface Props {
  category: string;
  setCategory: (value: string) => void;
}

const categories = [
  "all",
  "Vegetables",
  "Fruits",
  "Grains",
  "Pulses",
  "Dairy",
];

export default function ProductCategoryFilter({
  category,
  setCategory,
}: Props) {
  return (
    <select
      value={category}
      onChange={(e) =>
        setCategory(e.target.value)
      }
      className="rounded-lg border p-3"
    >
      {categories.map((cat) => (
        <option
          key={cat}
          value={cat}
        >
          {cat}
        </option>
      ))}
    </select>
  );
}