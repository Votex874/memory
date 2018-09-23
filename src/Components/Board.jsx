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
        //tworzy nam tablice z propsu który bedziemy podawac jako wielkosc tablicy , na podstawie tej tablicy
        // bedzie sprawdzał program czy sa odkryte karty czy nie, przekazuje z propsa id danej karty
        const {number,idArray} = this.props;
        this.shuffle(idArray);


        console.log(idArray);
        let array = [];

        for (let i = 0; i < number; i++) {
            array.push({
                flipped: false,
                id: idArray[i],
            });
        }
        return array;
    };

    shuffle = (a) => {
        //funkcja miesza nam tablice
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };




    creatingBoard = () => {
        //pobieram ilosc kart i dziele tak aby wyszly mi wiersze
        const rows = Math.ceil(this.props.number / 5);
        //pobieram cała tablice false
        const memoryCards = this.state.array;

        const boardArray = [];
        let arraySliced = [];

        for(let i = 0; i <= rows; i++){
            arraySliced[i] = memoryCards.slice((i*4), 4*(i+1));
        }

        //zrobienie planszy pierwsza petla tworzy wiersze a w danym wierszu mapujemy po tablicy z falsami
        for(let i = 0; i <= rows; i++){
            boardArray[i] = <div key={i} className='row'>
                {arraySliced[i].map((e,j) => {
                    return <div
                        key={j}
                        className='card'
                        id={e.id}
                    >
                        {e.id}
                    </div>
                })}
            </div>
        }
        return boardArray;
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
