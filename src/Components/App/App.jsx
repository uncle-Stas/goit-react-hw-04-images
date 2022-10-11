import { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Searchbar from 'Components/Searchbar/Searchbar';
import Section from 'Components/Section/Section';
import getImagesApi from 'Services/Api';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Button from 'Components/Button/Button';
import ModalImage from 'Components/ModalImage/ModalImage';

class App extends Component {
  state = {
    imageQuery: '',
    page: 1,
    totalPage: 1,
    imageArr: [],
    loading: false,
    modal: null,
  };

  shouldComponentUpdate(_, nextState) {
    console.log('this.state.imageArr', this.state.imageArr);
    console.log('nextState: ', nextState);
    return true;
  }

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

    console.log('imageQuerySearchbar: ', imageQuerySearchbar);
  };

  fetchImagesData() {
    const { imageQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    getImagesApi(imageQuery, page)
      .then(images => {
        console.log('imagesFETCH: ', images);

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
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
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

    console.log('--------new!!!');
    console.log('imageArr: ', imageArr);
    console.log('totalPage: ', totalPage);
    console.log('page: ', page);

    return (
      <>
        <Searchbar submitForm={this.addImageQuery} />
        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              position: 'fixed',
              top: '0',
              left: '0',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '1200',
            }}
            wrapperClassName=""
            visible={true}
          />
        )}
        <Section>
          <>
            <ImageGallery imageArr={imageArr} showModal={this.showModal} />
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
