const SearchBar = () => {
  return (
    <div className="w-1/3 sm:w-1/2 lg:w-1/3">
      <input
        type="text"
        placeholder="Search for products"
        className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#56B280]"
      />
    </div>
  );
};

export default SearchBar;
