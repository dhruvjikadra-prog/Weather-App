import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {

  const handleSearch = (city) => {
    console.log("Searching for:", city);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherCard />
    </div>
  );
}

export default App;