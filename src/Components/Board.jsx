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
        const timer = 0;
        const isReseted = false;


        this.state = {
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
            timer,
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
                            clearInterval(this.idInterval);
                            this.setState({
                                timer: this.state.seconds,
                                allGuessed: true,
                                seconds: 0,
                            });
                            this.checkIfBeat(this.state.seconds);
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
        });
        this.checkIfBeat(this.state.seconds);
    };
    handleReset = () => {
        //tworzymy nowa mape + resetuje czas
        clearInterval(this.idInterval);
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

    checkIfBeat = (currentTime) => {
        const {easyTime,mediumTime,hardTime} = this.props;
        const {currentLevel} = this.state;
        let actuallTime;
        let actuallLevel;
        let id;


        switch (currentLevel) {
            case 'Łatwy':
                actuallTime = this.replaceBestTime(currentTime,easyTime);
                actuallLevel = 'easy';
                id = 1;
                fetch(`http://localhost:3001/bestTimes/${id}`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify( {easy: actuallTime} )
                })
                    .then( resp => {
                        console.log(resp)
                    })
                break;
            case 'Średni':
                actuallTime = this.replaceBestTime(currentTime,mediumTime);
                actuallLevel = 'medium';
                id = 2;
                fetch(`http://localhost:3001/bestTimes/${id}`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify( {medium: actuallTime} )
                })
                    .then( resp => {
                        console.log(resp)
                    })
                break;
            case 'Trudny':
                actuallTime = this.replaceBestTime(currentTime,hardTime);
                actuallLevel = 'hard';
                id = 3;
                fetch(`http://localhost:3001/bestTimes/${id}`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify( {hard: actuallTime} )
                })
                    .then( resp => {
                        console.log(resp)
                    })
                break;
            default:
                actuallTime = null;
                actuallLevel = null;
                break;
            }

            console.log(JSON.stringify(actuallTime));
            console.log(actuallTime)
        console.log(this.props.easyTime);
        console.log(`http://localhost:3001/${actuallLevel}`);





        };
    replaceBestTime = (currentTime, currentData) =>{
        let bestTime = [];
        let arrayBestTimes = [];
        console.log(currentTime)
        console.log(currentData)
        for (let i = 0; i < 3; i++){
            arrayBestTimes.push(currentData.easy[i].time)
        }
        if(currentTime < arrayBestTimes[0]) {
            let holdNumberOne = arrayBestTimes[0];
            let holdNumberTwo = arrayBestTimes[1];
            arrayBestTimes[0] = currentTime;
            arrayBestTimes[1] = holdNumberOne;
            arrayBestTimes[2] = holdNumberTwo;
        }
        else if(currentTime < arrayBestTimes[1]) {
            let holdNumberOne = arrayBestTimes[1];
            arrayBestTimes[1] = currentTime;
            arrayBestTimes[2] = holdNumberOne;
        }
        else if(currentTime < arrayBestTimes[2]) {
            arrayBestTimes[2] = currentTime;
        }

        bestTime = arrayBestTimes.map((e,i) => {
            return {
                id: i +1,
                time: `${e}`,
            }
        });
        return bestTime
    };



    render() {
        const {seconds,number,currentLevel,allGuessed,isReseted,timer} = this.state;
        const {userName,hardTime,mediumTime,easyTime} = this.props;

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
                        easyTime={easyTime}
                        mediumTime={mediumTime}
                        hardTime={hardTime}
                        timer={timer}
                        seconds={seconds}
                        level={number}
                        currentLevel={currentLevel}
                        guessed={allGuessed}
                        onStart={this.handleStartClock}
                        isReseted={isReseted}
                        userName={userName}
                    />
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default Board;
