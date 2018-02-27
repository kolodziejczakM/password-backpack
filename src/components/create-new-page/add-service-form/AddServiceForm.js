import React from 'react';
import PropTypes from 'prop-types';

const KEY_TYPES = {
  PASSWORD: 0,
  LOGIN: 1,
};

const SERVICES = {
  GMAIL: 0,
};

class AddServiceForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      serviceName: SERVICES.GMAIL,
      keyType: KEY_TYPES.PASSWORD,
    };
  }

  handleSubmit() {
    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input />
      </form>
    );
  }
}

AddServiceForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};


export default AddServiceForm;
