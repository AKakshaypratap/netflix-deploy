import { useState } from "react";
import axios from "axios";
import { options } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../../redux/searchSlice.js";
import { setLoading } from "../../redux/userSlice";
import MovieList from "./MovieList.jsx";

const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.user.isLoading);
  const { movieName, searchedMovie } = useSelector(
    (store) => store.searchMovie,
  );

  // console.log("searchedMovie", searchedMovie);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&include_adult=false&language=en-US&page=1`,
        options,
      );

      // console.log(result.data.results);
      dispatch(
        setSearchMovieDetails({ searchMovie, movies: result?.data?.results }),
      );
    } catch (error) {
      console.error("Error searching for movie:", error);
    } finally {
      dispatch(setLoading(false));
    }
    setSearchMovie(""); // Clear the input field after search
  };

  return (
    <>
      <div className="flex justify-center pt-[10%] w-[100%]">
        <form onSubmit={submitHandler} className="w-[50%]">
          <div className="flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-[100%]">
            <input
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full outline-none rounded-md text-lg"
              type="text"
              placeholder="Search Movies..."
            />
            <button className="bg-red-800 text-white rounded-md px-4 py-2">
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
      </div>

      <div>
        {searchedMovie ? (
          <MovieList
            title={movieName}
            movies={searchedMovie}
            searchedMovie={true}
          />
        ) : (
          <h1>No movies found for {movieName}</h1>
        )}
      </div>
    </>
  );
};

export default SearchMovie;
