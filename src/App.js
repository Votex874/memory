import React, { Component } from 'react';
import Board from './Components/Board'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);

    //
        const idArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11];
        const levels = ['12','18','24'];
        let number = 18;

        this.state ={
            idArray,
            number,
            levels,
        }
    }

    handleChangeValue = e => {
            this.setState({
                number: Number(e),
            });
    };

    creatingLevels = () => {
        return this.state.levels.map((e) => {
            return <div
                className='level'
                onClick={() =>this.handleChangeValue(e)}
                key={e}>
                {e}
            </div>
        })
    };


  render() {

    return (<div>
            {this.creatingLevels()}
            <Board
                number={this.state.number}
                idArray={this.state.idArray}
            />
        </div>
    );
  }
}

export default App;
