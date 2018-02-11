import React, { Component, Fragment } from 'react';
import routes from '../routes';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';

class App extends Component {
  render() {
    return (
    <Fragment>
      <Header/>
      <main>{routes}</main>
      <Footer/>
    </Fragment>
    );
  }
}

export default App;
