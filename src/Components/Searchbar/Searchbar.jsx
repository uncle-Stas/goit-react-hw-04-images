import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { IconContext } from 'react-icons';

function Searchbar({ submitForm }) {
  const [imageQuery, setImageQuery] = useState('');

  const handleChange = event => {
    setImageQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    submitForm(imageQuery);

    setImageQuery('');

    // event.target.reset();
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <form className={css.form} onSubmit={handleSubmit}>
          <button type="submit" className={css.button}>
            <IconContext.Provider value={{ className: `${css.icon}` }}>
              <GoSearch />
            </IconContext.Provider>
          </button>
          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </form>
      </div>
    </header>
  );
}

export default Searchbar;

// --------------------------- PropTypes ----------------------

Searchbar.propTypes = {
  submitForm: PropTypes.func.isRequired,
};
