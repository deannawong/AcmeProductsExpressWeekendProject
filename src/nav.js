import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ pathname, products }) => {
  return (
    <div>
      <Link to='/'>HOME</Link>
      <Link to='/products'>{`PRODUCTS(${products.length})`}</Link>
      <Link to='/create'>CREATE NEW PRODUCT</Link>
    </div>
  );
};
export default Nav;
