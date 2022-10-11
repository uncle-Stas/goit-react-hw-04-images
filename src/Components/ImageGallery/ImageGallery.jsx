import css from './ImageGallery.module.css';

import ImageGalleryItem from 'Components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imageArr, showModal }) => {
  const imageClick = image => {
    showModal(image);
  };

  return (
    <ul className={css.imageGallery}>
      {imageArr.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          imageClick={imageClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
