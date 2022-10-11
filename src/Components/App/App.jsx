import { Component } from 'react';

import Searchbar from 'Components/Searchbar/Searchbar';
import Section from 'Components/Section/Section';
import getImagesApi from 'Components/Services/Api';
import ImageGallery from 'Components/ImageGallery/ImageGallery';
import Button from 'Components/Button/Button';

class App extends Component {
  state = {
    imageQuery: '',
    page: 1,
    totalPage: 1,
    imageArr: [],
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
    });

    console.log('imageQuerySearchbar: ', imageQuerySearchbar);
  };

  fetchImagesData() {
    const { imageQuery, page } = this.state;

    getImagesApi(imageQuery, page).then(images => {
      console.log('images: ', images);

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
    });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  render() {
    const { imageArr, totalPage, page } = this.state;

    console.log('new');
    console.log(imageArr);
    console.log('totalPage: ', totalPage);
    console.log('page: ', page);

    return (
      <>
        <Searchbar submitForm={this.addImageQuery} />
        <Section>
          <>
            <ImageGallery imageArr={imageArr} />
            {totalPage > 1 && totalPage > page && (
              <Button BtnLoadMore={this.loadMore} />
            )}
          </>
        </Section>
      </>
    );
  }
}

export default App;
