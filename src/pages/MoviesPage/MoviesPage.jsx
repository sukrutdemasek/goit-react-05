import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { returnMovies } from "../../Api";
import MovieList from "../../components/MovieList/MovieList";
import "./MoviesPage.css";
export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const allMovies = await returnMovies(searchQuery);
      setMovies(allMovies);
    } catch (err) {
      setError("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.elements.query.value.trim();

    if (searchQuery && searchQuery !== query) {
      setSearchParams({ query: searchQuery });
    }
  };

  return (
    <div>
      <form className="searchForm" onSubmit={handleSubmit}>
        <input
          className="textInput"
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search..."
        />
        <button className="searchButton" type="submit">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <MovieList movies={movies} query={query} />
      )}

      {!loading && !error && movies.length === 0 && query && (
        <p>No movies found</p>
      )}
    </div>
  );
}
