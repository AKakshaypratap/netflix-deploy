export const API_END_POINT = "http://localhost:8080/api/v1/user";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjQ1Y2Y1ZTU4MmM5OGM3NzY3MTA0YWJjYzRhZTU3NCIsIm5iZiI6MTc5MDUzNjYwMy4zMTQsInN1YiI6IjZhYjk2YjliY2M2MTA5MDgxZGFiZWNjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OxHJ_0R7QgzepfLyo6IhEUaKvxDRNx9jAaJdC60RxWY",
  },
};

export const now_playing_movies = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
export const popular_movies = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
export const top_rated_movies = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
export const upcoming_movies = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";