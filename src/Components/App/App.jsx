import { Component } from 'react';

import getImagesApi from 'Services/Api';
import Searchbar from 'Components/Searchbar/Searchbar';
import Section from 'Components/Section/Section';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Button from 'Components/Button/Button';
import ModalImage from 'Components/ModalImage/ModalImage';
import Loader from 'Components/Loader/Loader';

class App extends Component {
  state = {
    imageQuery: '',
    page: 1,
    totalPage: 1,
    imageArr: [],
    loading: false,
    modal: null,
  };

  componentDidUpdate(_, prevState) {
    const { imageQuery, page } = this.state;

    if (prevState.imageQuery !== imageQuery) {
      this.setState({
        page: 1,
        totalPage: 1,
      });
      this.fetchImagesData();
    }

    if (page !== prevState.page) {
      this.fetchImagesData();
    }
  }

  addImageQuery = imageQuerySearchbar => {
    this.setState({
      imageQuery: imageQuerySearchbar,
      page: 1,
    });
  };

  fetchImagesData() {
    const { imageQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    getImagesApi(imageQuery, page)
      .then(images => {
        if (page > 1) {
          this.setState(prevState => ({
            imageArr: [...prevState.imageArr, ...images.hits],
          }));
        } else {
          this.setState({
            imageArr: images.hits,
            totalPage: Math.ceil(images.totalHits / 12),
          });
        }
      })
      .catch(error => console.log(error.code))
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showModal = modalImage => {
    this.setState({ modal: modalImage });
  };

  closeModal = () => {
    this.setState({ modal: null });
  };

  render() {
    const { imageArr, totalPage, page, loading, modal } = this.state;

    return (
      <>
        <Searchbar submitForm={this.addImageQuery} />
        <Section>
          <>
            <ImageGallery imageArr={imageArr} showModal={this.showModal} />
            {loading && <Loader />}
            {totalPage > 1 && totalPage > page && (
              <Button BtnLoadMore={this.loadMore} />
            )}
          </>
        </Section>
        {modal && (
          <ModalImage
            closeModal={this.closeModal}
            imageURL={modal.largeImageURL}
            imageAlt={modal.tags}
          />
        )}
      </>
    );
  }
}

export default App;
