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

        this.state ={
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
    };


    render() {

        const  {number, idArray,valueInputName,displayStyle,overflowStyle,userName} = this.state;
        return (
            <div className='gameContainer' style={{overflow: overflowStyle}}>
                <div className="disableAll" style={{display: displayStyle}}>

                </div>
                <div className="box" style={{display: displayStyle}}>
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
                />
            </div>
        );
    }
}

export default Game;
