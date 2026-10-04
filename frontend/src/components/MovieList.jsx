import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, searchedMovie=false }) => {

  return (
    <div className="px-8">
      <h1 className={`${searchedMovie ? 'text-black' : 'text-white'} text-2xl py-3`}>{title}</h1>
      <div className="flex overflow-x-auto cursor-pointer no-scrollbar">
        <div className="flex items-center">
          {movies?.map((movie) => {
            return <MovieCard key={movie.id} poster_path={movie.poster_path}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
