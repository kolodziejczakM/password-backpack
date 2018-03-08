import React from 'react';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import './Service.css';
import RemoveIcon from './../../../icons/remove.svg';

const staticTexts = new Map([
  ['preview.alt_text', 'Preview icon'],
  ['label.name', 'name:'],
  ['label.password_value', 'password:'],
  ['label.password_type_value', 'type:'],
  ['alt.remove_btn', 'Click to remove service'],
  ['alert.text.user_sure', 'Are you sure you want to delete'],
]);

const iconDimension = 40;

const Service = ({
  id,
  icon,
  name,
  templateName,
  passwordValue,
  passwordTypeValue,
  onDeleteClick,
}) => {
  const isUserSureDialog = () => swal(
    staticTexts.get('alert.text.user_sure'),
    { buttons: { cancel: true, confirm: true }, dangerMode: true },
  );

  async function deleteService() {
    if (await isUserSureDialog()) {
      onDeleteClick(id);
    }
  }

  return (
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
        <button onClick={deleteService}>
          <img
            src={RemoveIcon}
            alt={staticTexts.get('alt.remove_btn')}
            width={iconDimension}
            height={iconDimension}
          />
        </button>
      </section>
      <section>
        <dl>
          <dt>{staticTexts.get('label.name')}</dt><dd>{name}</dd>
          <dt>{staticTexts.get('label.password_value')}</dt><dd>{passwordValue}</dd>
          <dt>{staticTexts.get('label.password_type_value')}</dt><dd>{passwordTypeValue}</dd>
        </dl>
      </section>
    </section>
  );
};

Service.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  templateName: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  passwordTypeValue: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Service;
