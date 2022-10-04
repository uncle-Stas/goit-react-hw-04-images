import Searchbar from 'Components/Searchbar/Searchbar';
import Section from 'Components/Section/Section';
import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <>
        <Searchbar />
        <Section>
          <p>My new App</p>
        </Section>
      </>
    );
  }
}

export default App;
