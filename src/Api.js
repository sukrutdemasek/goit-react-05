import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = "994b48c4f7e3eddb4f4548e7bfcd69e2";

export async function returnTrendingMovies() {
  const url = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
  const trendingResponse = await axios.get(url);
  return trendingResponse.data.results;
}

export async function returnMovies(query) {
  const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;
  const response = await axios.get(url);
  return response.data.results;
}

export async function returnMovieDetails(ID) {
  const url = `${baseUrl}/movie/${ID}?api_key=${apiKey}`;
  const detailsResponse = await axios.get(url);
  return detailsResponse.data;
}

export async function returnMovieCast(ID) {
  const url = `${baseUrl}/movie/${ID}/credits?api_key=${apiKey}`;
  const castResponse = await axios.get(url);
  return castResponse.data.cast;
}

export async function returnMovieReviews(ID) {
  const url = `${baseUrl}/movie/${ID}/reviews?api_key=${apiKey}`;
  const reviewsResponse = await axios.get(url);
  return reviewsResponse.data.results;
}
