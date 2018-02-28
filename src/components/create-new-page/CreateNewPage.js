import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddServiceForm from './add-service-form/AddServiceForm';

const staticTexts = new Map([
  ['page.create_new.header', 'Create new password file'],
  ['page.go_back', 'Go back'],
  ['alt.service_new', 'Click to add new service'],
  ['desc.service_new', 'Add new service'],
]);

class CreateNewPage extends React.Component {
  constructor() {
    super();
    this.goToDashboard = this.goToDashboard.bind(this);
  }

  goToDashboard() {
    this.props.history.push('/');
  }

  addService(stateFromChild) {
    console.log('stateFromChild: ', stateFromChild);
    console.log('Add service function', this);
  }

  render() {
    return (
      <section>
        <header>
          <button onClick={this.goToDashboard}>{staticTexts.get('page.go_back')}</button>
          <h1 className="create-new-page-heading-text">{staticTexts.get('page.create_new.header')}</h1>
        </header>
        <AddServiceForm onFormSubmit={this.addService} />
        <hr />
        <section className="services"> HERE WILL BE SERVICE LIST</section>
      </section>
    );
  }
}

CreateNewPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(CreateNewPage);
