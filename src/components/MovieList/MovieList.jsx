import { Link, useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      <ul className={css.list}>
        {movies.map(movie => (
          <li className={css.item} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <h2 className={css.title}>{movie.title}</h2>
              <MovieCard movie={movie} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
