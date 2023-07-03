import React from "react";
import classes from "./MoviesList.module.css";
import Movie from "./Movie";
const MovieList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.Movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};
export default MovieList;
