import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUpcomingMovies } from "../redux/movieSlice";
import { upcoming_movies, options } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movie.upcomingMovies);

  useEffect(() => {
    if (movies) return;

    const fetchMovies = async () => {
      try {
        const result = await axios.get(upcoming_movies, options);
        dispatch(getUpcomingMovies(result.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch, movies]);
};

export default useUpcomingMovies;
