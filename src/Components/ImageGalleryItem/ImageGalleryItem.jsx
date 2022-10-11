import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageURL, imageAlt }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={imageURL}
        alt={imageAlt}
      />
    </li>
  );
};

export default ImageGalleryItem;
