import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {
    constructor(props){
        super(props);

        this.state ={
            seconds: 0,
            minutes: 0,
            hours: 0,
        }
    }


    handleStartClock = () => {
        this.idInterval = setInterval( () => {
            this.setState({
                seconds: this.state.seconds + 1,
            });
        },1000);
    };

    componentWillUnmount = () => {
        clearInterval(this.idInterval)
    };

    createTimer = () => {
        const {seconds, minutes} = this.state;
        let timer;
        if(this.props.guessed.length > 0){
            clearInterval(this.idInterval);
            if(minutes < 10){
                if(seconds < 10){
                    timer = <span>{`0${minutes}:0${seconds}`}</span>
                }else{
                    timer = <span>{`0${minutes}:${seconds}`}</span>
                }
            }else {
                if(seconds < 10){
                    timer = <span>{`${minutes}:0${seconds}`}</span>
                }else{
                    timer = <span>{`${minutes}:${seconds}`}</span>
                }
            }

        }
        else if(minutes < 10){
            if(seconds < 10){
                timer = <span>{`0${minutes}:0${seconds}`}</span>

            }else if (seconds === 60){
                this.setState({
                    seconds: 0,
                    minutes: this.state.minutes +1,
                })
            }
            else{
                timer = <span>{`0${minutes}:${seconds}`}</span>
            }
        }else if (minutes === 60){
            clearInterval(this.idInterval)
            timer = <span>{`${minutes}:0${seconds}`}</span>
        }else {
            if(seconds < 10){
                timer = <span>{`${minutes}:0${seconds}`}</span>

            }else if (seconds === 60){
                this.setState({
                    seconds: 0,
                    minutes: this.state.minutes +1,
                })
            }
            else{
                timer = <span>{`${minutes}:${seconds}`}</span>
            }
        }
        return timer;
    };
    render() {

        return (
            <div className='clock'>
                <button onClick={this.handleStartClock} >Włącz timer</button>
                <span className='timer'>{this.createTimer()}</span>
            </div>

        );
    }
}

export default Clock;
