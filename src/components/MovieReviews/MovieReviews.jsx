import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { returnMovieReviews } from "../../Api";
import "./MovieReviews.css";
export default function MovieReviews() {
  const { ID } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    returnMovieReviews(ID).then(setReviews);
  }, [ID]);

  return (
    <ul className="reviewsList">
      {reviews.map((review) => (
        <li key={review.id}>
          <p>
            <strong>{review.author}</strong>: {review.content}
          </p>
        </li>
      ))}
      {reviews.length === 0 && <p>No reviews</p>}
    </ul>
  );
}
