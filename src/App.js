import React, { Component } from 'react';
import './App.css';
import DriveStart from './driveStart.jsx'
import AddPlay from './addPlay.jsx'
import PlayInfo from './playInfo.jsx'
import PlayResult from './playResult.jsx'



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
      ballOn: 0,
      enterDriveStart: false,
      startLine: "",
      startTerritory: 'none',
      fieldPosition: [],
      driveStart: 0,
      playType: 'null',
      qb: 'QB',
      hb: 'HB',
      wr: ['WR1', 'WR2', 'WR3'],
      ballCarrier: '',
      touchdown: false,
      fumble: false,
      completePass: false

    }
  }
  averageFieldPos = () => {
    const posArray = this.state.fieldPosition;
    let yardsToGo = 0;
    posArray.forEach((drive)=>{
      yardsToGo += drive;
    });
    const avg = yardsToGo / posArray.length;
    if(avg === 50){
      return '50'
    }
    return (avg > 50) ? `own ${100-avg}` : `opponent's ${avg}`;
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
      const start = parseInt(this.state.startLine,10);
      const yardsToGo = (this.state.startTerritory === 'own') ? 100-start : start;
      this.setState({
        enterDriveStart: false,
        ballOn: start,
        driveStart: start,
        down: 1,
        fieldPosition: [...this.state.fieldPosition,yardsToGo]
      });
    }
  }
  playType = (e) => {
    this.setState({playType: e.target.id})
  }
  choosePlayer = (e) => {
    this.setState({ballCarrier: e.target.id})
  }
  stylePlayType = (type) => {
    if(this.state.playType === 'null'){
      return {}
    }
    return (this.state.playType === type) ? {background: "#CFB53B"} : {background: '#504A4B'}
  }
  stylePlayer = (player) => {
    if(this.state.ballCarrier === ""){
      return;
    }
    return (this.state.ballCarrier === player) ? {background: "#CFB53B"} : {background: '#504A4B'}
  }
  checkTD = () => {
    this.setState({touchdown: !this.state.touchdown});
  }
  checkFumble = () => {
    this.setState({fumble: !this.state.fumble});
  }
  checkCompletion = (e) =>{
    const completion = (e.target.id === 'complete') ? true : false;
    this.setState({completePass : completion})
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
            <div>Drive Started: {this.state.driveStart}</div>
          </div>
          <div className = 'startDrive'><button className = 'button' onClick = {this.startDrive}>New Drive</button></div>
        </div>
        <div className = 'addPlays'>
          <div className = 'runOrPass'><AddPlay style = {this.stylePlayType} onClick = {this.playType}/></div>
          <div className = 'playInfo'><PlayInfo qb = {this.state.qb} hb = {this.state.hb} wr = {this.state.wr}
            playType = {this.state.playType} stylePlayer = {this.stylePlayer} onClick = {this.choosePlayer} />
          </div>
          <div className = 'results'><PlayResult playType = {this.state.playType} TD = {this.state.touchdown}
            checkTD = {this.checkTD} fumble = {this.state.fumble} checkFumble = {this.checkFumble}
            complete = {this.state.completePass} changeRadio = {this.checkCompletion}/></div>
        </div>
      </div>
    );
  }
}

export default App;
