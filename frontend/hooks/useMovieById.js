import { useEffect } from "react";
import axios from "axios";
import { options } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getTrailerMovie } from "../redux/movieSlice";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();
  const trailerMovie = useSelector((store) => store.movie.trailerMovie);

  useEffect(() => {
    if (!movieId) return;
    // Already have a trailer for this session; skip unless movieId changes
    // (remount / toggle back should not refetch the same trailer)
    if (trailerMovie?.movieId === movieId) return;

    const fetchTrailer = async () => {
      try {
        const result = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options,
        );
        // console.log("result", result);
        const trailer = result?.data?.results?.filter(
          (video) => video.type === "Trailer",
        );

        // console.log("trailer", trailer);
        const selected =
          trailer.length > 0 ? trailer[0] : result.data.results[0];
        dispatch(
          getTrailerMovie(selected ? { ...selected, movieId } : null),
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrailer();
  }, [movieId, dispatch, trailerMovie?.movieId]);
};

export default useMovieById;
