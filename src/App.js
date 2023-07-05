import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import MovieList from "./components/MoviesList";
import AddMovies from "./components/AddMovies";
// function App() {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   function fetchMoviesHandler() {
//     setIsLoading(true);
//     fetch("https://swapi.dev/api/films/")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         const transformedMovies = data.results.map((moviesData) => {
//           return {
//             title: moviesData.title,
//             id: moviesData.episode_id,
//             releaseDate: moviesData.release_date,
//             openingText: moviesData.opening_crawl,
//           };
//         });

//         setMovies(transformedMovies);
//         setIsLoading(false);
//       });
//   }
// async and await
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    console.log("call back function");
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://movies-fetch-202df-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const data = await response.json();
      const loadedMovies = [];
      console.log(data);
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);
  async function AddMovieHandler(movies) {
    const response = await fetch(
      "https://movies-fetch-202df-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movies),

        headers: {
          "CONTENT-TYPE": "application/json",
        },
      }
    );

    const data = await response.json();
  }
  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovies={AddMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MovieList Movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No movies found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && (
          <div>
            <p>loading...</p> <p>please wait redirecting....</p>
          </div>
        )}
      </section>
    </React.Fragment>
  );
}

export default App;
