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
        const sec = time;
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

    createListOfBestTime = () => {
      const {data,currentLevel} = this.props;
      let list;
      console.log(typeof data)
      if(data) {
          switch (currentLevel) {
              case 'Łatwy':
                  list = data.easy.map( e => {
                     return <li className='bestTime' key={e.id}>
                        {this.createTimer(e.time)}
                  </li>
                  });
                  break;
              case 'Średni':
                  list = data.medium.map( e => {
                      return <li className='bestTime' key={e.id}>
                          {this.createTimer(e.time)}
                      </li>
                  });
                  break;
              case 'Trudny':
                  list = data.hard.map( e => {
                      return <li className='bestTime' key={e.id}>
                          {this.createTimer(e.time)}
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

    render() {
        return (
            <div className='clock'>
                <button className='startTimer' onClick={() => this.handleStartClock(this.props.isReseted)} >Start</button>
                <span className='currentUser'>Aktualnie gra: <span>{this.props.userName}</span></span>
                <span className='timer'>Aktualny czas: <span>{this.createTimer(this.props.seconds)}</span></span>
                <span className='timeGuessed'>Odgadłeś karty w: <span>{this.createTimer(this.props.timer)}</span></span>
                <ul>
                    {this.createListOfBestTime()}
                </ul>
            </div>
        );
    }
}

export default Clock;
