import React, { Component } from 'react';
class Create extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  handleOnChange(ev) {
    this.setState({ text: ev.target.value });
  }
  handleOnSubmit(ev) {
    ev.preventDefault();
    this.props.create({ name: this.state.text }, this.props.history);
  }
  render() {
    const { text } = this.state;
    return (
      <form onSubmit={(ev) => this.handleOnSubmit(ev)}>
        <input
          name='text'
          onChange={(ev) => this.handleOnChange(ev)}
          value={text}
        />
        <button disabled={!text}>Create New Product</button>
      </form>
    );
  }
}
export default Create;
