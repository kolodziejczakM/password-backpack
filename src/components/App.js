import React, { Fragment } from 'react';
import routes from '../routes';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';

// Thanks to this flag user don't see "being online alert" every time he navigates between pages.
window.allowUnsafeMode = false;

export default () => (
  <Fragment>
    <Header />
    <main>{routes}</main>
    <Footer />
  </Fragment>
);
