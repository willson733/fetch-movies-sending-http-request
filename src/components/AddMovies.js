import React, { useRef, useEffect } from "react";
import classes from "./AddMovies.module.css";
const AddMovies = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");
  useEffect(() => {
    titleRef.current.focus();
  }, []);
  const submitChangeHandeler = (event) => {
    event.preventDefault();
    const movies = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };
    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
    titleRef.current.focus();
    props.onAddMovies(movies);
  };
  return (
    <form onSubmit={submitChangeHandeler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="release-date">Release Date</label>
        <input type="text" id="release-date" ref={releaseDateRef} />
      </div>
      <div>
        <button>Add Movies</button>
      </div>
    </form>
  );
};
export default AddMovies;
