import React from 'react';
import './App.css';

const PlayResults = (props) => (
  <div>
    <p><u>Results</u></p>
    {props.playType.includes('run') &&
      <div style = {{fontSize: '16px'}}>
        <p><label>Yards: </label><input size = '1' type = 'text'></input></p>
        <div style = {{textAlign: 'left'}}>
          <p><input type = 'checkbox' checked = {props.TD} onChange = {props.checkTD}></input><label>  Touchdown</label></p>
          <p><input type = 'checkbox' checked = {props.fumble} onChange = {props.checkFumble}></input><label>  Fumble</label></p>
        </div>
      </div>
    }
    {props.playType.includes('pass') &&
      <div style = {{fontSize: '16px'}}>
      <div>
        <p><input name = 'pass' id = 'complete' type = 'radio' onChange={props.changeRadio} checked = {props.complete}></input>
        <label style = {{paddingRight: '20px'}}>Complete</label>
        <input name = 'pass' id = 'incomplete' type = 'radio' onChange={props.changeRadio} checked = {!props.complete}></input>
        <label>Incomplete</label></p></div>
        {props.complete &&
          <p><label>Yards: </label><input size = '1' type = 'text'></input></p>
        }
      </div>
    }
  </div>
)

export default PlayResults
