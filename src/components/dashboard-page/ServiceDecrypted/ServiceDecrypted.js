import React from 'react';
import PropTypes from 'prop-types';
import './ServiceDecrypted.css';

const iconDimension = 40;

const staticTexts = new Map([
  ['preview.alt_text', 'Preview icon'],
]);

class ServiceDecrypted extends React.Component {
  constructor() {
    super();
    this.getClassName = this.getClassName.bind(this);
    this.toggleClicked = this.toggleClicked.bind(this);

    this.state = {
      clicked: false,
    };
  }

  getClassName() {
    if (!this.state.clicked) {
      return 'service-decrypted';
    }

    return 'service-decrypted clicked';
  }

  toggleClicked() {
    this.setState({
      clicked: !this.state.clicked,
    });
  }

  render() {
    const {
      name, icon, passwordValue, passwordTypeValue,
    } = this.props;

    return (
      <button className={this.getClassName()} onClick={this.toggleClicked}>
        <div className="service-decrypted__inner-container">
          <section className="service-decrypted__front">
            <figure className="service-decrypted__icon">
              <img
                src={icon}
                width={iconDimension}
                height={iconDimension}
                alt={staticTexts.get('preview.alt_text')}
              />
            </figure>
            <ul className="service-decrypted__data-list">
              <li>
                <span>{name}</span>
              </li>
              <li>
                <span>{passwordTypeValue}</span>
              </li>
            </ul>
          </section>
          <section className="service-decrypted__back">
            <span>{passwordValue}</span>
          </section>
        </div>
      </button>
    );
  }
}

ServiceDecrypted.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordTypeValue: PropTypes.string.isRequired,
};

export default ServiceDecrypted;
