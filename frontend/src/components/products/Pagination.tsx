"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-4 py-2 rounded-lg ${
          page === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg ${
            page === index + 1
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-4 py-2 rounded-lg ${
          page === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}