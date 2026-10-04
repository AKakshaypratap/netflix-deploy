import { TMDB_IMG_URL } from "../../utils/constants.js";
import { useDispatch } from "react-redux";
import { setOpenDialog, setId } from "../../redux/movieSlice.js";

const MovieCard = ({ poster_path, movieId }) => {
  const dispatch = useDispatch();

  if(poster_path === null) return null; // Return null if poster_path is null to avoid rendering an empty card

  const handleOpenDialog = () => {
    dispatch(setOpenDialog(true));
    dispatch(setId(movieId));
  };

  return (
    <div className="w-48 pr-2" onClick={handleOpenDialog}>
      <img src={`${TMDB_IMG_URL}/${poster_path}`} alt="movie-banner" />
    </div>
  );
};

export default MovieCard;
