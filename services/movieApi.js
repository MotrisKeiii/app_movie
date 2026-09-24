const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

async function request(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}&api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("TMDB API request failed");
  }

  return response.json();
}

function mapMovie(movie) {
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null,
    rating: movie.vote_average,
    year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
    genre: movie.genre_ids?.[0] || null,
  };
}

export async function searchMovies(query) {
  const data = await request(
    `/search/movie?query=${encodeURIComponent(query)}&language=vi-VN`,
  );

  return data.results.map(mapMovie);
}

export async function getMovieDetail(id) {
  const movie = await request(`/movie/${id}?language=vi-VN`);
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null,
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null,
    rating: movie.vote_average,
    year: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
    genre: movie.genres?.[0]?.name || "Chưa xác định",
    overview: movie.overview,
  };
}

export async function getMovieTrailer(id) {
  const data = await request(`/movie/${id}/videos?language=en-US`);

  const trailer = data.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
}

export async function getPopularMovies() {
  const data = await request("/movie/popular?language=vi-VN&page=1");
  console.log("POPULAR MOVIES:", data.results.length);
  return data.results.map(mapMovie);
}

export async function getTopRatedMovies() {
  const data = await request("/movie/top_rated?language=vi-VN&page=1");

  return data.results.map(mapMovie);
}

export async function getUpcomingMovies() {
  const data = await request("/movie/upcoming?language=vi-VN&page=1");

  return data.results.map(mapMovie);
}
