import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "../redux/movieSlice";
import { popular_movies, options } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movie.popularMovies);

  useEffect(() => {
    if (movies) return;

    const fetchMovies = async () => {
      try {
        const result = await axios.get(popular_movies, options);
        dispatch(getPopularMovies(result.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch, movies]);
};

export default usePopularMovies;
