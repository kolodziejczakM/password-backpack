import React from 'react';
import Logo from './logo/Logo';
import NetworkStatusBar from '../network-status-bar/NetworkStatusBar';
import CloseButton from '../close-button/CloseButton';
import './Header.css';

const staticTexts = new Map([
  ['app.name', 'Password backpack'],
  ['app.tagline', 'All passwords in one place'],
  ['app.authors', 'Authors'],
]);

export default () => (
  <header className="application-header">
    <div className="application-header__close-app-btn">
      <CloseButton />
    </div>
    <Logo />
    <div className="application-header__text-wrapper">
      <h1 className="application-heading-text">{staticTexts.get('app.name')}</h1>
      <h3>{staticTexts.get('app.tagline')}</h3>
    </div>
    <div className="application-header__upper-left-corner">
      <NetworkStatusBar />
      <div className="show-authors-btn-container">
        <button className="show-authors-btn">{staticTexts.get('app.authors')}</button>
      </div>
    </div>
  </header>
);
