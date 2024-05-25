import { useState, useEffect } from 'react';
import fetchData from '../../movies-api';
import SearchBar from '../../components/SearchBar/SearchBar';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function MoviesPage() {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params] = useSearchParams();

  const queryFilter = params.get('query') ?? '';

  useEffect(() => {
    if (!queryFilter) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setMovie([]);
        const data = await fetchData('/search/movie', queryFilter);

        if (data.results.length === 0 && queryFilter !== '') {
          toast.error('No results');
          return;
        }
        setMovie(data.results);
      } catch (error) {
        toast.error('Error! Please reload the page!');
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [queryFilter]);

  return (
    <div>
      <SearchBar />
      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      <MovieList movies={movie} />
      <Toaster />
    </div>
  );
}
