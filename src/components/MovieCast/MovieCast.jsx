import fetchData from '../../movies-api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    'https://img.freepik.com/premium-vector/no-camera-vector-icon-illustration-of-cinema-iconset_904970-10868.jpg?w=360';

  useEffect(() => {
    if (!movieId) {
      return;
    }
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchData(`/movie/${movieId}/credits`, movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [movieId]);
  return (
    <div>
      {cast.length > 0 ? (
        <div className={css.container}>
          {isLoading && <Loader />}
          {error && <ErrorMessage />}

          {!isLoading && (
            <ul className={css.list}>
              {cast.map(({ id, name, character, profile_path }) => (
                <li className={css.item} key={id}>
                  <img
                    className={css.img}
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : defaultImg
                    }
                    alt={`${name} photo`}
                  />
                  <div>
                    <p className={css.text}>{name}</p>
                    <p className={css.text}>{character}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className={css.cast}>There is no information available...</p>
      )}
    </div>
  );
}
