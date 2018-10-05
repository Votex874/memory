import React, { Component } from 'react';
import Card from './Card'
import Clock from './Clock'
import './Board.css'
import  './reset.css'


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
        const nameLevels = ['Łatwy', 'Średni', 'Trudny'];
        const currentLevel = 'Łatwy';
        const seconds = 0;
        const isReseted = false;
        const disabled = false;


        this.state = {
            disabled,
            array,
            indexArray,
            identifyArray,
            allGuessed,
            widthBoard,
            number,
            levels,
            nameLevels,
            currentLevel,
            seconds,
            isReseted,
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
        const pos = this.state.array.map(e => {
            return e.guessed }).indexOf(true);
        console.log(pos);

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
                            clearInterval(this.idInterval);
                            this.setState({
                                allGuessed: true,
                                seconds: 0,
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
                            disabled: pos > 3 ? true : false,
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
        //tworzymy nowa mape + resetuje czas
        clearInterval(this.idInterval)
        this.makeReset()
    };
    handleChangeLevel = (level,nameLevel) => {
        //jest wywolywana po nacisnieciu na dany level zwraca nowa plansze oraz resetuje czas
      const newBoard = this.createMemoryArray(level, this.props.idArray);
      clearInterval(this.idInterval);
      this.setState({
          allGuessed: false,
          isReseted: false,
          array: newBoard,
          number: level,
          currentLevel: nameLevel,
          seconds: 0,
      })
    };
    handleStartClock = (isReseted) => {
        //isReseted mowi nam czy zegar zostal zresetowany jak nie niech uruchomi inteval jezli tak niech go zatrzyma
        //i zresetuje czas

        if(this.state.allGuessed === true){
            clearInterval(this.idInterval);
            this.setState({
                seconds: 0,
                isReseted: true,
            })
        }else if(isReseted === false) {
            this.idInterval = setInterval(() => {
                this.setState({
                    seconds: this.state.seconds + 1,
                    isReseted: true,
                });
            }, 1000);
            this.makeReset();
        }
        else{
            clearInterval(this.idInterval);
                this.setState({
                    seconds: 0,
                    isReseted: false,
                })
        }
    };
    createLevelList = () => {
        //tworzy liste poziomow z funkcja ktora zmienia ilosc kart na planszy
        const {levels, nameLevels} = this.state;
        const levelArray = [...levels];
        const nameArray = [...nameLevels];
        // for (let i = 0; i < levelArray.length; i++){
        //     localStorage.setItem(levelArray[i],'0');
        // }

        return levelArray.map((e,i) => {
            return <li
                className='level'
                key={e}
                onClick={() => this.handleChangeLevel(e,nameArray[i])}
            >
                {nameArray[i]}
            </li>
        });
    };
    makeReset = () => {
        //tworzymy nowa mape + resetuje czas

        const newBoard = this.createMemoryArray(this.state.number,this.props.idArray);
        this.setState({
            allGuessed: false,
            isReseted: false,
            array: newBoard,
            seconds: 0,
        })
    };

    render() {
        const {seconds,number,currentLevel,allGuessed,isReseted,disabled} = this.state;

        return (
            <div className='mainContainer'>
                <div className="container">
                    <div className="board">
                        <ul className='levelSelection'>
                            {this.createLevelList()}
                        </ul>
                        <div className="containerBoard">
                            <div className="result">
                                <button  className='reset' onClick={this.handleReset}>Zresetuj aktualny poziom</button>
                                <p className='guessed'>{this.state.allGuessed}</p>
                            </div>
                            {this.creatingBoard()}
                        </div>
                    </div>
                    <Clock
                        disabled={disabled}
                        seconds={seconds}
                        level={number}
                        currentLevel={currentLevel}
                        guessed={allGuessed}
                        onStart={this.handleStartClock}
                        isReseted={isReseted}
                    />
                </div>
            </div>
        );
    }
}

export default Board;
