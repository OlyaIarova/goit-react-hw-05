import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <b>Oops! Not Found!</b>

      <Link to="/">Back to home page!</Link>
    </div>
  );
}
