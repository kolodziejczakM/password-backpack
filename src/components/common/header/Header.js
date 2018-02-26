import React from 'react';
import Logo from './logo/Logo';
import './Header.css';

export default () => {
  const applicationName = 'Password backpack';
  const tagline = 'All passwords in one place';

  return (
    <header className="application-header">
      <Logo />
      <h1 className="application-heading-text">{applicationName}</h1>
      <h3>{tagline}</h3>
    </header>
  );
};
