import React from 'react';
import './App.css';

const PlayResults = (props) => (
  <div>
    {props.showResults &&
      <div>
        <p><u>Results</u></p>
        {props.playType.includes('run') &&
          <div style = {{fontSize: '16px'}}>
            <p><label>Yards: </label><input size = '1' type = 'text' value = {props.yardsGained} onChange = {props.changeInput}></input></p>
            <div style = {{textAlign: 'left'}}>
              <p><input type = 'checkbox' checked = {props.TD} onChange = {props.checkTD}></input><label>  Touchdown</label></p>
              <p><input type = 'checkbox' checked = {props.fumble} onChange = {props.checkFumble}></input><label>  Fumble</label></p>
            </div>
          </div>
        }
        {props.playType.includes('pass') &&
          <div style = {{fontSize: '16px', textAlign: 'center'}}>
          <div>
            <p><input name = 'pass' id = 'complete' type = 'radio' onChange={props.changeRadio} checked = {props.complete}></input>
            <label style = {{paddingRight: '20px'}}>Complete</label>
            <input name = 'pass' id = 'incomplete' type = 'radio' onChange={props.changeRadio} checked = {!props.complete}></input>
            <label>Incomplete</label></p></div>
            {props.complete &&
              <div>
                <p><label>Yards: </label><input size = '1' type = 'text' value = {props.yardsGained} onChange = {props.changeInput}></input></p>
                <p><label>YAC: </label><input size = '1' type = 'text' value = {props.yac} onChange = {props.changeYAC}></input></p>
                <p><input type = 'checkbox' checked = {props.TD} onChange = {props.checkTD}></input><label>  Touchdown</label></p>
                <p style ={{marginTop: '-8px'}}><input type = 'checkbox' checked = {props.fumble} onChange = {props.checkFumble}></input><label>  Fumble</label></p>
              </div>
            }
            {!props.complete &&
              <div>
                <p><input type = 'checkbox' checked = {props.int} onChange = {props.checkInt}></input><label>Interception</label></p>
                <p><input type = 'checkbox' checked = {props.drop} onChange = {props.checkDrop}></input><label>Drop</label></p>
              </div>
            }
          </div>}
          {props.playType === 'sack' &&
            <div>
              <p><label>Yards: </label><input size = '1' type = 'text' value = {props.yardsGained} onChange = {props.changeInput}></input></p>
            </div>
          }
            <button className = 'playButton' onClick = {props.addPlay}>Add Play</button>
      </div>}
  </div>
)

export default PlayResults
