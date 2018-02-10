import React, { Component } from 'react';
import routes from '../routes';
// import PropTypes from 'prop-types';

class App extends Component {
  render() {
    return (
      <main>
        <section className="main-content-wrapper">
          <header>HEADER</header>
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
