import React, { Component } from 'react';
import { render } from 'react-dom';
import Todo from './Todo';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
