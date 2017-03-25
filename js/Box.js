import React, {Component} from 'react';

export default class Box extends Component{
    
    render(){

        return <div className="box">
                <div onClick={this.props.clickProp.bind(this,this.props.index)} 
                className={this.props.active?'content active ':'content'}  >{this.props.val} </div>
            </div>
    }
}