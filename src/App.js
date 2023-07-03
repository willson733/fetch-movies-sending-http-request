import React, { useState } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  function fetchMoviesHandler() {
    setIsLoading(true);
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedMovies = data.results.map((moviesData) => {
          return {
            title: moviesData.title,
            id: moviesData.episode_id,
            releaseDate: moviesData.release_date,
            openingText: moviesData.opening_crawl,
          };
        });

        setMovies(transformedMovies);
        setIsLoading(false);
      });
  }
  // //async and await
  // async function fetchMoviesHandler() {
  //   const response = await fetch("https://swapi.dev/api/films/");
  //   const data = await response.json();
  //   const transformedMovies = data.results.map((moviesData) => {
  //     return {
  //       title: moviesData.title,
  //       id: moviesData.episode_id,
  //       releaseDate: moviesData.release_date,
  //       openingText: moviesData.opening_crawl,
  //     };
  //   });

  //   setMovies(transformedMovies);
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList Movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No movies found</p>}
        {isLoading && <p>loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
