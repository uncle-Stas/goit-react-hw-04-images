import css from './ImageGalleryItem.module.css';

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
