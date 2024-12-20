import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { API_SEARCH_PRODUCT } from "@/src/constants/api";

interface Product {
  id: number;
  product_name: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>(""); // Search query input
  const [results, setResults] = useState<Product[]>([]); // Search suggestions
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsLoading(true); // Show loading spinner
    try {
      const response = await fetch(`${API_SEARCH_PRODUCT}?words=${encodeURIComponent(searchQuery)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const data = await response.json();
      setResults(data.data.products || []);
      setIsDropdownOpen(data.data.products.length > 0);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setResults([]);
      setIsDropdownOpen(false);
    } finally {
      setIsLoading(false); // Hide loading spinner
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300); // Debounce delay
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsDropdownOpen(false); // Close the dropdown
      router.push(`/search?words=${encodeURIComponent(query.trim())}`); // Navigate to search page
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Close the dropdown when focus is lost, but not when focusing on dropdown items
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div
      className="relative w-1/3 sm:w-1/2 lg:w-1/3"
      onBlur={handleBlur} // Close dropdown on blur
      tabIndex={-1} // Allow focus on this div
    >
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products"
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#56B280]"
        aria-label="Search for products"
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute top-2 right-2 flex items-center justify-center">
          <div className="w-5 h-5 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Dropdown */}
      {isDropdownOpen && results.length > 0 && (
        <ul
          className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          role="listbox"
        >
          {results.map((result) => (
            <li
              key={result.id}
              className="px-4 py-2 hover:bg-[#56B280] hover:text-white cursor-pointer"
              onClick={() => {
                router.push(`/product-detail/${result.id}`); // Navigate to product detail
              }}
              role="option"
              aria-selected={false}
              tabIndex={0} // Allow focus on list items
            >
              {result.product_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
