import css from './Section.module.css';
import PropTypes from 'prop-types';

const Section = ({ children }) => {
  return (
    <section className={css.section}>
      <div className={css.container}>{children}</div>
    </section>
  );
};

export default Section;

// --------------------------- PropTypes ----------------------

Section.propTypes = {
  children: PropTypes.element.isRequired,
};
