import React, { Component } from 'react';
import './Clock.css';

class Clock extends Component {

    handleStartClock = (e) => {
        //przesyła informacje wyżej czy plansza została zresetowana czy nie.
        if ( typeof this.props.onStart === 'function' ){
            this.props.onStart(e);
        }
    };

    componentWillUnmount = () => {
        clearInterval(this.idInterval)
    };

    createTimer = (time) => {
        //tworzy wyglada zerowy 00:00
        const wholeTime = time;
        const minutes = ~~(wholeTime / 60);
        const seconds = wholeTime - (minutes * 60);
        let timer;
        if(wholeTime >= 60 && wholeTime <= 600){
            if(seconds < 10) {
                timer = <span>{`0${minutes}:0${seconds}`}</span>
            }else{
                timer = <span>{`0${minutes}:${seconds}`}</span>
            }

        }else if(wholeTime < 60){
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

    createListOfBestTime = () => {
      const {currentLevel,wholeTime} = this.props;
      let list;
      if(wholeTime) {
          switch (currentLevel) {
              case 'Łatwy':
                  list = wholeTime[0].easy.map( e => {
                     return <li className='bestTime' key={e.id}>
                        {this.createTimer(e.time)}
                         <span className='userName'>{e.user}</span>
                  </li>
                  });
                  break;
              case 'Średni':
                  list = wholeTime[1].medium.map( e => {
                      return <li className='bestTime' key={e.id}>
                          {this.createTimer(e.time)}
                          <span className='userName'>{e.user}</span>
                      </li>
                  });
                  break;
              case 'Trudny':
                  list = wholeTime[2].hard.map( e => {
                      return <li className='bestTime' key={e.id}>
                          {this.createTimer(e.time)}
                          <span className='userName'>{e.user}</span>
                      </li>
                  });
                  break;
              default:
                  list = null;
                  break;
          }
      }else{
          list = null;
      }
      return list
    };

    createGuessedTime = () => {
      const {user, timer} = this.props;
      let currentTime;
      if(user.time === undefined){
          currentTime = timer;
      }else if(timer !== 0 && timer < user.time) {
          currentTime = timer
      }else{
          currentTime = user.time
      }
        return  this.createTimer(currentTime);
    };

    render() {
        return (
            <div className='clock'>
                <button className='startTimer' onClick={() => this.handleStartClock(this.props.isReseted)} >Start</button>
                <span className='currentUser'>Aktualnie gra: <span>{this.props.userName}</span></span>
                <span className='timer'>Aktualny czas: <span>{this.createTimer(this.props.seconds)}</span></span>
                <span className='timeGuessed'>Twój najlepszy czas to: <span>{this.createGuessedTime()}</span></span>
                <ul>
                    {this.createListOfBestTime()}
                </ul>
            </div>
        );
    }
}

export default Clock;
