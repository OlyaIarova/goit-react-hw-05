import { useSearchParams } from 'react-router-dom';
import css from './SearchBar.module.css';
export default function SearchBar() {
  const [params, setParams] = useSearchParams();
  const queryFilter = params.get('query') ?? '';

  const changeFilter = newFilter => {
    params.set('query', newFilter.trim());
    setParams(params);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    form.reset();
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit}>
        <h2 className={css.title}>Search movie</h2>
        <label>
          <input
            className={css.input}
            type="text"
            name="search"
            autoFocus
            placeholder="Enter a search movie"
            value={queryFilter}
            onChange={e => changeFilter(e.target.value)}
          />
        </label>
      </form>
    </div>
  );
}
