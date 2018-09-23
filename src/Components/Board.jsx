import React, { Component } from 'react';
import './Board.css'


class Board extends Component {
    constructor(props){
        super(props);

        const array = this.createMemoryArray();

        this.state = {
            array,
        };
    }

    createMemoryArray = () => {
        const {number} = this.props;
        let array = [];

        for (let i = 0; i < number; i++) {
            array.push(false);
        }
        return array;
    };


    simpleLoop = () => {
        const a = 5;
        const b = 5;


        for(let i = 0; i < a ; i++ ){
            console.log(i);
            for(let j = 0; j < b; j++){
                console.log(j);
            }
        }
    };

    creatingBoard = () => {
        const rows = Math.ceil(this.props.number / 5);
        const memoryCards = this.state.array;

        const boardArray = [];
        let arraySliced = [];
        console.log(memoryCards.slice(16, 20));

        for(let i = 0; i <= rows; i++){
            arraySliced[i] = memoryCards.slice((i*4), 4*(i+1));
            console.log(arraySliced[i]);
            console.log((i*4));
            console.log(4*(i +1) +1);
        }
        console.log(arraySliced);


        // for(let i = 0; i < rows; i++){
        //     boardArray[i] = <div className='row'>
        //         {memoryCards.map(e => {
        //             return <div>
        //                 {e}
        //             </div>
        //         })}
        //     </div>
        // }
        //
        //
        // return boardArray;
    };


    render() {

        return (
            <div className='mainContainer'>
                <div className="board">
                    {this.creatingBoard()}
                </div>
            </div>
        );
    }
}

export default Board;
