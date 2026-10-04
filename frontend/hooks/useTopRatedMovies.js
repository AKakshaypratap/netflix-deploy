import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTopRatedMovies } from "../redux/movieSlice";
import { top_rated_movies, options } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movie.topRatedMovies);

  useEffect(() => {
    if (movies) return;

    const fetchMovies = async () => {
      try {
        const result = await axios.get(top_rated_movies, options);
        dispatch(getTopRatedMovies(result.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch, movies]);
};

export default useTopRatedMovies;
