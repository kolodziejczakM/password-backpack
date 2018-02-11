import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
  const links = [
    { label: 'Dashboard', href: '/'},
    { label: 'About', href: '/about'}
  ];

  return (
    <header>
      <nav>
        {links.map(link => <NavLink exact to={link.href} activeClassName="active" key={link.label}>{link.label}</NavLink>)}
      </nav>
    </header>
  );
};
