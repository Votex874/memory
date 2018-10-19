import React, { Component } from 'react';
import Board from './Board'
import './GameStyle.css'


class Game extends Component {
    constructor(props){
        super(props);

        const idArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11]; //tablica indexów kart tak aby dwie z nich miał taki sam index
        const number = 12; // numer kart napoczatku mapy
        const valueInputName = '';  //wartosc nazwy uzytkownika
        const displayStyle = 'block'; //styl boxu ktory wyswietla sie na srodku ekranu
        const overflowStyle = 'hidden'; //zablokowanie scrolla podczas podawania nazwy uzytkownika
        const userName = ''; // jezeli podana przez uzytkownika nazwa znajduje się w API bedzie przypisana wlasnie do tej zmiennej
        const easyTime = false; //3 najlepsze czasy na poziomie easy
        const mediumTime = false; //3 najlepsze czasy na poziomie medium
        const hardTime = false; //3 najlepsze czasy na poziomie hard
        const isUserInAPI = false; //wiadomosc czy uzytkownik znajduje sie w api
        const user = ""; //zmienna ktora przechowuje id oraz czas uzytkownika
        const wholeTime = false;

        this.state ={
            wholeTime,
            user,
            isUserInAPI,
            easyTime,
            mediumTime,
            hardTime,
            idArray,
            number,
            valueInputName,
            displayStyle,
            overflowStyle,
            userName,
        }
    }

    handleChangeInputName = (event) => {
      this.setState({
          valueInputName: event.target.value,
      })
    };
    handleSubmit = (event) =>{
        //po podaniu swojej nazwy uzytkownika zmieniaja sie style popupa oraz pobierany jest czas uzytkownika oraz jego id
        // o ile byl juz wczesniej w bazie
        event.preventDefault();
        if(this.state.valueInputName.length > 0 && this.state.valueInputName.length < 21){
            this.setState({
                userName: this.state.valueInputName,
                valueInputName: '',
                displayStyle: 'none',
                overflowStyle: 'auto',
            })
        }else{
            return null;
        }
        fetch('http://localhost:3001/users')
            .then( resp => resp.json())
            .then( users => {
                users.forEach((e) => {
                    if(e.name.indexOf(this.state.userName) > -1) {
                        this.setState({
                            isUserInAPI: true,
                            user: e,
                        })}
                });
            })
    };
    componentDidMount = () => {
        this.getData();
    };

    getData = () => {
        //pobieranie wszystkich czasow dla kazdego z poziomów
        fetch('http://localhost:3001/bestTimes')
            .then( resp => resp.json())
            .then( bestTimes => this.setState({
                easyTime: bestTimes[0],
                mediumTime: bestTimes[1],
                hardTime: bestTimes[2],
                wholeTime: bestTimes,
                isLoading: true,
            }));
    };

    render() {
        const {
          number, idArray,valueInputName,displayStyle,overflowStyle,userName,isUserInAPI,user,wholeTime
        } = this.state;
        return (
            <div className='gameContainer' style={{overflow: overflowStyle}}>
                <div className="disableAll" style={{display: displayStyle}}>
                </div>
                <div className="box" style={{
                    display: displayStyle,
                }}>
                    <span className='popUpText'>Witaj w memory-game, wybierz swój poziom i staraj się o uzyskanie najlepszego wyniku.</span>
                    <span className='popUpName'>Podaj swój nick
                        <span className='popUpTip'>Nick powinien mieć nie więcej niż 20 znaków</span>
                    </span>
                    <form className='formUserName' onSubmit={this.handleSubmit}>
                        <label>
                            <input className='inputName' type="text" name="name" value={valueInputName} onChange={this.handleChangeInputName} />
                        </label>
                        <input className='sendUserName' type="submit" value="Dodaj" />
                    </form>
                </div>
                <Board
                    number={number}
                    idArray={idArray}
                    userName={userName}
                    isUserInAPI={isUserInAPI}
                    user={user}
                    wholeTime={wholeTime}
                />
            </div>
        );
    }
}
export default Game;
