import { useState } from "react";

function SearchBar({ onSearch }) {

  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit"><i className="fas fa-search"></i></button>
    </form>
  );
}

export default SearchBar;
