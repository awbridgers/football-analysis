import React, { Component } from 'react';
import './App.css';

const DriveStart = (props) => (
  <div className = 'driveStart'>
    <div style = {{padding: "10px"}}>
      <label>Yard Line: </label>
      <input value = {props.yardLine} onChange = {props.onChange} type = 'text' size = '1' style = {{textAlign: 'center'}}></input>
      <input type='radio' checked = {props.territory === 'own'} onChange = {props.changeRadio}
        name = 'territory' value = 'own' id ='own'/><label>Own</label>
      <input type='radio' checked = {props.territory === 'opponent'} onChange = {props.changeRadio}
        name = 'territory' value = 'opponent' id ='opponent'/><label>Opponent</label>
      <button className = 'submit' type = 'submit' onClick = {props.submit}>Submit</button>
    </div>
  </div>
);

export default DriveStart;
