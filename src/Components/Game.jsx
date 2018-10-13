import React, { Component } from 'react';
import Board from './Board'
import './GameStyle.css'


class Game extends Component {
    constructor(props){
        super(props);


        const idArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11];
        const number = 12;
        const valueInputName = '';
        const displayStyle = 'block';
        const overflowStyle = 'hidden';
        const userName = '';
        const easyTime = false;
        const mediumTime = false;
        const hardTime = false;
        const innerHeight = (window.innerHeight) + 150;
        const users = null;
        const userTime = null;
        const isUserInAPI = false;

        this.state ={
            userTime,
            users,
            easyTime,
            mediumTime,
            hardTime,
            innerHeight,
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
        event.preventDefault();
        if(this.state.valueInputName.length > 0){
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
            .then( usersName => {
                this.setState({
                    users: usersName
                });
                usersName.forEach((e) => {
                    if(e.name.indexOf(this.state.userName) > -1) {
                        this.setState({
                            userTime: e.time,
                            isUserInAPI: true,
                        })
                        }
                })
            })
    };
    componentDidMount = () => {
        this.getData();
    };

    getData = () => {
        fetch('http://localhost:3001/bestTimes/1')
            .then( resp => resp.json())
            .then( bestTimes => this.setState({
                easyTime: bestTimes,
            }));
        fetch('http://localhost:3001/bestTimes/2')
            .then( resp => resp.json())
            .then( bestTimes => this.setState({
                mediumTime: bestTimes,
            }));
        fetch('http://localhost:3001/bestTimes/3')
            .then( resp => resp.json())
            .then( bestTimes => this.setState({
                hardTime: bestTimes,
                isLoading: true,
            }));
    };



    render() {
        const  {number, idArray,valueInputName,displayStyle,overflowStyle,userName,easyTime,hardTime,mediumTime,innerHeight,userTime,isUserInAPI} = this.state;
        return (
            <div className='gameContainer' style={{overflow: overflowStyle}}>
                <div className="disableAll" style={{display: displayStyle}}>

                </div>
                <div className="box" style={{
                    display: displayStyle,
                    left: `${innerHeight}px`,
                }}>
                    <span className='popUpText'>Podaj swoje imię / nick</span>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            <input className='inputName' type="text" name="name" value={valueInputName} onChange={this.handleChangeInputName} />
                        </label>
                        <input type="submit" value="Wyślij" />
                    </form>
                </div>
                <Board
                    number={number}
                    idArray={idArray}
                    userName={userName}
                    userTime={userTime}
                    easyTime={easyTime}
                    mediumTime={mediumTime}
                    hardTime={hardTime}
                    isUserInAPI={isUserInAPI}
                />
            </div>
        );
    }
}

export default Game;
