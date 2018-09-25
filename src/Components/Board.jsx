import React, { Component } from 'react';
import Card from './Card'
import './Board.css'


class Board extends Component {
    constructor(props){
        super(props);

        const array = this.createMemoryArray();
        const indexArray = [];
        const identifyArray = [];
        const allGuessed = false;
        const widthBoard = 6;


        this.state = {
            array,
            indexArray,
            identifyArray,
            allGuessed,
            widthBoard,
            };
    }

    createMemoryArray = () => {
        //tworzy nam tablice z propsu który bedziemy podawac jako wielkosc tablicy , na podstawie tej tablicy
        // bedzie sprawdzał program czy sa odkryte karty czy nie, przekazuje z propsa id danej karty
        const {idArray,number} = this.props;

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

      if(numberOfTrues.length < 2){
          mainArray[i].flipped = true;
          idArray.push(mainArray[i].id);
          iArray = [...indexArray, i];
          //sprawdzamy czy id jednej karty jest równe drugiej karcie
          if(iArray.length === 2){
              if(idArray[0] === idArray[1]){
                  for(let i = 0; i < iArray.length; i++){
                      mainArray[iArray[i]].guessed = true;
                      mainArray[iArray[i]].flipped = false;
                      let numberOfGuessed = mainArray.filter(e =>{
                          return e.guessed === true
                      });
                      if(numberOfGuessed.length === this.props.number){
                              this.setState({
                                  allGuessed: 'wygrałes',
                              })
                      }
                  }
                  idArray = [];
                  iArray = [];
              }else{
                  this.idTimeout = setTimeout(() =>{
                      for(let i = 0; i < iArray.length; i++){
                          mainArray[iArray[i]].flipped = false;
                      }
                      this.setState({
                          array: mainArray,
                          indexArray: [],
                          identifyArray: [],
                      })
                  },750);
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
        const {widthBoard, array} = this.state;
        const {number} = this.props;
            //pobieram ilosc kart i dziele tak aby wyszly mi wiersze
            const rows = Math.ceil(number / 6);

            //pobieram cała tablice false
            const memoryCards = array;

            const boardArray = [];
            let arraySliced = [];

            for (let i = 0; i <= rows; i++) {
                arraySliced[i] = memoryCards.slice((i * widthBoard), widthBoard * (i + 1));
            }
            //zrobienie planszy pierwsza petla tworzy wiersze a w danym wierszu mapujemy po tablicy z falsami
            for (let i = 0; i <= rows; i++) {
                boardArray[i] = <div key={i} className='row'>
                    {arraySliced[i].map((e, j) => {
                        return (
                            <Card
                                key={j}
                                className='containerFlip'
                                flipped={e.flipped}
                                id={e.id}
                                onCheck={this.handleCheckFlip}
                                index={(widthBoard * i) + j}
                                guessed={e.guessed}
                            />
                        );

                    })}
                </div>
            }
            return boardArray;

    };

    handleReset = () => {
        //tworzymy nowa mape
        const newBoard = this.createMemoryArray();
        this.setState({
            allGuessed: false,
            array: newBoard,
        })
    };



    render() {
        console.log(this.props.number);
        return (
            <div className='mainContainer'>
                <div className="board">
                    <button onClick={this.handleReset}>Reset</button>
                    <p>{this.state.allGuessed}</p>
                    {this.creatingBoard()}
                </div>
            </div>
        );
    }
}

export default Board;
