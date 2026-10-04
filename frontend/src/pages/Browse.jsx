import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import MovieContainer from "../components/MovieContainer";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies";
import usePopularMovies from "../../hooks/usePopularMovies";
import useTopRatedMovies from "../../hooks/useTopRatedMovies";
import useUpcomingMovies from "../../hooks/useUpcomingMovies";
import SearchMovie from "../components/SearchMovie";

const Browse = () => {
  const user = useSelector((store) => store.user.user);
  const authChecked = useSelector((store) => store.user.authChecked);
  const toggle = useSelector((store) => store.movie.toggle);
  const navigate = useNavigate();

  // Custom hooks
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useEffect(() => {
    if (authChecked && !user) {
      navigate("/");
    }
  }, [authChecked, user, navigate]);

  if (!authChecked || !user) {
    return null;
  }

  return (
    <div>
      {toggle ? (
        <SearchMovie />
      ) : (
        <>
          <MainContainer />
          <MovieContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
