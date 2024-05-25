import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import css from './HomePage.module.css';
import fetchData from '../../movies-api.js';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchData('/trending/movie/day');
        setMovies(data.results);
      } catch (error) {
        toast.error('Error! Please reload the page!');
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>

      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movies={movies} />
      <Toaster />
    </div>
  );
}
