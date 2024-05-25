import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <p className={css.error}>
      <b>Oops! Error! Reload!</b>
    </p>
  );
};
export default ErrorMessage;
