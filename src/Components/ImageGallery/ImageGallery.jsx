import css from './ImageGallery.module.css';

import ImageGalleryItem from 'Components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imageArr }) => {
  return (
    <ul className={css.imageGallery}>
      {imageArr.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem key={id} imageURL={webformatURL} imageAlt={tags} />
      ))}
    </ul>
  );
};

export default ImageGallery;
