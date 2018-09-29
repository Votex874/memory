import React, { Component } from 'react';
import Card from './Card'
import './Board.css'


class Board extends Component {
    constructor(props){
        super(props);

        const array = this.createMemoryArray(this.props.number,this.props.idArray);
        const indexArray = [];
        const identifyArray = [];
        const allGuessed = false;
        const widthBoard = 6;
        const number = this.props.number;
        const levels = [12,18,24];


        this.state = {
            array,
            indexArray,
            identifyArray,
            allGuessed,
            widthBoard,
            number,
            levels,
            };
    }

    createMemoryArray = (number,idArray) => {
        //tworzy nam tablice z propsu który bedziemy podawac jako wielkosc tablicy , na podstawie tej tablicy
        // bedzie sprawdzał program czy sa odkryte karty czy nie, przekazuje z propsa id danej karty
        const identifyArray = idArray.slice(0, number);
        this.shuffle(identifyArray);

        let array = [];

        for (let i = 0; i < number; i++) {
            array.push({
                flipped: false,
                id: identifyArray[i],
                guessed: false,
            });
        }
        return array;
    };
    creatingBoard = () => {

        const {widthBoard, array} = this.state;
        const {number} = this.state;
        //pobieram ilosc kart i dziele tak aby wyszly mi wiersze
        const rows = Math.ceil(number / 6);

        //pobieram cała tablice false
        const memoryCards = array;

        const boardArray = [];
        let arraySliced = [];

        for (let i = 0; i <= rows; i++) {
            arraySliced[i] = memoryCards.slice((i * widthBoard), widthBoard * (i + 1));
        }
        //zrobienie planszy pierwsza petla tworzy wiersze a w danym wierszu mapujemy po tablicy z falsami
        for (let i = 0; i < rows; i++) {
            boardArray[i] = <div key={i} className='row'>
                {arraySliced[i].map((e, j) => {
                    return (
                        <Card
                            key={j}
                            className='containerFlip'
                            flipped={e.flipped}
                            id={e.id}
                            onCheck={this.handleCheckFlip}
                            index={(widthBoard * i) + j}
                            guessed={e.guessed}
                        />
                    );

                })}
            </div>
        }
        return boardArray;

    };
    shuffle = (a) => {
        //funkcja miesza nam tablice
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };

    handleCheckFlip = (i,flipped,guessed) => {
        //funkcja zmienia falsz na prawde w tablicy mainArray
        const {array, indexArray,identifyArray} = this.state;

        const mainArray = [...array];
        //tablica która przechowuje indexy zmienionych kart
        let iArray = [...indexArray];
        let idArray = [...identifyArray];


        //sprawdzam ile w całej tablicy jest true jeżeli mniej niż dwa niech zmienia je dalej
        //jeżeli mniej niech przestanie
        let numberOfTrues = mainArray.filter(e =>{
            return e.flipped === true
        });

        if(numberOfTrues.length < 2){
            mainArray[i].flipped = true;
            idArray.push(mainArray[i].id);
            iArray = [...indexArray, i];
            //sprawdzamy czy id jednej karty jest równe drugiej karcie
            if(iArray.length === 2){
                if(idArray[0] === idArray[1]){
                    for(let i = 0; i < iArray.length; i++){
                        mainArray[iArray[i]].guessed = true;
                        mainArray[iArray[i]].flipped = false;
                        let numberOfGuessed = mainArray.filter(e =>{
                            return e.guessed === true
                        });
                        if(numberOfGuessed.length === this.state.number){
                            this.setState({
                                allGuessed: 'wygrałes',
                            })
                        }
                    }
                    idArray = [];
                    iArray = [];
                }else{
                    this.idTimeout = setTimeout(() =>{
                        for(let i = 0; i < iArray.length; i++){
                            mainArray[iArray[i]].flipped = false;
                        }
                        this.setState({
                            array: mainArray,
                            indexArray: [],
                            identifyArray: [],
                        })
                    },750);
                }
            }
        }
        this.setState({
            array: mainArray,
            indexArray: iArray,
            identifyArray: idArray,
        })
    };
    handleReset = () => {
        //tworzymy nowa mape
        const newBoard = this.createMemoryArray(this.state.number,this.props.idArray);
        this.setState({
            allGuessed: false,
            array: newBoard,
        })
    };
    handleEasyLevel = () => {
        const newBoard = this.createMemoryArray(12,  this.props.idArray);
        this.setState({
            allGuessed: false,
            array: newBoard,
            number: 12,
        })
    };
    handleMediumLevel = () => {
        const newBoard = this.createMemoryArray(18,  this.props.idArray);
        this.setState({
            allGuessed: false,
            array: newBoard,
            number: 18,
        })
    };
    handleHardLevel = () => {
        const newBoard = this.createMemoryArray(24,  this.props.idArray);
        this.setState({
            allGuessed: false,
            array: newBoard,
            number: 24,
        })
    };



    render() {
        const {number} = this.props;
        return (
            <div className='mainContainer'>
                <div className="board">
                    <ul className='levelSelection'>
                        <li className='level' onClick={this.handleEasyLevel}>Łatwy</li>
                        <li className='level' onClick={this.handleMediumLevel}>Średni</li>
                        <li className='level' onClick={this.handleHardLevel}>Trudny</li>
                    </ul>
                    <button onClick={this.handleReset}>Reset</button>
                    <p>{this.state.allGuessed}</p>
                    {this.creatingBoard(number)}
                </div>
            </div>
        );
    }
}

export default Board;
