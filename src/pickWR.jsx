import React from 'react';
import './App.css';


const PickWR = (props) =>(
  <div className = 'pickWR'>
    BallCarrier: {props.ballCarrier}
    <div className = 'wrRunflexbox'>

      {props.wr.map((player,i) => {
        return(
          <div key = {i}><button onClick = {props.onClick} id = {player.name}>{player.name}</button></div>
        )
      })}
    </div>
  </div>
)

export default PickWR
