import css from './MovieCard.module.css';

export default function MovieCard({
  movie: { title, poster_path, vote_average },
}) {
  const defaultImg =
    'https://img.freepik.com/premium-vector/no-camera-vector-icon-illustration-of-cinema-iconset_904970-10868.jpg?w=360';

  return (
    <div>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : defaultImg
        }
        alt={`${title} poster`}
      />
      <p className={css.vote}>{Math.floor(vote_average)} / 10 ⭐⭐⭐</p>
    </div>
  );
}
