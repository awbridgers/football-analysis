import React from 'react';
import './App.css';


const ChangeScore = (props) => (
  <div className = 'changeScore'>
    <div style = {{display: 'inline-block', width: '300px',borderRight: '1px solid black',borderBottom: '2px solid black'}}>
      <p style = {{ borderBottom: "2px solid black"}}>Wake Forest: {props.wakeScore}</p>
      <p><button onClick = {props.onClick} id = 'pat'>PAT</button></p>
      <p><button onClick = {props.onClick} id = 'fg'>FG</button></p>
      <p><button onClick = {props.onClick} id = 'mistake'>-1</button></p>
    </div>
    <div style = {{display: 'inline-block', width: '300px',borderLeft: '1px solid black',borderBottom: '2px solid black'}}>
      <p style = {{ borderBottom: "2px solid black"}}>{props.opponent}: {props.oppScore}</p>
      <p><button onClick = {props.onClick} id = 'opponent-pat'>PAT</button></p>
      <p><button onClick = {props.onClick} id = 'opponent-fg'>FG</button></p>
      <p><button onClick = {props.onClick} id = 'opponent-mistake'>-1</button></p>
    </div>
    <div style = {{marginTop: '25px'}}><button onClick = {props.accept}>Accept</button></div>
  </div>
)


export default ChangeScore
