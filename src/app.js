import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';
//Importing components
import Nav from './nav';
import Home from './home';
import Products from './products';
import Create from './create';

class App extends Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.destroy = this.destroy.bind(this);
    this.create = this.create.bind(this);
  }

  componentDidMount() {
    axios.get('/api/products').then((res) => {
      this.setState({ products: res.data });
    });
  }
  destroy(id) {
    axios.delete(`/api/products/${id}`).then(() => {
      const filtered = this.state.products.filter((prod) => prod.id !== id);
      this.setState({ products: filtered });
    });
  }
  create(product, history) {
    axios.post('/api/products', product).then((res) => {
      const products = [...this.state.products, res.data];
      this.setState({ products });
      history.push('/products');
    });
  }

  render() {
    const { products } = this.state;
    const { destroy, create } = this;
    return (
      <HashRouter>
        <h1>Acme Products</h1>
        <Route
          render={({ location }) => (
            <Nav pathname={location.pathname} products={products} />
          )}
        />
        <div id='content'>
          <Route exact path='/' component={Home} />
          <Route
            path='/products'
            exact
            render={() => <Products destroy={destroy} products={products} />}
          />
          <Route
            path='/products/create'
            render={({ history }) => (
              <Create create={create} history={history} />
            )}
          />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'), () =>
  console.log('Application has rendered')
);
