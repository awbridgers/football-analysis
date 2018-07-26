import React, { Component } from 'react';
import './App.css';
import DriveStart from './driveStart.jsx'


class App extends Component {
  constructor(){
    super();
    this.state = {
      down: 1,
      distance: 10,
      wakeScore: 0,
      oppScore: 0,
      quarter: 1,
      opponent: "Opponent",
      ballOn: 50,
      enterDriveStart: false,
      startLine: "",
      startTerritory: 'none'
    }
  }
  startDrive = () => {
    this.setState({enterDriveStart: true})
  }
  enterYardLine = (e) => {
    const yardLine = parseInt(e.target.value,10);
    const startLine = (isNaN(yardLine)) ? "" : yardLine
    this.setState({startLine: startLine})
  }
  changeTerritory = (e) => {
    this.setState({startTerritory: e.target.value})
  }
  submitDriveStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(this.state.startTerritory === 'none'){
      alert('Please select which side of the field the ball is on.')
    }
    else if(this.state.startLine === ""){
      alert('Please enter the starting field position');
    }
    else if(this.state.startLine < 0 || this.state.startLine > 50){
      alert('Please enter a valid yard line');
    }
    else{
      this.setState({
        enterDriveStart: false,
        ballOn: parseInt(this.state.startLine,10),
        down: 1,
      });
    }
  }
  render() {
    const {enterDriveStart} = this.state;
    return (
      <div>
        {enterDriveStart && <DriveStart onChange = {this.enterYardLine} yardLine = {this.state.startLine}
        changeRadio = {this.changeTerritory} submit = {this.submitDriveStart} territory = {this.state.startTerritory}/>}
        <div className = 'liveInfo'>
          <div className = 'score'>
            <div className = 'wakeScore'><b>Wake Forest</b><p>{this.state.wakeScore}</p></div>
            <div className = 'oppScore'><b>{this.state.opponent}</b><p>{this.state.oppScore}</p></div>
          </div>
          <div className = 'driveInfo'>
            <div className = 'down'>
              {this.state.down === 1 && `${this.state.down}st and ${this.state.distance}`}
              {this.state.down %2 ===0 && `${this.state.down}nd and ${this.state.distance}`}
              {this.state.down === 3 && `${this.state.down}rd and ${this.state.distance}`}
            </div>
            <div>Ball on: {this.state.ballOn}</div>
          </div>
          <div className = 'startDrive'><button className = 'button' onClick = {this.startDrive}>New Drive</button></div>
        </div>
      </div>
    );
  }
}

export default App;
