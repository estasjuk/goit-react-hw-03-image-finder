import PropTypes from 'prop-types';

import css from '../../Pictures.module.css';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  showPicture,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={e => showPicture({ largeImageURL })}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
