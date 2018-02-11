import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => {
  return (
    <header>
      <nav>
        <NavLink to="/" activeClassName="active">Dashboard</NavLink>      
        <NavLink to="/about" activeClassName="active">About</NavLink>
      </nav>
    </header>
  );
};
