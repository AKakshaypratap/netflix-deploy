import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovies } from "../redux/movieSlice";
import { now_playing_movies, options } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movie.nowPlayingMovies);

  useEffect(() => {
    if (movies) return;

    const fetchMovies = async () => {
      try {
        const result = await axios.get(now_playing_movies, options);
        dispatch(getNowPlayingMovies(result.data.results));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch, movies]);
};

export default useNowPlayingMovies;
