import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddServiceForm from './add-service-form/AddServiceForm';
import './CreateNewPage.css';
import Service from './service/Service';

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
    this.appendService = this.appendService.bind(this);
    this.dropService = this.dropService.bind(this);

    this.state = {
      services: [],
    };
  }

  goToDashboard() {
    this.props.history.push('/');
  }

  appendService(serviceWithPasswordType) {
    this.setState({ services: [...this.state.services, serviceWithPasswordType] });
  }

  dropService(serviceId) {
    this.setState({
      services: this.state.services.filter(element => element.service.id !== serviceId),
    });
  }

  render() {
    return (
      <section>
        <header>
          <button onClick={this.goToDashboard}>{staticTexts.get('page.go_back')}</button>
          <h1 className="create-new-page-heading-text">{staticTexts.get('page.create_new.header')}</h1>
        </header>
        <AddServiceForm onFormSubmit={this.appendService} />
        <hr />
        <section className="service-list">
          {this.state.services.map(element => (
            <Service
              key={element.service.id}
              id={element.service.id}
              icon={element.service.icon}
              name={element.service.name}
              templateName={element.service.templateName}
              passwordValue={element.service.passwordValue}
              passwordTypeValue={element.passwordType.value}
              onDeleteClick={this.dropService}
            />
          ))}
        </section>
      </section>
    );
  }
}

CreateNewPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default withRouter(CreateNewPage);
