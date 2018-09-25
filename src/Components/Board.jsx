import React, { Component } from 'react';
import Card from './Card'
import './Board.css'


class Board extends Component {
    constructor(props){
        super(props);

        const array = this.createMemoryArray();
        const indexArray = [];
        const identifyArray = [];

        this.state = {
            array,
            indexArray,
            identifyArray,
        };
    }

    createMemoryArray = () => {
        //tworzy nam tablice z propsu który bedziemy podawac jako wielkosc tablicy , na podstawie tej tablicy
        // bedzie sprawdzał program czy sa odkryte karty czy nie, przekazuje z propsa id danej karty
        const {number,idArray} = this.props;
        this.shuffle(idArray);

        let array = [];

        for (let i = 0; i < number; i++) {
            array.push({
                flipped: false,
                id: idArray[i],
                guessed: false,
            });
        }
        return array;
    };

    shuffle = (a) => {
        //funkcja miesza nam tablice
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
    };


    handleCheckFlip = (i,flipped,guessed) => {
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
      console.log('numberOfTrues' + numberOfTrues.length)

      if(numberOfTrues.length < 2){
          mainArray[i].flipped = true;
          idArray.push(mainArray[i].id);
          iArray = [...indexArray, i];
          console.log(iArray, 'iArray');
          console.log(idArray, 'idArray');
          //sprawdzamy czy id jednej karty jest równe drugiej karcie
          if(iArray.length === 2){
              if(idArray[0] === idArray[1]){
                  console.log("zgadzają się");
                  console.log(idArray, idArray);
                  for(let i = 0; i < iArray.length; i++){
                      mainArray[iArray[i]].guessed = true;
                      mainArray[iArray[i]].flipped = false;
                  }
                  idArray = [];
                  iArray = [];
              }else{
                  console.log("niezgadzaja się");
                  this.idTimeout = setTimeout(() =>{
                      for(let i = 0; i < iArray.length; i++){
                          mainArray[iArray[i]].flipped = false;
                          console.log(mainArray)
                      }
                      this.setState({
                          array: mainArray,
                          indexArray: [],
                          identifyArray: [],
                      })
                  },1000);
              }
          }
      }

      this.setState({
          array: mainArray,
          indexArray: iArray,
          identifyArray: idArray,
      })
    };



    creatingBoard = () => {
        //pobieram ilosc kart i dziele tak aby wyszly mi wiersze
        const rows = Math.ceil(this.props.number / 5);
        //pobieram cała tablice false
        const memoryCards = this.state.array;

        const boardArray = [];
        let arraySliced = [];

        for(let i = 0; i <= rows; i++){
            arraySliced[i] = memoryCards.slice((i*4), 4*(i+1));
        }

        //zrobienie planszy pierwsza petla tworzy wiersze a w danym wierszu mapujemy po tablicy z falsami
        for(let i = 0; i <= rows; i++){
            boardArray[i] = <div key={i} className='row'>
                {arraySliced[i].map((e,j) => {
                    return <Card
                        key={j}
                        className='containerFlip'
                        flipped={e.flipped}
                        id={e.id}
                        onCheck={this.handleCheckFlip}
                        index={(4*i)+j}
                        guessed={e.guessed}
                     />

                })}
            </div>
        }
        return boardArray;
    };

    render() {

        return (
            <div className='mainContainer'>
                <div className="board">
                    {this.creatingBoard()}
                </div>
            </div>
        );
    }
}

export default Board;
