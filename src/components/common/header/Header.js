import React from 'react';
import Logo from './logo/Logo';
import NetworkStatusBar from '../network-status-bar/NetworkStatusBar';
import CloseButton from '../close-button/CloseButton';
import './Header.css';

export default () => {
  const applicationName = 'Password backpack';
  const tagline = 'All passwords in one place';

  return (
    <header className="application-header">
      <div className="application-header__close-app-btn">
        <CloseButton />
      </div>
      <Logo />
      <div className="application-header__text-wrapper">
        <h1 className="application-heading-text">{applicationName}</h1>
        <h3>{tagline}</h3>
      </div>
      <div className="application-header__network-status">
        <NetworkStatusBar />
      </div>
    </header>
  );
};
