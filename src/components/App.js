import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';

const App = props => (
  <Fragment>
    <Header loading={props.loading} />
    <main>{routes}</main>
    <Footer />
  </Fragment>
);

function mapStateToProps(state) {
  return {
    loading: state.ajaxCallsInProgress > 0,
  };
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default withRouter(connect(mapStateToProps)(App));
