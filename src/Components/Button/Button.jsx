import css from './Button.module.css';

import PropTypes from 'prop-types';

const Button = ({ BtnLoadMore }) => {
  return (
    <button className={css.button} type="button" onClick={BtnLoadMore}>
      Load more
    </button>
  );
};

export default Button;

// --------------------------- PropTypes ----------------------

Button.propTypes = {
  BtnLoadMore: PropTypes.func.isRequired,
};
