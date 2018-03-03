import React from 'react';
import PropTypes from 'prop-types';
import './Service.css';

const staticTexts = new Map([
  ['preview.alt_text', 'Preview icon'],
  ['label.name', 'name:'],
  ['label.passwordValue', 'password:'],
  ['label.passwordTypeValue', 'type:'],
]);

const iconDimension = 40;

const Service = ({
  icon,
  name,
  templateName,
  passwordValue,
  passwordTypeValue,
}) => (
  <section className="service">
    <section>
      <figure>
        <img
          src={icon}
          width={iconDimension}
          height={iconDimension}
          alt={staticTexts.get('preview.alt_text')}
        />
        <figcaption>{templateName}</figcaption>
      </figure>
    </section>
    <section>
      <dl>
        <dt>{staticTexts.get('label.name')}</dt><dd>{name}</dd>
        <dt>{staticTexts.get('label.passwordValue')}</dt><dd>{passwordValue}</dd>
        <dt>{staticTexts.get('label.passwordTypeValue')}</dt><dd>{passwordTypeValue}</dd>
      </dl>
    </section>
  </section>
);

Service.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  templateName: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordTypeValue: PropTypes.string.isRequired,
};

export default Service;
