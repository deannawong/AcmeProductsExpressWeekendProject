import React, { Component } from 'react';

const Products = ({ products, destroy }) => {
  return (
    <ul id='products'>
      {products.map((p) => (
        <li key={p.id}>
          <div>{p.name}</div>
          <button onClick={() => destroy(p.id)}>DESTROY</button>
        </li>
      ))}
    </ul>
  );
};
export default Products;
