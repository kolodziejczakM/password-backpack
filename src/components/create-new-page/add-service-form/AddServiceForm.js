import React from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';

const PASSWORD_ID = 'PASSWORD';
const LOGIN_ID = 'LOGIN';

const staticTexts = new Map([
  ['select.login', 'Login'],
  ['select.password', 'Password'],
  ['placeholder.password', 'Type the value'],
  ['label.choose.service_template', 'Choose a service template:'],
  ['label.choose.service_name', 'Name current service:'],
  ['button.submit_label', 'Append service'],
]);

const createServiceTemplate = (templateName, name, icon = '', passwordValue = '') => {
  if (name === undefined) {
    return {
      templateName,
      name: templateName,
      icon,
      passwordValue,
    };
  }

  return {
    templateName, name, icon, passwordValue,
  };
};

const serviceTemplates = [
  createServiceTemplate('Custom', ''),
  createServiceTemplate('Gmail'),
  createServiceTemplate('Facebook'),
  createServiceTemplate('Twitter'),
  createServiceTemplate('Medium'),
  createServiceTemplate('Unsplash'),
];

const getServicetemplateByName = templateName => (
  serviceTemplates.find(template => template.templateName === templateName)
);

const passwordTypes = [
  { label: staticTexts.get('select.password'), value: PASSWORD_ID },
  { label: staticTexts.get('select.login'), value: LOGIN_ID },
];

const initialState = {
  service: head(serviceTemplates),
  passwordType: head(passwordTypes),
};

class AddServiceForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPasswordTypeChange = this.onPasswordTypeChange.bind(this);
    this.onPasswordValueChange = this.onPasswordValueChange.bind(this);
    this.onServiceNameChange = this.onServiceNameChange.bind(this);
    this.onWholeServiceChange = this.onWholeServiceChange.bind(this);

    this.state = initialState;
  }

  onPasswordValueChange(event) {
    this.setState({ service: { ...this.state.service, passwordValue: event.target.value } });
  }

  onPasswordTypeChange(event) {
    this.setState({ passwordType: event.target.value });
  }

  onServiceNameChange(event) {
    this.setState({ service: { ...this.state.service, name: event.target.value } });
  }

  onWholeServiceChange(event) {
    this.setState({ service: getServicetemplateByName(event.target.value) });
  }

  resetForm() {
    this.setState(initialState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetForm();
    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label>
            {staticTexts.get('label.choose.service_template')}

            <select value={this.state.service.templateName} onChange={this.onWholeServiceChange}>
              {serviceTemplates.map(template => (
                <option key={template.templateName} value={template.templateName}>
                  {template.templateName}
                </option>
              ))}
            </select>
          </label>

          <label>
            {staticTexts.get('label.choose.service_name')}

            <input
              type="text"
              value={this.state.service.name}
              placeholder="Type service name"
              onChange={this.onServiceNameChange}
            />
          </label>

        </fieldset>

        <fieldset>
          <select value={this.state.passwordType} onChange={this.onPasswordTypeChange}>
            {passwordTypes.map(passwordType => (
              <option key={passwordType.value} value={passwordType.value}>
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
        <button type="submit">{staticTexts.get('button.submit_label')}</button>
      </form>
    );
  }
}

AddServiceForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default AddServiceForm;
