import React, { Component } from 'react';

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    ev.preventDefault();
    this.props.create(this.state, this.props.history);
  }
  render() {
    const { name } = this.state;
    const { onSubmit, onChange } = this;
    return (
      <div>
        <h2>Create A Product</h2>
        <form onSubmit={onSubmit}>
          <input
            name='name'
            onChange={onChange}
            value={name}
            placeholder='enter a new product'
          />
          <button disabled={!name}>Save</button>
        </form>
      </div>
    );
  }
}
export default Create;
