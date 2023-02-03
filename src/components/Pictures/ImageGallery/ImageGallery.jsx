import PropTypes from 'prop-types';

import css from '../Pictures.module.css';
//import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ pictures, showPicture }) => {
  const elements = pictures.map(({ id, webformatURL, largeImageURL, tags }) => (
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

ImageGallery.propTypes = {};
