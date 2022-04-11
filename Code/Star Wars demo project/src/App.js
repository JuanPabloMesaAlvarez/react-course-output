import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';
import CountForward from './components/CountForward';
import CountBackward from './components/CountBackward';

function App() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const GetMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://swapi.dev/api/films')
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const body = await response.json();
  
      const transformedMovies = body.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl
        }
      })
      setMovies(transformedMovies); 
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addMoviewHandler = (movie) => {
    console.log(movie);
  }

  useEffect(() => {
    GetMoviesHandler();
  },[GetMoviesHandler]);

  let content = <p>Not movies found</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <CountForward />
        <CountBackward />
      </section>
      <section>
        <AddMovie onAddMovie={addMoviewHandler} />
      </section>
      <section>
        <button onClick={GetMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
