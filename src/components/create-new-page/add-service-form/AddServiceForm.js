import React from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';

const PASSWORD_ID = 'PASSWORD';
const LOGIN_ID = 'LOGIN';

const staticTexts = new Map([
  ['select.login', 'Login'],
  ['select.password', 'Password'],
  ['placeholder.password', 'Type your password'],
  ['label.choose.service', 'Choose a service template:'],
  ['label.name.service', 'Name current service template:'],
]);

const createService = (name, icon) => ({ name, icon, passwordValue: '' });

const services = [
  createService('Custom', ''),
  createService('Gmail', ''),
  createService('Facebook', ''),
  createService('Twitter', ''),
  createService('Medium', ''),
  createService('Unsplash', ''),
];

const passwordTypes = [
  { label: staticTexts.get('select.password'), value: PASSWORD_ID },
  { label: staticTexts.get('select.login'), value: LOGIN_ID },
];

class AddServiceForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPasswordTypeChange = this.onPasswordTypeChange.bind(this);
    this.onPasswordValueChange = this.onPasswordValueChange.bind(this);
    this.onServiceNameChange = this.onServiceNameChange.bind(this);
    this.onWholeServiceChange = this.onWholeServiceChange.bind(this);

    this.state = {
      service: head(services),
      passwordType: head(passwordTypes),
    };
  }

  onPasswordValueChange(event) {
    this.setState({ service: { ...this.state.service, passwordValue: event.target.value } });
    console.log('state now: ', this.state);
  }

  onPasswordTypeChange(event) {
    this.setState({ passwordType: event.target.value });
  }

  onServiceNameChange(event) {
    this.setState({ service: { ...this.state.service, name: event.target.value } });
  }

  onWholeServiceChange(event) {
    this.setState({ service: services[event.target.value] });
  }

  handleSubmit() {
    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label>
            {staticTexts.get('label.choose.service')}

            <select onChange={this.onWholeServiceChange}>
              {services.map((service, index) => (
                <option key={service.name} value={index}>{service.name}</option>
              ))}
            </select>
          </label>

          <label>
            {staticTexts.get('label.name.service')}
            <input
              type="text"
              value={this.state.service.name}
              placeholder="Type service name"
              onChange={this.onServiceNameChange}
            />
          </label>

        </fieldset>

        <fieldset>
          <select value={this.state.keyType} onChange={this.onPasswordTypeChange}>
            {passwordTypes.map(passwordType => (
              <option
                key={passwordType.value}
                value={passwordType.value}
              >
                {passwordType.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={this.state.service.passwordValue}
            placeholder={staticTexts.get('placeholder.password')}
            onChange={this.onPasswordValueChange}
          />
        </fieldset>
      </form>
    );
  }
}

AddServiceForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default AddServiceForm;
