import React, { Component } from 'react';
import Board from './Board'


class Game extends Component {
    constructor(props){
        super(props);


        const idArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11];
        let number = 12;

        this.state ={
            idArray,
            number,
        }
    }


    render() {

        const  {number, idArray} = this.state;
        return (
            <Board
                number={number}
                idArray={idArray}
            />
        );
    }
}

export default Game;
