import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';
//import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, showPicture }) => {
  const elements = pictures.map(({ id, largeImageURL, tags, webformatURL }) => (
    <li
      key={id}
      onClick={() => showPicture({ largeImageURL, tags })}
      className={css.ImageGalleryItem}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));

  return <ul className={css.ImageGallery}>{elements}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  pictures: [],
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showPicture: PropTypes.func.isRequired,
};
