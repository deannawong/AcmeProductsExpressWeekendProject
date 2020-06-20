import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route } from 'react-router-dom';
import axios from 'axios';
//Importing Smaller Components
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
  create(prod, history) {
    axios.post('/api/products', prod).then((res) => {
      this.setState({ products: [...this.state.products, res.data] });
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
          <Route path='/' render={Home} />
          <Route
            path='/products'
            exact
            render={() => <Products destroy={destroy} products={products} />}
          />
          <Route
            path='/create'
            exact
            render={({ history }) => (
              <Create history={history} create={create} />
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
