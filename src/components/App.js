import React, { Fragment } from 'react';
import routes from '../routes';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';

export default () => (
  <Fragment>
    <Header />
    <main>{routes}</main>
    <Footer />
  </Fragment>
);
