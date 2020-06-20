import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ pathname, products }) => {
  const links = [
    { text: 'Home', to: '/' },
    { text: `Products (${products.length})`, to: '/products' },
    { text: 'Create a Product', to: '/products/create' },
  ];
  return (
    <div>
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          className={pathname === link.to ? 'active' : ''}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default Nav;
