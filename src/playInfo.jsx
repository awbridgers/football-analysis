import React, { Component } from 'react';
import './App.css';


const PlayInfo = (props) => (
  <div className = 'details'>
    {props.playType.includes('run') &&
    <div>
      <p><u>Ball Carrier</u></p>
      <p><button onClick = {props.onClick} id = {props.qb}style = {props.stylePlayer(props.qb)}>{props.qb}</button></p>
      <p><button onClick = {props.onClick}  id ={props.hb}style = {props.stylePlayer(props.hb)}>{props.hb}</button></p>
      <p><button onClick = {props.onClick}  id = 'wr' style = {props.stylePlayer('wr')}>WR</button></p>
    </div>
    }
    {props.playType.includes('pass') &&
      <div>
        <p><u>Target</u></p>
        {props.wr.map((player) => {
          return(
            <p><button onClick = {props.onClick} id = {player} style = {props.stylePlayer(player)}>{player}</button></p>
          )
        })}

      </div>}
  </div>
)



export default PlayInfo
