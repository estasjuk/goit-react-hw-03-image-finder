import PropTypes from 'prop-types';
import css from '../../../../components/Pictures/Pictures.module.css';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.Button}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
