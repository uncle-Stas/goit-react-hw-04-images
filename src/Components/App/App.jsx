import { Component } from 'react';

import Searchbar from 'Components/Searchbar/Searchbar';
import Section from 'Components/Section/Section';
import getImages from 'Components/Services/Api';

class App extends Component {
  state = {
    imageQuery: '',
    page: 1,
    imageArr: [],
  };

  addImageQuery = imageQuerySearchbar => {
    console.log('imageQuerySearchbar: ', imageQuerySearchbar);

    this.setState({
      imageQuery: imageQuerySearchbar,
    });

    // const dataArr = this.getFFFFF();
    // console.log('dataArr: ', dataArr);
    // this.getFFFFF();
  };

  // async getFFFFF() {
  //   const dataArr = await getImages(this.state.imageQuery, this.state.page);
  //   // console.log('dataArr: ', dataArr);

  //   this.setState({
  //     imageArr: dataArr,
  //   });
  //   // return dataArr;
  // }

  fetchSSSSS() {
    const { imageQuery, page } = this.state;

    getImages(imageQuery, page).then(images => {
      this.setState({
        imageArr: images,
      });
    });
  }

  render() {
    // this.getFFFFF();
    console.log('new');
    this.fetchSSSSS();
    console.log(this.state.imageArr);
    return (
      <>
        <Searchbar submitForm={this.addImageQuery} />
        <Section>
          <p>My new App</p>
        </Section>
      </>
    );
  }
}

export default App;
