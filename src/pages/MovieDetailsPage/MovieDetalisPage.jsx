import { useEffect, useRef, useState } from "react";
import {
  Link,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { returnMovieDetails } from "../../Api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import "./MovieDetails.css";
export default function MovieDetailsPage() {
  const { ID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    if (!ID) {
      setError("Movie ID not found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    returnMovieDetails(ID)
      .then((data) => {
        if (!data) {
          setError("Movie details not found.");
          return;
        }
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Could not fetch movie details. Please try again later.");
        setLoading(false);
      });
  }, [ID]);

  const handleReturn = () => {
    navigate(prevLocation.current);
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="movieDetails">
      <button onClick={handleReturn} className="homeButton">
        Return home
      </button>

      {movie && (
        <>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <p>Overview: {movie.overview}</p>
            <p>User rating: {movie.vote_average}</p>
            <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
          </div>
        </>
      )}

      <div className="castLinks">
        <Link to="cast" className="castLink" state={{ from: location }}>
          Cast
        </Link>
        <Link to="reviews" className="castLink" state={{ from: location }}>
          Reviews
        </Link>
      </div>

      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
}
