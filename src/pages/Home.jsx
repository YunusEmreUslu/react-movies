import MovieCard from "../components/MovieCard";

function Home() {
  const movies = [
    { id: 1, title: "Inception", release_date: "2020" },
    { id: 2, title: "The Matrix", release_date: "1992" },
    { id: 3, title: "Interstellar", release_date: "2015" },
  ];

  return (
    <div className="home">
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
