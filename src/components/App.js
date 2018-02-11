import React, { Component } from 'react';
import routes from '../routes';
import Header from './common/header/Header';
// import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <main>
        <Header/>
        <section className="main-content-wrapper">
          {routes}
        </section>
      </main>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.object.isRequired
// };

export default App;
