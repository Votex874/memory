import React, { Component } from 'react';
import Board from './Components/Board'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

    // ,2,2,3,3,4,4,5,5,6,6,7,7
        const idArray = [0,0,1,1];
        const number = 4;

        this.state ={
            idArray,
            number,
        }
    }
  render() {
    return (
      <Board
      number={this.state.number}
      idArray={this.state.idArray}
       />
    );
  }
}

export default App;
