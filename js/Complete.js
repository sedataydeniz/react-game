import React,{Component} from 'react';

export default class Complete extends Component{
    render(){
        return <div className="game-complete">
            <div>
            <h3>Tebrikler!</h3>
            <p>Kazandınız.</p>
            <button onClick={this.props.onPlayClick}>Yeniden Oyna</button>
            </div>
            </div>
    }
}