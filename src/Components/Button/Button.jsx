import css from './Button.module.css';

const Button = ({ BtnLoadMore }) => {
  return (
    <button className={css.button} type="button" onClick={BtnLoadMore}>
      Load more
    </button>
  );
};

export default Button;
