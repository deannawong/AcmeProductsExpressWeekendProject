import React, { Component } from 'react';

const Products = ({ products, destroy }) => {
  return (
    <>
      <h2>Products</h2>
      <ul id='products'>
        {products.map((prod) => (
          <li key={prod.id}>
            <div>{prod.name}</div>
            <button onClick={() => destroy(prod.id)}>Destroy</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Products;
