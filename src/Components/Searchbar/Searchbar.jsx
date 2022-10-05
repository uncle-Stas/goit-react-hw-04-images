import css from './Searchbar.module.css';

import { Component } from 'react';
import { GoSearch } from 'react-icons/go';
import { IconContext } from 'react-icons';

class Searchbar extends Component {
  state = {
    imageQuery: '',
  };

  handleChange = event => {
    this.setState({
      imageQuery: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { imageQuery } = this.state;

    this.props.submitForm(imageQuery);

    this.setState({
      imageQuery: '',
    });

    event.target.reset();
  };

  render() {
    return (
      <header className={css.header}>
        <div className={css.container}>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.button}>
              {/* <span className={css.buttonLabel}>Search</span> */}
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
              onChange={this.handleChange}
            />
          </form>
        </div>
      </header>
    );
  }
}

export default Searchbar;
