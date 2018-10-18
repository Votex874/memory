import React, { Component } from 'react';
import './Clock.css';
import 'font-awesome/css/font-awesome.min.css';

class Clock extends Component {
    constructor(props){
        super(props)

        this.state ={
            addClosedClass: 'handleBestTime closed',
            classShowArrow: 'fa fa-caret-down',
        }
    }

    handleStartClock = (e) => {
        //przesyła informacje wyżej czy plansza została zresetowana czy nie.
        if ( typeof this.props.onStart === 'function' ){
            this.props.onStart(e);
        }
    };

    handleReset = () => {
        //przesyła informacje wyżej czy plansza została zresetowana czy nie.
        if ( typeof this.props.onReset === 'function' ){
            this.props.onReset("dupa");
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
                         <div className="containerTimeIndex">
                             <div className="numberOfBestTime">{`${e.id}.`}</div>
                             <span className='xuserName'>{e.user}</span>
                         </div>
                         <span className='userTime'>{this.createTimer(e.time)}</span>
                  </li>
                  });
                  break;
              case 'Średni':
                  list = wholeTime[1].medium.map( e => {
                      return <li className='bestTime' key={e.id}>
                          <div className="containerTimeIndex">
                              <div className="numberOfBestTime">{`${e.id}.`}</div>
                              <span className='userName'>{e.user}</span>
                          </div>
                          <span className='userTime'>{this.createTimer(e.time)}</span>
                      </li>
                  });
                  break;
              case 'Trudny':
                  list = wholeTime[2].hard.map( e => {
                      return <li className='bestTime' key={e.id}>
                          <div className="containerTimeIndex">
                              <div className="numberOfBestTime">{`${e.id}.`}</div>
                              <span className='userName'>{e.user}</span>
                          </div>
                          <span className='userTime'>{this.createTimer(e.time)}</span>
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

    handleShowBestTimes = () => {
        const {addClosedClass,classShowArrow } = this.state;
        this.setState({
            addClosedClass: addClosedClass === 'handleBestTime closed' ? 'handleBestTime' : 'handleBestTime closed',
            classShowArrow: classShowArrow === 'fa fa-caret-down' ?  'fa fa-caret-up' : 'fa fa-caret-down',
        })
    };

    render() {
        const {addClosedClass,classShowArrow } = this.state;
        const {seconds,userName,isReseted} = this.props;
        return (
            <div className='clock'>
                <div className="holdingBtns">
                    <div className='handleBtns'>
                        <button className='startTimer' onClick={() => this.handleStartClock(isReseted)} >Start</button>
                        <button className='reset' onClick={() => this.handleReset()}>Reset</button>
                    </div>
                </div>
                <div className="holdingAllTime">
                    <div className="holdingTimes">
                        <div className="handleTimes">
                            <span className='currentUser'>Gracz: </span>
                            <span className='showCurrentUser'>{userName}</span>
                        </div>
                        <div className="handleTimes">
                            <span className='timer'>Aktualny czas: </span>
                            <span className='showTimeCurrent'>{this.createTimer(seconds)}</span>
                        </div>
                        <div className="handleTimes">
                            <span className='timeGuessed'>Twój najlepszy czas: </span>
                            <span className='showTimeGuessed' >{this.createGuessedTime()}</span>
                        </div>
                    </div>
                    <div className="holdingBestTimes">
                        <div className="showBestTimes" onClick={this.handleShowBestTimes}>
                            <span className='showTimes'>Zobacz najlepsze czasy</span>
                            <i className={classShowArrow} />
                        </div>
                        <ul  className={addClosedClass}>
                            {this.createListOfBestTime()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Clock;
