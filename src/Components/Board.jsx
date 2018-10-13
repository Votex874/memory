import React, { Component } from 'react';
import Card from './Card'
import Clock from './Clock'
import './Board.css'
import  './reset.css'


class Board extends Component {
    constructor(props){
        super(props);

        const array = this.createMemoryArray(this.props.number,this.props.idArray); //tworzenie planszy na podstawie ilosci kart i indexow
        const indexArray = []; // pusta tablica ktora przechowywuje indexy
        const identifyArray = []; //pusta tablica przechowuje id
        const allGuessed = false; //wartosc czy plansza zostala odgadnieta
        const widthBoard = 6; // ilosc w jednym rzedzie kart
        const number = this.props.number; //numer ustawiony domyslnie na poziom easy
        const levels = [12,18,24]; //tablica przetrzymujaca ilosc kart
        const nameLevels = ['Łatwy', 'Średni', 'Trudny']; //tablica z nazwami poziomów
        const currentLevel = 'Łatwy'; //obecny poziom
        const seconds = 0;
        const timer = 0; //zmienna przetrzymujaca czas z jaka uzytkownik odgadl plansze
        const isReseted = false; //przechowuje infomacje czy uzytkownik zresetował mape

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
        //tworzy mape pojedynczych kart
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
        //funkcja jest wywolywana gdy uzytkownik klika daną karte po kliknieciu karta jednej karty sprawdzany jest index
        //z druga kliknieta karta o ile sa takie same karty pozostaja odkryte
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
    checkIfBeat = (currentTime) => {
        // sprawdza czy czas zostal pobity z porownaniu z zapisanym czasem w json serverze jezeli tak updatuje go
        const {user,wholeTime} = this.props;
        const {currentLevel} = this.state;
        let currentTarget;
        if(currentTime < user.time || user.time === 0){
            this.checkIfUserWas(currentTime,user.id);
        }
        switch (currentLevel) {
            case 'Łatwy':
                currentTarget = this.replaceBestTime(currentTime,wholeTime[0],'easy');
                fetch(`http://localhost:3001/bestTimes/1`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify( {easy: currentTarget} )
                });
                break;
            case 'Średni':
                currentTarget = this.replaceBestTime(currentTime,wholeTime[1],'medium');
                fetch(`http://localhost:3001/bestTimes/2`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify( {medium: currentTarget} )
                });

                break;
            case 'Trudny':
                currentTarget = this.replaceBestTime(currentTime,wholeTime[2], 'hard');
                fetch(`http://localhost:3001/bestTimes/3`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json; charset=UTF-8'},
                    body: JSON.stringify( {hard: currentTarget} )
                });
                break;
            default:
                currentTarget = null;
                break;
        }
    };
    checkIfUserWas = (currentTime, id) => {
        //zostanie zaktualizowy czas uzytkownika
        if(this.props.isUserInAPI){
            const name = this.props.userName;
            fetch(`http://localhost:3001/users/${id}`, {
                method: 'put',
                headers: {'Content-Type': 'application/json; charset=UTF-8'},
                body: JSON.stringify( {
                    name: name,
                    time: currentTime
                })
            })
        }
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
    replaceBestTime = (currentTime, currentData,currentLevel) =>{
        //na podstawie wybranego poziomiu tworzy tablice oraz jezeli czas w ktorym uzytkownik odgadl plansze jest mniejszy niz z API zostaje
        //przeslany do funkcji ktora go zaaktualizuje
        let arrayBestTimes = [];
        const {userName} = this.props;
        switch (currentLevel) {
            case 'easy':
                for (let i = 0; i < 3; i++){
                    arrayBestTimes.push({
                        time: currentData.easy[i].time,
                        user: currentData.easy[i].user
                    })
                }
                break;
            case 'medium':
                for (let i = 0; i < 3; i++) {
                    arrayBestTimes.push({
                        time: currentData.medium[i].time,
                        user: currentData.medium[i].user
                    })
                }
                break;
            case 'hard':
                for (let i = 0; i < 3; i++){
                    arrayBestTimes.push({
                        time: currentData.hard[i].time,
                        user: currentData.hard[i].user
                    })
                }
                break;
            default:
                arrayBestTimes = null;
        }
        if(currentTime < arrayBestTimes[0].time) {
            let holdNumberOne = {time: arrayBestTimes[0].time, user: arrayBestTimes[0].user};
            let holdNumberTwo = {time: arrayBestTimes[1].time, user: arrayBestTimes[1].user};
            arrayBestTimes[0] = {time: currentTime, user: userName};
            arrayBestTimes[1] = holdNumberOne;
            arrayBestTimes[2] = holdNumberTwo;
        }
        else if(currentTime < arrayBestTimes[1].time) {
            let holdNumberOne = {time: arrayBestTimes[1].time, user: arrayBestTimes[1].user};
            arrayBestTimes[1] = {time: currentTime, user: userName};
            arrayBestTimes[2] = holdNumberOne;
        }
        else if(currentTime < arrayBestTimes[2].time) {
            arrayBestTimes[2] = {time: currentTime, user: userName};
        }
        return arrayBestTimes.map((e,i) => {
            return {
                id: i +1,
                time: e.time,
                user: e.user
            }
        });
    };

    render() {
        const {seconds,number,currentLevel,allGuessed,isReseted,timer} = this.state;
        const {userName,user,wholeTime} = this.props;

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
                        timer={timer}
                        seconds={seconds}
                        level={number}
                        currentLevel={currentLevel}
                        guessed={allGuessed}
                        onStart={this.handleStartClock}
                        isReseted={isReseted}
                        userName={userName}
                        user={user}
                        wholeTime={wholeTime}
                    />
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default Board;
