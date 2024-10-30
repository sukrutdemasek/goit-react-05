import { useEffect, useState } from "react";
import { returnTrendingMovies } from "../../Api";
import MovieList from "../../components/MovieList/MovieList";
import "./HomePage.css";
export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    returnTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className="mainPageDiv">
      <h1>Trending movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}
