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
      const {easyTime,mediumTime,hardTime,currentLevel} = this.props;
      let list;
      if(easyTime && mediumTime && hardTime) {
          switch (currentLevel) {
              case 'Łatwy':
                  list = easyTime.easy.map( e => {
                     return <li className='bestTime' key={e.id}>
                        {this.createTimer(e.time)}
                         <span className='userName'>{e.user}</span>
                  </li>
                  });
                  break;
              case 'Średni':
                  list = mediumTime.medium.map( e => {
                      return <li className='bestTime' key={e.id}>
                          {this.createTimer(e.time)}
                          <span className='userName'>{e.user}</span>
                      </li>
                  });
                  break;
              case 'Trudny':
                  list = hardTime.hard.map( e => {
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
      const {userTime, timer} = this.props;
      let currentTime;
      if(userTime === null){
          currentTime = timer;
      }else if(timer !== 0 && timer < userTime) {
          currentTime = timer
      }else{
          currentTime = userTime
      }
        return  this.createTimer(currentTime);
    };

    render() {
        return (
            <div className='clock'>
                <button className='startTimer' onClick={() => this.handleStartClock(this.props.isReseted)} >Start</button>
                <span className='currentUser'>Aktualnie gra: <span>{this.props.userName}</span></span>
                <span className='timer'>Aktualny czas: <span>{this.createTimer(this.props.seconds)}</span></span>
                <span className='timeGuessed'>Odgadłeś karty w: <span>{this.createGuessedTime()}</span></span>
                <ul>
                    {this.createListOfBestTime()}
                </ul>
            </div>
        );
    }
}

export default Clock;
