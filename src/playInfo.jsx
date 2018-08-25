import React from 'react';
import './App.css';


const PlayInfo = (props) => (
  <div className = 'details'>
    {props.playType.includes('run') &&
    <div>
      <p><u>Ball Carrier</u></p>
      <p><button onClick = {props.onClick} id = {props.qb.name}style = {props.stylePlayer(props.qb.name)}>{props.qb.name}</button></p>
      <p><button onClick = {props.onClick}  id ={props.hb.name}style = {props.stylePlayer(props.hb.name)}>{props.hb.name}</button></p>
      <p><button onClick = {props.onClick}  id = 'wr' style = {props.stylePlayer('wr')}>WR</button></p>
    </div>
    }
    {props.playType.includes('pass') &&
      <div>
        <p><u>Target</u></p>
        <div className = 'flexbox'>
          {props.wr.map((player,i) => {
            return(
              <div key = {i}><button onClick = {props.onClick} id = {player.name} style = {props.stylePlayer(player.name)}>{player.name}</button></div>
            )
          })}
        </div>
    </div>}
    
  </div>
)



export default PlayInfo
