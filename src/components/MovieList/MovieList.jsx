import { Link, useLocation } from "react-router-dom";
import "./MovieList.css";
export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className="movieList">
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
