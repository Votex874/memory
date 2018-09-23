import React, { Component } from 'react';
import Board from './Components/Board'
import './App.css';

class App extends Component {
  render() {
    return (
      <Board
      number={20}
       />
    );
  }
}

export default App;
