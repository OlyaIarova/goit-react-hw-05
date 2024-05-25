import { useEffect, useState, useRef, Suspense } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import fetchData from '../../movies-api';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import clsx from 'clsx';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const backLinkRef = useRef(location.state ?? '/');

  const defaultImg =
    'https://img.freepik.com/premium-vector/no-camera-vector-icon-illustration-of-cinema-iconset_904970-10868.jpg?w=360';

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchData(`/movie/${movieId}`, movieId);
        setMovie(data);
      } catch (error) {
        toast.error('Error! Please reload the page!');
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link className={css.link} to={backLinkRef.current}>
        <FaArrowLeft />
        Go back
      </Link>

      {isLoading && <Loader />}

      {error && <ErrorMessage />}

      <div className={css.wrap}>
        <img
          className={css.img}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={`${movie.title} poster`}
        />
        <div className={css.description}>
          <h2 className={css.title}>{movie.title}</h2>
          {movie.tagline && (
            <p className={css.tagline}>{`"${movie.tagline}"`}</p>
          )}
          {movie.overview && (
            <p>
              <span className={css.span}>Overview: </span>
              {movie.overview}
            </p>
          )}
          {movie.genres && movie.genres.length > 0 && (
            <p>
              <span className={css.span}>Genres: </span>
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
          )}
          {movie.vote_average > 0 && (
            <p>
              <span className={css.span}>Average rating: </span>
              {Math.floor(movie.vote_average)} / 10 ⭐
            </p>
          )}
          {movie.vote_count > 0 && (
            <p>
              <span className={css.span}>Vote count: </span>
              {Math.floor(movie.vote_count)}
            </p>
          )}
          {movie.release_date && (
            <p>
              <span className={css.span}>Release date: </span>
              {movie.release_date}
            </p>
          )}
          {!isLoading && (
            <nav className={css.nav}>
              <NavLink
                className={({ isActive }) => {
                  return clsx(css.navLink, isActive && css.isActive);
                }}
                to="cast"
              >
                Cast
              </NavLink>
              <NavLink
                className={({ isActive }) => {
                  return clsx(css.navLink, isActive && css.isActive);
                }}
                to="reviews"
              >
                Reviews
              </NavLink>
            </nav>
          )}
        </div>
      </div>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster />
    </div>
  );
}
