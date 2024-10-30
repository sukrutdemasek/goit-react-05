import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { returnMovieCast } from "../../Api";
import "./MovieCast.css";
export default function MovieCast() {
  const { ID } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    returnMovieCast(ID).then(setCast);
  }, [ID]);

  return (
    <ul className="castList">
      {cast.map((act) => (
        <li key={act.cast_id}>
          {act.profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${act.profile_path}`}
              alt={act.name}
            />
          )}
          <p>
            {act.name} as {act.character}
          </p>
        </li>
      ))}
      {cast.length === 0 && <p>No cast available</p>}
    </ul>
  );
}
