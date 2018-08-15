import React, { Component } from 'react';
import './App.css';
import DriveStart from './driveStart.jsx'
import AddPlay from './addPlay.jsx'
import PlayInfo from './playInfo.jsx'
import PlayResult from './playResult.jsx'

class player {
  constructor(name,position){
    this.name = name
    if(position === 'qb'){
      this.passAttempts0 = 0;
      this.passAttempts5 = 0;
      this.passAttempts15 = 0;
      this.completions0 = 0;
      this.completions5 = 0;
      this.completions15 = 0;
      this.interceptions = 0;
      this.passingTDs = 0;
      this.sacked = 0;
      this.rushAttempts = 0;
      this.rushYards = 0;
      this.fumbles = 0;
      this.rushingTDs = 0;
    }
    else{
      this.rushAttempts = 0;
      this.rushYards = 0;
      this.fumbles = 0;
      this.rushingTDs = 0;
      this.targeted = 0;
      this.receptions = 0;
      this.drops = 0;
      this.receivingYards = 0;
      this.yardsAfterCatch = 0;
      this.receivingTDs = 0;
    }
  }
  passesAttempted(){
    return this.passAttempts0 + this.passAttempts5 + this.passAttempts15;
  }
  totalCompletions(){
    return this.completions0 + this.completions5 + this.completions15;
  }
  addRushingYards(yards){
    this.rushYards += yards;
  }
}

class App extends Component {
  constructor(){
    super();
    //start playerRoster here
    //qbs
    this.kHinton = new player('Kendall Hinton', 'qb');
    this.jNewman = new player ('Jaimie Newman', 'qb');
    this.sHartman = new player('Sam Hartman', 'qb');
    //hbs
    this.cCarney = new player('Cade Carney', 'hb');
    this.mColburn =new player('Matt Colburn', 'hb');
    this.cBeal = new player('Christian Beal', 'hb');
    this.tNdlovu = new player('Trey Ndlovu', 'hb');
    this.dDelaney = new player('DeAndre\' Delaney', 'hb');
    //te
    this.jFreudenthal = new player ('Jack Freudenthal', 'te');
    this.jLubrano = new player ('Jaren Lubrano', 'te');
    this.bChapman = new player ('Brandon Chapman', 'te');
    //wr
    this.aBachman = new player('Alex Bachman', 'wr');
    this.gDortch = new player('Greg Dortch', 'wr');
    this.sWashington = new player('Scotty Washington', 'wr');
    this.sSurratt = new player('Sage Surratt', 'wr');
    this.jSriraman = new player('James Sriraman', 'wr');
    this.sClaude = new player('Steven Claude', 'wr')


    this.state = {
      qbArray: [this.kHinton, this.jNewman, this.sHart],
      hbArray: [this.cCarney, this.mColburn, this.cBeal, this.tNdlovu, this.dDelaney],
      wrArray: [this.aBachman, this.gDortch,this.sWashington, this.sSurratt, this.jSriraman,
        this.sClaude, this.jFreudenthal, this.jLubrano, this.bChapman, ],
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
      showResults: false,
      qb: this.kHinton,
      hb: this.mColburn,
      ballCarrier: '',
      touchdown: false,
      fumble: false,
      interception: false,
      completePass: false,
      drop: false,
      yardsGained: "",
      yardsAfterCatch: ""
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
  cancelDrive = () => {
    this.setState({enterDriveStart: false})
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
    if(e.target.id === this.state.playType){
      this.setState({playType: 'null', showResults: false, ballCarrier: ''})
    }
    else{
      this.setState({playType: e.target.id, showResults: false, ballCarrier: ''})
    }
  }
  choosePlayer = (e) => {
    this.setState({ballCarrier: e.target.id, showResults: true})
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
  checkCompletion = (e) => {
    const completion = (e.target.id === 'complete') ? true : false;
    this.setState({completePass : completion})
  }
  checkInt = (e) => {
    this.setState({interception: !this.state.interception});
  }
  checkDrop = (e) => {
    this.setState({drop: !this.state.drop})
  }
  onYardsGainedChange = (e) => {
    if(!isNaN(e.target.value) || e.target.value === '-'){
      this.setState({yardsGained: e.target.value});
    }
  }
  onYACChange = (e) => {
    if(!isNaN(e.target.value) || e.target.value === '-'){
      this.setState({yardsAfterCatch: e.target.value});
    }
  }
  addPlay = () => {
    let currentPlay = {
      down: this.state.down,
      distance: this.state.distance,
      wakeScore: this.state.wakeScore,
      oppScore: this.state.oppScore,
      ballOn: this.state.ballOn,
      playType: this.state.playType,
      ballCarrier: this.state.ballCarrier,
      yardsGained: this.state.yardsGained,
      yac: this.state.yardsAfterCatch,
      fumble: this.state.fumble,
      touchdown: this.state.touchdown,
      interception: this.state.interception,
      completePass: this.state.completePass
    }



  }
  render() {
    const {enterDriveStart} = this.state;
    return (
      <div>
        {enterDriveStart && <DriveStart onChange = {this.enterYardLine} yardLine = {this.state.startLine}
        changeRadio = {this.changeTerritory} submit = {this.submitDriveStart} territory = {this.state.startTerritory}
        cancel = {this.cancelDrive}/>}
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
        <div className = "playbyplay">Hello</div>
        <div className = 'addPlays'>
          <div className = 'runOrPass'><AddPlay style = {this.stylePlayType} onClick = {this.playType}/></div>
          <div className = 'playInfo'><PlayInfo qb = {this.state.qb} hb = {this.state.hbArray[0]} wr = {this.state.wrArray}
            playType = {this.state.playType} stylePlayer = {this.stylePlayer} onClick = {this.choosePlayer} />
          </div>
          <div className = 'results'><PlayResult playType = {this.state.playType} TD = {this.state.touchdown}
            checkTD = {this.checkTD} fumble = {this.state.fumble} checkFumble = {this.checkFumble}
            complete = {this.state.completePass} changeRadio = {this.checkCompletion} showResults = {this.state.showResults}
            int = {this.state.interception} checkInt = {this.checkInt} drop = {this.state.drop} checkDrop = {this.checkDrop}
            changeInput = {this.onYardsGainedChange} yardsGained = {this.state.yardsGained} yac = {this.state.yardsAfterCatch}
            changeYAC = {this.onYACChange} addPlay = {this.addPlay}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
