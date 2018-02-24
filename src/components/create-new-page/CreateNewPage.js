import React from 'react';
import { withRouter } from 'react-router-dom';
import './CreateNewPage.css';

class CreateNewPage extends React.Component {

  constructor() {
    super();
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  goToDashboard() {
    this.props.history.push('/');
  }

  render() {
      const staticTexts = {
        header: 'Create new password file'
      };

    return (
      <section>
        <h1 className="create-new-page-heading-text">{staticTexts.header}</h1>
        <button onClick={this.goToDashboard}>Go back</button>
      </section>
    );
  }
}

export default withRouter(CreateNewPage);
