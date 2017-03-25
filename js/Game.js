import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Box from './box.js';
import BoxProp from './box-prop.js';
import Complete from './complete.js';

export default class Game extends Component{

    constructor(props){
        super(props)
        this.setBoxes(); 
    }

    startGame(controlActive=true){
        this.setBoxes();
        this.states.gameMode = true;
        this.states.controlActive = controlActive;
        this.setState({});
    }

    setBoxes(){
        var boxValues = [1,2,3,4,5,6,7,8,9];
        var boxes = this.createBoxes(boxValues);
        this.states = {gameMode:false,boxes:boxes,boxValues:boxValues,controlActive:true}
    }

    solve(){
        this.startGame(false);
        
        this.solveAddTimeLine(1,1000)
        this.solveAddTimeLine(7,2000)
        this.solveAddTimeLine(4,3000)
        this.solveAddTimeLine(5,4000)
        this.solveAddTimeLine(6,5000)
        this.solveAddTimeLine(3,6000)
        this.solveAddTimeLine(2,7000)
        this.solveAddTimeLine(8,8000)
        this.solveAddTimeLine(0,9000)
    }

    solveAddTimeLine(index,timeout){
        setTimeout(function() {
            this.changeBoxState(index)
        }.bind(this), timeout);
    }

    createBoxes(boxValues){
        /*manual */
        return [
            new BoxProp(1,[1,3]), // param 3 => isCurrent
            new BoxProp(2,[7,6]),
            new BoxProp(3,[4,5]),
            new BoxProp(4,[5,4]),
            new BoxProp(5,[6,8]),
            new BoxProp(6,[3,7]),
            new BoxProp(7,[2,1]),
            new BoxProp(8,[8,0]),
            new BoxProp(9,[0,2])
        ]

        /*
        return boxValues.map((val,i) =>{
            return new BoxProp(val,false,[1,3,4])
        })
        */
    }

    /* Check Level Status */

    checkLevelStatus(){
        let actives = this.states.boxes.filter((elem,i)=>elem.active);

        //this.setState({ gameMode:true})
        if(actives.length == 9){
            this.gameComplete();
        }
    }

    gameComplete(){
        this.states.gameMode = false;
        this.setState({});
    }

    // Child Box callback function
    globalClickHandle(index){
        if(this.states.gameMode && this.states.controlActive){
            this.changeBoxState(index);
        }
    }
 

    // Box activate/deactivate from dependencies list 
    changeBoxState(boxIndex){
        this.resetCurrent();
       // console.log(boxIndex)
        let boxes = this.states.boxes;
        let box = this.changeActive(boxIndex);

        let deps = box.dependencies;

        deps.map((elem,i)=>{
            this.changeActive(elem)
        });
      
        console.log(this.states.boxes.map((elem)=>{
            return elem.current;
        }))

        this.setState({boxes:boxes});
        //check current game status
        this.checkLevelStatus();
    }

    resetCurrent(){
        var boxes = this.states.boxes.map((elem,i)=>{
           elem.current = false;
           return elem;
        });
         
        this.setState({boxes:boxes})
        
    }

    changeActive(index){
        let box = this.states.boxes[index];
        box.active = !box.active;
        return box;
    }


    render(){
      
        return (
            <div>
                <button onClick={this.solve.bind(this)}>Çöz</button>
            <div className="panel">
               {
                   this.states.boxes.map((v,i)=>{
                        return <Box clickProp={this.globalClickHandle.bind(this)} 
                                    val={v.val} key={i} index={i} current={v.isCurrent}
                                    active={v.active} />
                   })
               }  
               {
                   this.states.gameMode?null:<Complete onPlayClick={this.startGame.bind(this)} />

               }
            </div>
            </div>
           
        )
    }
}