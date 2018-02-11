import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './logo/Logo';
import './Header.css';

export default () => {
  const applicationName = 'Password backpack'
  const tagline = 'All passwords in one place';
  const activeClass = 'active';
  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'About', href: '/about'}
  ];

  return (
    <header>
      <Logo></Logo>
      <h1>{applicationName}</h1>
      <h3>{tagline}</h3>
      <nav>
        {links.map(link => <NavLink exact to={link.href} activeClassName={activeClass} key={link.label}>{link.label}</NavLink>)}
      </nav>
    </header>
  );
};
