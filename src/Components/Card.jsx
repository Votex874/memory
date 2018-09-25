import React, { Component } from 'react';
import './Card.css'


class Card extends Component {
    constructor(props){
        super(props);

        const flippedClass = this.addFlippedClass();

        this.state = {
            flippedClass,
        };
    }

    handleChecked = (index,flipped,guessed) =>{
        if (typeof this.props.onCheck === 'function'){
            this.props.onCheck(index, flipped,guessed)
        }
    };

    addFlippedClass = () =>{
        //funkcja która na podstawie propsu flipped dodanej nowa klase
        // lub ja usuwa dodanie klasy - daje nam efekt obrócenia karty
        const {index, flipped,guessed} = this.props;
        if(this.props.guessed){
            console.log("true");
            return (
                <div
                    className='cardContainer flipIt'
                >
                    <div className="card flipIt">
                        <div className="frontCard">
                            Przód
                        </div>
                        <div className="backCard">
                            {this.props.id}
                        </div>
                    </div>
                </div>
            );
        }else{
            if(this.props.flipped){
                return (
                    <div
                        className='cardContainer '
                        onClick={() => this.handleChecked(index, flipped, guessed)}
                    >
                        <div className="card flipIt">
                            <div className="frontCard">
                                Przód
                            </div>
                            <div className="backCard">
                                {this.props.id}
                            </div>
                        </div>
                    </div>
                );
            }
            return (
                <div
                    className='cardContainer'
                    onClick={() => this.handleChecked(index, flipped,guessed)}
                >
                    <div className="card">
                        <div className="frontCard">
                            Przód
                        </div>
                        <div className="backCard">
                            {this.props.id}
                        </div>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            this.addFlippedClass()
        )
    }
}

export default Card;
