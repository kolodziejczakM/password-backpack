import React from 'react';
import PropTypes from 'prop-types';
import { head } from 'ramda';
import './AddServiceForm.css';
import UniqueIdentifierProvider from '../../../providers/UniqueIdentifierProvider';
import ServiceTemplatesProvider from '../../../providers/ServiceTemplatesProvider';
import withPopover from '../../common/HOCs/withPopover';
import PreviewIcon from '../preview-icon/PreviewIcon';

const PASSWORD_ID = 'PASSWORD';
const LOGIN_ID = 'LOGIN';
const PREVIEW_DIMENSION = 100;

const staticTexts = new Map([
  ['select.login', 'Login'],
  ['select.password', 'Password'],
  ['placeholder.password', 'Type the value of'],
  ['placeholder.service_name', 'Type service name'],
  ['label.choose.service_template', 'Choose a service template:'],
  ['label.choose.service_name', 'Name current service:'],
  ['button.submit_label', 'Append service'],
  ['alt.service_icon_preview', 'Service icon preview'],
  ['preview.icon.popover', 'This is service template icon. You can change it only by changing service template.'],
]);

const PreviewIconWithPopover = withPopover({
  text: staticTexts.get('preview.icon.popover'),
  removeChildrenMargins: true,
})(PreviewIcon);


const passwordTypes = [
  { label: staticTexts.get('select.password'), value: PASSWORD_ID },
  { label: staticTexts.get('select.login'), value: LOGIN_ID },
];

const getPasswordTypeByLabel = label => (
  passwordTypes.find(passwordType => passwordType.label === label)
);

const formInputNames = {
  serviceName: 'service-name',
  passwordValue: 'password-value',
};

const initialFormState = {
  validForm: false,
  serviceNameValid: false,
  passwordValueValid: false,
};

const initialState = {
  service: head(ServiceTemplatesProvider.getServiceTemplates()),
  passwordType: head(passwordTypes),
  form: initialFormState,
};

class AddServiceForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPasswordTypeChange = this.onPasswordTypeChange.bind(this);
    this.onPasswordValueChange = this.onPasswordValueChange.bind(this);
    this.onServiceNameChange = this.onServiceNameChange.bind(this);
    this.onWholeServiceChange = this.onWholeServiceChange.bind(this);
    this.validateInput = this.validateInput.bind(this);

    this.state = initialState;
  }

  onPasswordValueChange(event) {
    this.validateInput(event.target, 'passwordValue');
    this.setState({ service: { ...this.state.service, passwordValue: event.target.value } });
  }

  onPasswordTypeChange(event) {
    this.setState({ passwordType: getPasswordTypeByLabel(event.target.value) });
  }

  onServiceNameChange(event) {
    this.validateInput(event.target, 'serviceName');
    this.setState({ service: { ...this.state.service, name: event.target.value } });
  }

  onWholeServiceChange(event) {
    this.setState({
      service: ServiceTemplatesProvider.getServiceTemplateByName(event.target.value),
      form: {
        ...this.state.form,
        serviceNameValid: event.target.value !== 'Custom',
        passwordValueValid: false,
      },
    }, this.validateForm);
  }

  validateInput(inputTarget, fieldName) {
    if (inputTarget.name === formInputNames[fieldName] && inputTarget.value.length) {
      this.setState({
        form: { ...this.state.form, [`${fieldName}Valid`]: true },
      }, this.validateForm);
    } else if (inputTarget.name === formInputNames[fieldName]) {
      this.setState({
        form: { ...this.state.form, [`${fieldName}Valid`]: false },
      }, this.validateForm);
    }
  }

  validateForm() {
    const fieldsToValidate = [
      this.state.form.serviceNameValid,
      this.state.form.passwordValueValid,
    ];

    const valid = fieldsToValidate.every(fieldValue => fieldValue);

    this.setState({ form: { ...this.state.form, validForm: valid } });
  }

  resetForm() {
    this.setState(initialState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetForm();

    this.props.onFormSubmit({
      serviceCore: { ...this.state.service, id: UniqueIdentifierProvider.getPrefixedUUID('service') },
      passwordType: this.state.passwordType,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="add-service-form">
        <fieldset>
          <label className="add-service-form__label-container">
            <span className="add-service-form__label">{staticTexts.get('label.choose.service_template')}</span>
            <select
              className="add-service-form__select password-backpack-select"
              value={this.state.service.templateName}
              onChange={this.onWholeServiceChange}
            >
              {ServiceTemplatesProvider.getServiceTemplates().map(template => (
                <option key={template.templateName} value={template.templateName}>
                  {template.templateName}
                </option>
              ))}
            </select>
          </label>
          <label className="add-service-form__label-container">
            <span className="add-service-form__label">{staticTexts.get('label.choose.service_name')}</span>
            <input
              name="service-name"
              className="add-service-form__text-input"
              type="text"
              value={this.state.service.name}
              placeholder={staticTexts.get('placeholder.service_name')}
              onInput={this.onServiceNameChange}
            />
          </label>
          <label className="add-service-form__label-container">
            <select
              className="
              add-service-form__select add-service-form__select--label password-backpack-select"
              value={this.state.passwordType.label}
              onChange={this.onPasswordTypeChange}
            >
              {passwordTypes.map(passwordType => (
                <option key={passwordType.value} value={passwordType.label}>
                  {passwordType.label}
                </option>
              ))}
            </select>
            <input
              name="password-value"
              className="add-service-form__text-input"
              type="text"
              value={this.state.service.passwordValue}
              placeholder={`${staticTexts.get('placeholder.password')} ${this.state.passwordType.label.toLowerCase()}`}
              onInput={this.onPasswordValueChange}
            />
          </label>
          <button
            disabled={!this.state.form.validForm}
            className="add-service-form__submit-btn password-backpack-button"
            type="submit"
          >
            {staticTexts.get('button.submit_label')}
          </button>
        </fieldset>
        <fieldset className="icon-preview-section">
          <PreviewIconWithPopover
            src={this.state.service.icon}
            alt={staticTexts.get('alt.service_icon_preview')}
            width={PREVIEW_DIMENSION}
            height={PREVIEW_DIMENSION}
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
