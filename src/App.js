import React, { Component } from 'react';
import Board from './Components/Board'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

        // ,4,4,5,5,6,6,7,7,8,8,9,9];
        const idArray = [0,0,1,1,2,2,3,3];

        this.state ={
            idArray,
        }
    }
  render() {
    return (
      <Board
      number={8}
      idArray={this.state.idArray}
       />
    );
  }
}

export default App;
