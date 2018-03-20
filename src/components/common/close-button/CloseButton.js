import React from 'react';
import CancelIcon from '../../../icons/cancel.svg';
import './CloseButton.css';

const { remote } = window.require('electron');

const closeApplication = () => {
  const win = remote.getCurrentWindow();
  win.close();
};

const staticTexts = new Map([
  ['alt.close_app_btn', 'Click to close this application'],
]);

const iconDimension = 20;

const CloseButton = () => (
  <button className="close-button" onClick={closeApplication}>
    <img
      src={CancelIcon}
      width={iconDimension}
      height={iconDimension}
      alt={staticTexts.get('alt.close_app_btn')}
    />
  </button>
);

export default CloseButton;
