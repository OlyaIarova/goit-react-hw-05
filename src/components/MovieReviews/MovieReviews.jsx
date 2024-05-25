import fetchData from '../../movies-api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const defaultImg =
    'https://img.freepik.com/premium-vector/no-camera-vector-icon-illustration-of-cinema-iconset_904970-10868.jpg?w=360';
  useEffect(() => {
    if (!movieId) return;

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchData(`/movie/${movieId}/reviews`, movieId);
        setReview(data.results);
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
      {review.length > 0 ? (
        <div className={css.container}>
          {isLoading && <Loader />}
          {error && <ErrorMessage />}
          {!isLoading && (
            <ul>
              {review.map(
                ({
                  id,
                  content,
                  author_details: { name, username, rating, avatar_path },
                }) => (
                  <li className={css.item} key={id}>
                    <img
                      className={css.img}
                      src={
                        avatar_path
                          ? `https://image.tmdb.org/t/p/w500${avatar_path}`
                          : defaultImg
                      }
                      alt={`${username} avatar`}
                    />
                    <div className={css.description}>
                      <div className={css.nameBox}>
                        {username && <p>{username}</p>}
                        {name && <p className={css.name}>{name}</p>}
                      </div>
                      {rating && <p>{rating} / 10 ⭐</p>}
                      <p className={css.content}>{content}</p>
                    </div>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ) : (
        <p className={css.text}>No information is available...</p>
      )}
    </div>
  );
}
