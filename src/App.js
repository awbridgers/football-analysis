import React, { Component } from 'react';
import './App.css';
import DriveStart from './driveStart.jsx';
import AddPlay from './addPlay.jsx';
import PlayInfo from './playInfo.jsx';
import PlayResult from './playResult.jsx';
import PlayByPlay from './playByPlay.jsx';
import PlayerStats from './playerStats.jsx';
import ChangePlayer from './changePlayer.jsx';
import ChangeScore from './changeScore.jsx';
import ChangeInfo from './changeInfo.jsx';



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
      this.passingYards = 0;
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
      qbArray: [this.kHinton, this.jNewman, this.sHartman],
      hbArray: [this.cCarney, this.mColburn, this.cBeal, this.tNdlovu, this.dDelaney],
      wrArray: [this.aBachman, this.gDortch,this.sWashington, this.sSurratt, this.jSriraman,
        this.sClaude, this.jFreudenthal, this.jLubrano, this.bChapman],
      arrayOfAllPlayers: [],
      qb: this.kHinton,
      hb: this.mColburn,
      fieldPosition: [],
      activeDrive: false,
      enterDriveStart: false,
      changeScore: false,
      changePlayer: false,
      changeInfo: false,
      newYardLine: "",
      newTerritory: "none",
      wakeScore: 0,
      oppScore: 0,
      quarter: 1,
      opponent: "Opp",
      down: 1,
      distance: 10,
      ballOn: 0,
      startLine: "",
      startTerritory: 'none',
      driveStart: 0,
      playType: 'null',
      showResults: false,
      ballCarrier: '',
      touchdown: false,
      fumble: false,
      sack: false,
      interception: false,
      completePass: false,
      drop: false,
      yardsGained: "",
      yardsAfterCatch: "",
      playArray: [],
      driveArray:[]
    }
  }
  componentDidMount(){
    this.setState({arrayOfAllPlayers: [...this.state.qbArray, ...this.state.hbArray, ...this.state.wrArray]});

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
    if(!this.state.activeDrive){
      this.setState({enterDriveStart: true})
    }
    else{
      alert("Please end the current drive before starting a new one")
    }
  }
  endDrive = () => {
    const currentDrive = this.state.playArray;

    if(this.state.activeDrive){
      this.setState({
      activeDrive: false, down: 1,
      distance: 10,
      ballOn: 0,
      startLine: "",
      startTerritory: 'none',
      driveStart: 0,
      playType: 'null',
      showResults: false,
      ballCarrier: '',
      touchdown: false,
      fumble: false,
      sack: false,
      interception: false,
      completePass: false,
      drop: false,
      yardsGained: "",
      yardsAfterCatch: "",
      driveArray: [...this.state.driveArray, currentDrive],
      playArray: []
    })
    }
    else{
      console.log("No drive is active")
    }
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
        activeDrive: true,
        ballOn: yardsToGo,
        driveStart: start,
        down: 1,
        fieldPosition: [...this.state.fieldPosition,yardsToGo]
      });
    }
  }
  playType = (e) => {
    if(this.state.activeDrive && !(this.state.changePlayer || this.state.changeScore || this.state.changeInfo)){
      if(e.target.id === this.state.playType){
        this.setState({playType: 'null', showResults: false, ballCarrier: ''})
      }
      else if(e.target.id === 'sack'){
        this.setState({playType: e.target.id, showResults: true, ballCarrier: this.state.qb, sack: true})
      }
      else{
        this.setState({playType: e.target.id, showResults: false, ballCarrier: ''})
      }
    }
  }
  choosePlayer = (e) => {
    if(this.state.activeDrive && !(this.state.changePlayer || this.state.changeScore || this.state.changeInfo)){
      this.setState({ballCarrier: e.target.id, showResults: true})
    }
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
  changePlayer = () =>{
    if(!(this.state.changePlayer || this.state.changeScore || this.state.changeInfo)){
      this.setState({changePlayer: true})
    }
  }
  changeQB = (e) => {
    let newQB = this.state.qbArray.find((qb) => qb.name === e.target.id);
    this.setState({qb: newQB})
  }
  changeHB = (e) => {
    let newHB = this.state.hbArray.find((hb)=> hb.name === e.target.id)
    this.setState({hb: newHB})
  }
  acceptPlayerChange = () => {
    this.setState({changePlayer: false})
  }
  changeScore = () => {
    if(!(this.state.changePlayer || this.state.changeScore || this.state.changeInfo)){
      this.setState({changeScore: true})
    }
  }
  onChangeScoreClick = (e) => {
    const id = e.target.id;
    console.log(id)
    //if id is for the opponent, change opponent score
    if(id.includes('opponent')){
      if(id.includes('pat')){
        this.setState({oppScore: this.state.oppScore + 1});
      }
      else if(id.includes('fg')){
        this.setState({oppScore: this.state.oppScore + 3});
      }
      else if(id.includes('mistake')){
        this.setState({oppScore: this.state.oppScore - 1});
      }
    }
    //do the same thing but for Wake's score
    else{
      if(id.includes('pat')){
        this.setState({wakeScore: this.state.wakeScore + 1});
      }
      else if(id.includes('fg')){
        this.setState({wakeScore: this.state.wakeScore + 3});
      }
      else if(id.includes('mistake')){
        this.setState({wakeScore: this.state.wakeScore - 1});
      }
    }
  }
  acceptScoreChange = () => {
    this.setState({changeScore: false});
  }
  changeInfo = () => {
    if(!(this.state.changePlayer || this.state.changeScore || this.state.changeInfo)){
      this.setState({changeInfo: true})
    }
  }
  changeDown = (e) => {
    let newDown = parseInt(e.target.id,10);
    this.setState({down: newDown});
  }
  changeDistance = (e) => {
    if(e.target.id === '+'){
      this.setState({distance: this.state.distance + 1});
    }
    else{
      this.setState({distance: this.state.distance -1 });
    }
  }
  newYardLine = (e) => {
    const yardLine = parseInt(e.target.value,10);
    const startLine = (isNaN(yardLine)) ? "" : yardLine
    this.setState({newYardLine: startLine})
  }
  newTerritory = (e) => {
    this.setState({newTerritory: e.target.value})
  }
  acceptInfoChange = () => {
    if(this.state.newYardLine === ''){
      this.setState({changeInfo: false});
    }
    else if(this.state.newYardLine !== '' && this.state.newTerritory === 'none'){
      alert('Please choose a side of the field')
    }
    else if(this.state.newYardLine !== '' && this.state.newTerritory !== 'none'){
      const yardLine = parseInt(this.state.newYardLine,10);
      const ballOn = (this.state.newTerritory === 'own') ? 100-yardLine : yardLine;
      this.setState({ballOn: ballOn, newYardLine: '', newTerritory: 'none', changeInfo: false});
    }
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
    if(this.state.yardsGained === '' && this.state.completePass){
      alert('Please add the the number of yards gained.')
    }
    else{
      let currentPlay = {
        down: this.state.down,
        distance: this.state.distance,
        wakeScore: this.state.wakeScore,
        oppScore: this.state.oppScore,
        ballOn: this.state.ballOn,
        playType: this.state.playType,
        ballCarrier: this.state.ballCarrier,
        yardsGained: parseInt(this.state.yardsGained,10),
        yac: parseInt(this.state.yardsAfterCatch,10),
        fumble: this.state.fumble,
        touchdown: this.state.touchdown,
        interception: this.state.interception,
        completePass: this.state.completePass,
        sacked: this.state.sack,
        qb: this.state.qb,
        hb: this.state.hb
      }
    //if the play is a pass
    if(this.state.playType.includes('pass')){
      //find the target and the qb
      let target = this.state.arrayOfAllPlayers.find((player)=> player.name === this.state.ballCarrier);
      let qb = this.state.qb
      if(this.state.playType === 'pass_0-5'){qb.passAttempts0++;}
      else if(this.state.playType === 'pass_5-15'){qb.passAttempts5 ++;}
      else if(this.state.playType === 'pass_15+'){qb.passAttempts15 ++;}
      target.targeted ++;
      //if it is a complete pass
      if(this.state.completePass){
        if(this.state.playType === 'pass_0-5'){qb.completions0++;}
        else if(this.state.playType === 'pass_5-15'){qb.completions5 ++;}
        else if(this.state.playType === 'pass_15+'){qb.completions15 ++;}
        target.receptions ++;
        target.receivingYards += parseInt(this.state.yardsGained,10)
        qb.passingYards += parseInt(this.state.yardsGained,10)
        if(this.state.yardsAfterCatch !==''){
          target.yardsAfterCatch += parseInt(this.state.yardsAfterCatch,10)
        }
        if(this.state.touchdown){
          target.receivingTDs ++;
          qb.passingTDs ++;
        }
        if(this.state.fumble){
          target.fumbles++;
        }
      }
      else{
        if(this.state.drop){
          target.drops++
        }
        if(this.state.interception){
          qb.interceptions++;
        }
      }
      //console.log(qb,target)
    }
    else if(this.state.playType.includes('run')){
      let ballCarrier = this.state.arrayOfAllPlayers.find(player => player.name === this.state.ballCarrier);
      ballCarrier.rushAttempts++;
      ballCarrier.rushYards += parseInt(this.state.yardsGained,10);
      if(this.state.fumble){
        ballCarrier.fumbles++;
      }
      if(this.state.touchdown){
        ballCarrier.rushingTDs++;
      }
    }
    else if(this.state.playType === 'sack'){
      let qb = this.state.qb;
      qb.sacked ++;
      qb.rushAttempts ++;
      qb.rushYards += parseInt(this.state.yardsGained,10);
    }


    let scoreAdder = (this.state.touchdown)? 6 : 0
    let newDown = (parseInt(this.state.yardsGained,10) >= this.state.distance) ? 1 : this.state.down + 1;
    let newDistance = (parseInt(this.state.yardsGained,10) >= this.state.distance) ? 10 : this.state.distance-this.state.yardsGained;
    this.setState({
      playArray: [...this.state.playArray, currentPlay],
      down: newDown,
      distance: newDistance,
      ballOn: this.state.ballOn - parseInt(this.state.yardsGained,10),
      wakeScore: this.state.wakeScore + scoreAdder,
      playType: 'null',
      showResults: false,
      ballCarrier: '',
      touchdown: false,
      fumble: false,
      sack: false,
      interception: false,
      completePass: false,
      drop: false,
      yardsGained: "",
      yardsAfterCatch: "",
    });
    }
  }
  render() {
    const {enterDriveStart, changePlayer, changeScore, changeInfo} = this.state;
    return (
      <div>
        <div className = 'liveInfo'>
          <div className = 'score'>
            <div className = 'wakeScore'><b>Wake Forest</b><p>{this.state.wakeScore}</p></div>
            <div className = 'oppScore'><b>{this.state.opponent}</b><p>{this.state.oppScore}</p></div>
          </div>
          <div className = 'driveInfo'>
            <div className = 'down'>
              {this.state.down === 1 && `${this.state.down}st and ${this.state.distance}`}
              {this.state.down === 2 && `${this.state.down}nd and ${this.state.distance}`}
              {this.state.down === 3 && `${this.state.down}rd and ${this.state.distance}`}
              {this.state.down === 4 && `${this.state.down}th and ${this.state.distance}`}
            </div>
            <div className = 'ballOn'>Ball on: {this.state.ballOn >50 && `Wake ${100 -this.state.ballOn}`}
              {this.state.ballOn < 50 && `${this.state.opponent} ${this.state.ballOn}`}
              {this.state.ballOn === 50 && `50`}</div>
            <div className = 'driveStarted'>Started: {this.state.startTerritory === 'own' && `Wake ${this.state.driveStart}`}
              {this.state.startTerritory === 'opponent' && `${this.state.opponent} ${this.state.driveStart}`}
            </div>
          </div>
          <div className = 'startDrive'>
            <button className = 'button' onClick = {this.startDrive}>New Drive</button>
            <button className = 'button' onClick = {this.endDrive}>End Drive</button>
          </div>
          <div className = 'gameButtons'>
            <button onClick = {this.changeScore}>Change Score</button>
            <button onClick = {this.changeInfo}>Change Info</button>
            <button onClick = {this.changePlayer}>Change Players</button>

          </div>
        </div>
        <div className = "playbyplay"><PlayByPlay playArray = {this.state.playArray} opponent = {this.state.opponent} /></div>
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
          <div className = 'playerStats'><PlayerStats players = {this.state.arrayOfAllPlayers}/></div>
        </div>
        {changePlayer && <ChangePlayer qb = {this.state.qb} hb={this.state.hb} qbArray = {this.state.qbArray}
          hbArray = {this.state.hbArray} changeQB = {this.changeQB} changeHB = {this.changeHB}
          accept = {this.acceptPlayerChange}/>}
        {changeScore && <ChangeScore opponent = {this.state.opponent} oppScore = {this.state.oppScore}
          wakeScore = {this.state.wakeScore} onClick = {this.onChangeScoreClick} accept = {this.acceptScoreChange}/>}
        {changeInfo && <ChangeInfo down = {this.state.down} changeDown = {this.changeDown} distance = {this.state.distance}
          changeDistance = {this.changeDistance} ballOn = {this.state.ballOn} opponent = {this.state.opponent}
          onChange = {this.newYardLine} changeRadio = {this.newTerritory} yardLine = {this.state.newYardLine}
          territory = {this.state.newTerritory} accept = {this.acceptInfoChange}/>}
        {enterDriveStart && <DriveStart onChange = {this.enterYardLine} yardLine = {this.state.startLine}
        changeRadio = {this.changeTerritory} submit = {this.submitDriveStart} territory = {this.state.startTerritory}
        cancel = {this.cancelDrive}/>}
      </div>
    );
  }
}

export default App;
