import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
    constructor(props){
        super(props);

        this.state ={
            sec: 0,
            min: 0,
            time: 0,
        }
    }


    handleStartClock = (e) => {
        //przesyła informacje wyżej czy plansza została zresetowana czy nie.
        if ( typeof this.props.onStart === 'function' ){
            this.props.onStart(e);
        }
    };

    componentWillUnmount = () => {
        clearInterval(this.idInterval)
    };


    createTimer = () => {
        const sec = this.props.seconds;
        const minutes = ~~(sec / 60);
        const seconds = sec - (minutes * 60);
        let timer;
        if(sec >= 60 && sec <= 600){
            if(seconds < 10) {
                timer = <span>{`0${minutes}:0${seconds}`}</span>
            }else{
                timer = <span>{`0${minutes}:${seconds}`}</span>
            }

        }else if(sec < 60){
            if(seconds < 10){
                timer = <span>{`0${minutes}:0${seconds}`}</span>
            }else{
                timer = <span>{`0${minutes}:${seconds}`}</span>
            }
        }else{
            if(seconds < 10){
                timer = <span>{`${minutes}:0${seconds}`}</span>
            }else{
                timer = <span>{`${minutes}:${seconds}`}</span>
            }
        }
        return timer;
    };

    displayTimer = () => {
        const {seconds, minutes} = this.state;
        let timer;
    };





    render() {

        return (
            <div className='clock'>
                {/*<span className='timeGuessed'>Odgadłeś karty w: {this.guessedTime()}</span>*/}
                <span className='timer'>{this.createTimer()}</span>
                <button disabled={this.props.disabled} onClick={() => this.handleStartClock(this.props.isReseted)} >Włącz timer</button>
            </div>
        );
    }
}

export default Clock;
