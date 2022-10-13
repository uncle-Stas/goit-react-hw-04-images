import { useEffect, useState } from 'react';

import getImagesApi from 'Services/Api';
import Searchbar from 'Components/Searchbar/Searchbar';
import Section from 'Components/Section/Section';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Button from 'Components/Button/Button';
import ModalImage from 'Components/ModalImage/ModalImage';
import Loader from 'Components/Loader/Loader';

function App() {
  const [imageQuery, setImageQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [imageArr, setImageArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  const addImageQuery = imageQuerySearchbar => {
    setImageQuery(imageQuerySearchbar);
    setPage(1);
  };

  useEffect(() => {
    if (imageQuery) {
      // console.log('imageQuery: ', imageQuery);
      setLoading(true);

      setPage(1);
      setTotalPage(1);

      getImagesApi(imageQuery, page)
        .then(images => {
          setImageArr(images.hits);
          setTotalPage(Math.ceil(images.totalHits / 12));
        })
        .catch(error => console.log(error.code))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [imageQuery]);

  useEffect(() => {
    if (page > 1) {
      // console.log('page: ', page);
      setLoading(true);

      getImagesApi(imageQuery, page)
        .then(images => {
          setImageArr(prev => [...prev, ...images.hits]);
        })
        .catch(error => console.log(error.code))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const showModal = modalImage => {
    setModal(modalImage);
  };

  const closeModal = () => {
    setModal(null);
  };

  return (
    <>
      <Searchbar submitForm={addImageQuery} />
      <Section>
        <>
          <ImageGallery imageArr={imageArr} showModal={showModal} />
          {loading && <Loader />}
          {totalPage > 1 && totalPage > page && (
            <Button BtnLoadMore={loadMore} />
          )}
        </>
      </Section>
      {modal && (
        <ModalImage
          closeModal={closeModal}
          imageURL={modal.largeImageURL}
          imageAlt={modal.tags}
        />
      )}
    </>
  );
}

export default App;
