import React, { Component } from 'react';
import './Board.css'


class Board extends Component {
    constructor(props){
        super(props);

        const number = 16;

        this.state = {
            number,
        }

    }
    
    

    render() {
        return (
            <div className='mainContainer'>
                <div className="board">
                    
                </div>
            </div>
        );
    }
}

export default Board;
