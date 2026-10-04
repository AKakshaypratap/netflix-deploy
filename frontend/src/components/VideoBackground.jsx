import useMovieById from "../../hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId, bool }) => {
  const trailerMovie = useSelector((store) => store.movie?.trailerMovie);

  // console.log("trailerMovie", trailerMovie);

  useMovieById(movieId);

  if (!trailerMovie?.key) return null;

  return (
    <div>
      <iframe
        className={`${bool ? 'w-[100%] aspect-video' : 'w-full aspect-video'}`}
        src={`https://www.youtube.com/embed/${trailerMovie.key}?si=0TAC_gEmKbrhNdXb&autoplay=1&mute=1`}
        title="YouTube video player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
