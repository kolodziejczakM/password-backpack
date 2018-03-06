import React from 'react';
import PropTypes from 'prop-types';
import Logo from './logo/Logo';
import './Header.css';

const Header = (props) => {
  const applicationName = 'Password backpack';
  const tagline = 'All passwords in one place';

  return (
    <header className="application-header">
      <Logo />
      {props.loading && 'LOADING...'}
      <h1 className="application-heading-text">{applicationName}</h1>
      <h3>{tagline}</h3>
    </header>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Header;
