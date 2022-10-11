import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, imageClick }) => {
  const onImageClick = () => {
    imageClick(image);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={onImageClick}
      />
    </li>
  );
};

export default ImageGalleryItem;

// --------------------------- PropTypes ----------------------

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  imageClick: PropTypes.func.isRequired,
};
